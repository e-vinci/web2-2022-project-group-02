import * as _ from 'lodash-es';
import { MemoryBlock } from './memory-block';
import { MemoryView, NumericConstant } from './memory-view';
import { ALU } from './alu';
import { EventEmitter } from './EventEmitter';
import { RuntimeException } from './runtime-exception';
import { ConditionUnit } from './condition-unit';
import { StatusWord } from './status-word';
class RegisterInfo {
  _id;
  _bank;
  _byteSize;
  _index;
  constructor(id, bank, byteSize, index = 0) {
    this._id = id;
    this._bank = bank;
    this._byteSize = byteSize;
    this._index = index;
  }
  get id() {
    return this._id;
  }
  get index() {
    return this._index;
  }
  get byteSize() {
    return this._byteSize;
  }
  get bank() {
    return this._bank;
  }
}
export var Interrupt;
(function (Interrupt) {
  Interrupt[(Interrupt['WRITE_NUM'] = 1)] = 'WRITE_NUM';
  Interrupt[(Interrupt['WRITE_STRING'] = 2)] = 'WRITE_STRING';
})(Interrupt || (Interrupt = {}));
export const REGISTER_INDEX = {
  NULL: new RegisterInfo(0, 0, 4),
  EIP: new RegisterInfo(1, 1, 4),
  EBP: new RegisterInfo(2, 2, 4),
  ESP: new RegisterInfo(3, 3, 4),
  ESI: new RegisterInfo(4, 4, 4),
  SI: new RegisterInfo(5, 4, 2),
  EDI: new RegisterInfo(6, 5, 4),
  DI: new RegisterInfo(7, 5, 2),
  EAX: new RegisterInfo(20, 6, 4),
  AX: new RegisterInfo(21, 6, 2),
  AH: new RegisterInfo(22, 6, 1, 1),
  AL: new RegisterInfo(23, 6, 1),
  EBX: new RegisterInfo(24, 7, 4),
  BX: new RegisterInfo(25, 7, 2),
  BH: new RegisterInfo(26, 7, 1, 1),
  BL: new RegisterInfo(27, 7, 1),
  ECX: new RegisterInfo(28, 8, 4),
  CX: new RegisterInfo(29, 8, 2),
  CH: new RegisterInfo(30, 8, 1, 1),
  CL: new RegisterInfo(31, 8, 1),
  EDX: new RegisterInfo(32, 9, 4),
  DX: new RegisterInfo(33, 9, 2),
  DH: new RegisterInfo(34, 9, 1, 1),
  DL: new RegisterInfo(35, 9, 1),
};
export class CPU {
  _program;
  _memory;
  _tickRate;
  static INTERRUPT_EXIT = 0;
  status = new StatusWord();
  registers;
  _registerMap = {};
  _alu;
  _conditionUnit;
  _onInterrupt = new EventEmitter();
  _onExit = new EventEmitter();
  _onError = new EventEmitter();
  _onRegisterChange = new EventEmitter();
  _running = false;
  _breakpoints;
  stoppedOnBreakpoint = false;
  scheduleTimeout = null;
  constructor(_program, _memory, _tickRate = 500) {
    this._program = _program;
    this._memory = _memory;
    this._tickRate = _tickRate;
    this.registers = _.map(_.range(10), () => new MemoryBlock(4));
    this._alu = new ALU(this);
    this._conditionUnit = new ConditionUnit(this);
    this._breakpoints = [];
    _.keys(REGISTER_INDEX).forEach((key) => {
      let reg = REGISTER_INDEX[key];
      this._registerMap[key] = new MemoryView(
        this.registers[reg.bank],
        reg.byteSize,
        reg.index,
        false,
        (view) => {
          this._onRegisterChange.emit([key, view]);
        },
      );
    });
    this.reset();
  }
  get tickRate() {
    return this._tickRate;
  }
  set tickRate(value) {
    this._tickRate = value;
  }
  get eip() {
    return this.registerMap['EIP'].getValue();
  }
  get statusWord() {
    return this.status;
  }
  get memory() {
    return this._memory;
  }
  get program() {
    return this._program;
  }
  get onInterrupt() {
    return this._onInterrupt;
  }
  get onExit() {
    return this._onExit;
  }
  get onError() {
    return this._onError;
  }
  get onRegisterChange() {
    return this._onRegisterChange;
  }
  get alu() {
    return this._alu;
  }
  get conditionUnit() {
    return this._conditionUnit;
  }
  get registerMap() {
    return this._registerMap;
  }
  get running() {
    return this._running;
  }
  get activeLine() {
    return this.program.lineMap.getLineByAddress(this.eip);
  }
  set breakpoints(value) {
    this._breakpoints = _.filter(
      _.map(value, (row) => this.program.lineMap.getAddressByLine(row)),
      (breakpoint) => breakpoint !== null,
    );
  }
  reset() {
    this.getRegisterByName('EIP').setValue(0);
    this.getRegisterByName('ESP').setValue(this.memory.size);
    this.getRegisterByName('EBP').setValue(this.memory.size);
  }
  step() {
    if (this.isFinished()) {
      this.halt();
      return;
    }
    if (this.hasBreakpoint()) {
      if (!this.stoppedOnBreakpoint) {
        this.stoppedOnBreakpoint = true;
        this.pause();
        return;
      } else {
        this.stoppedOnBreakpoint = false;
      }
    }
    this.executeOneInstruction();
  }
  run() {
    this._running = true;
    this.scheduleRun();
  }
  runSync() {
    this._running = true;
    while (this._running) {
      this.step();
    }
  }
  pause() {
    this._running = false;
    this.clearScheduledRun();
  }
  halt() {
    this.pause();
    this.onExit.emit(this);
  }
  isFinished() {
    return this.eip >= this.program.instructions.length;
  }
  getNextInstruction() {
    return this.eip + 1;
  }
  push(value) {
    let esp = this.getRegisterByName('ESP');
    esp.add(-4);
    this.deref(esp).setValue(value);
  }
  pop() {
    let esp = this.getRegisterByName('ESP');
    let value = this.deref(esp).getValue();
    esp.add(4);
    return value;
  }
  derefAddress(address, size = 4) {
    return this.deref(new NumericConstant(address), size);
  }
  deref(memoryView, size = 4) {
    let address = memoryView.getValue();
    if (!this.memory.isValid(address)) {
      throw new RuntimeException(
        'Invalid dereference of address ' + address + ' at line ' + this.getLine(),
      );
    }
    if (address + size > this.memory.size) {
      throw new RuntimeException('Memory overflow at line ' + this.getLine());
    }
    return this.memory.load(address, size);
  }
  calculateEffectiveAddressFromRegister(
    baseReg, // @ts-ignore
    indexReg = null,
    multiplier = 1,
    constant = 0,
  ) {
    return this.calculateEffectiveAddress(baseReg.getValue(), indexReg, multiplier, constant);
  }
  // @ts-ignore
  calculateEffectiveAddress(
    address, // @ts-ignore
    indexReg = null,
    multiplier = 1,
    constant = 0,
  ) {
    if (indexReg === null) {
      indexReg = this.getRegisterByName('NULL');
    }
    return address + indexReg.getValue() * multiplier + constant;
  }
  setFlags(value) {
    this.status.zero = value === 0;
    this.status.signum = (value & (1 << 31)) !== 0;
    let parity = 0;
    for (let i = 0; i < 8; i++) {
      parity += (value & (1 << i)) !== 0 ? 1 : 0;
    }
    this.status.parity = parity % 2 === 0;
  }
  getRegisterByName(name) {
    return this.registerMap[name];
  }
  getRegisterByIndex(index) {
    return this.getRegisterByName(_.findKey(REGISTER_INDEX, (reg) => reg.id === index) || '');
  }
  hasBreakpoint() {
    return _.includes(this._breakpoints, this.eip, undefined, undefined);
  }
  executeOneInstruction() {
    let eip = this.eip;
    try {
      let instruction = this.loadInstruction(eip);
      let nextAddress = instruction.execute(this);
      this.getRegisterByName('EIP').setValue(nextAddress);
    } catch (e) {
      if (e instanceof RuntimeException) this.onError.emit(e);
      this.pause();
    }
  }
  loadInstruction(eip) {
    return this.program.getInstructionByAddress(this, eip);
  }
  getLine() {
    return this.program.lineMap.getLineByAddress(this.eip) + 1;
  }
  scheduleRun() {
    this.clearScheduledRun();
    this.scheduleTimeout = setTimeout(() => this.tickStep(), this.tickRate);
  }
  clearScheduledRun() {
    if (this.scheduleTimeout !== null) {
      clearTimeout(this.scheduleTimeout);
    }
  }
  tickStep() {
    if (this.running) {
      this.step();
      this.scheduleRun();
    }
  }
}
