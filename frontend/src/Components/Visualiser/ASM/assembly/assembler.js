/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
// @ts-nocheck
import * as _ from 'lodash-es';
import { LineMap, Program } from './program';
import { EncodedInstruction } from './encoding';
import { Move } from '../emulation/instruction/mov';
import {
  Parameter,
  RegisterParameter,
  MemoryParameter,
  LabelParameter,
  DerefLabelParameter,
} from '../emulation/instruction/parameter';
import { REGISTER_INDEX } from '../emulation/cpu';
import {
  Jump,
  JumpE,
  JumpGE,
  JumpLE,
  JumpG,
  JumpL,
  JumpO,
  JumpNO,
  JumpS,
  JumpNS,
  JumpNE,
  JumpB,
  JumpAE,
  JumpBE,
  JumpA,
  JumpP,
  JumpNP,
  JumpCXZ,
  JumpECXZ,
  Loop,
  LoopE,
  LoopNE,
} from '../emulation/instruction/jump';
import { Interrupt } from '../emulation/instruction/interrupt';
import { Pop } from '../emulation/instruction/pop';
import { Push } from '../emulation/instruction/push';
import { Call, Return, Enter, Leave } from '../emulation/instruction/retcall';
import { Compare } from '../emulation/instruction/cmp';
import {
  Add,
  AddWithCarry,
  Sub,
  SubWithBorrow,
  DivideSigned,
  MultiplySigned,
  Decrement,
  Increment,
} from '../emulation/instruction/arithmetic';
import { And, Or, Xor } from '../emulation/instruction/bitwise';
import { LabelResolver } from './label';
import { SetDirection, ClearDirection, SetCarry, ClearCarry } from '../emulation/instruction/flags';
import { Halt } from '../emulation/instruction/halt';
import parser from './asm-parser';

const InstructionMapping = {
  MOV: Move,
  INT: Interrupt,
  HLT: Halt,
  POP: Pop,
  PUSH: Push,
  CALL: Call,
  RET: Return,
  ENTER: Enter,
  LEAVE: Leave,
  LOOP: Loop,
  LOOPE: LoopE,
  LOOPZ: LoopE,
  LOOPNE: LoopNE,
  LOOPNZ: LoopNE,
  JMP: Jump,
  CMP: Compare,
  JO: JumpO,
  JNO: JumpNO,
  JS: JumpS,
  JNS: JumpNS,
  JE: JumpE,
  JZ: JumpE,
  JNE: JumpNE,
  JNZ: JumpNE,
  JB: JumpB,
  JNAE: JumpB,
  JC: JumpB,
  JNB: JumpAE,
  JAE: JumpAE,
  JNC: JumpAE,
  JBE: JumpBE,
  JNA: JumpBE,
  JA: JumpA,
  JNBE: JumpA,
  JL: JumpL,
  JNGE: JumpL,
  JGE: JumpGE,
  JNL: JumpGE,
  JLE: JumpLE,
  JNG: JumpLE,
  JG: JumpG,
  JNLE: JumpG,
  JP: JumpP,
  JPE: JumpP,
  JNP: JumpNP,
  JPO: JumpNP,
  JCXZ: JumpCXZ,
  JECXZ: JumpECXZ,
  ADD: Add,
  ADC: AddWithCarry,
  SUB: Sub,
  SBB: SubWithBorrow,
  IDIV: DivideSigned,
  IMUL: MultiplySigned,
  DEC: Decrement,
  INC: Increment,
  AND: And,
  OR: Or,
  XOR: Xor,
  STD: SetDirection,
  CLD: ClearDirection,
  STC: SetCarry,
  CLC: ClearCarry,
};
export class AssemblyException extends Error {
  message;

  line;

  data;

  constructor(message = '', line = 0, data = {}) {
    super(message);
    this.message = message;
    this.line = line;
    this.data = data;
    Object.setPrototypeOf(this, AssemblyException.prototype);
  }
}
export class MemoryDefinition {
  _address;

  _size;

  _value;

  constructor(_address, _size, _value) {
    this._address = _address;
    this._size = _size;
    this._value = _value;
  }

  get address() {
    return this._address;
  }

  get size() {
    return this._size;
  }

  get value() {
    return this._value;
  }
}
export class Assembler {
  assemble(program) {
    let parsedProgram;
    try {
      parsedProgram = parser.parse(program);
    } catch (e) {
      console.error(e);
      throw new AssemblyException(e.message, e.location.start.line);
    }
    const assemblyData = new AssemblyData();
    const memoryDefinitions = this.assembleDataSegment(parsedProgram.data, assemblyData);
    const instructions = this.assembleTextSegment(parsedProgram.text, assemblyData);
    assemblyData.labelResolver.resolveAddresses();
    return new Program(instructions, memoryDefinitions, assemblyData.lineMap);
  }

  assembleDataSegment(dataLines, assemblyData) {
    let memoryDefinitions = [];
    for (let i = 0; i < dataLines.length; i++) {
      assemblyData.line = dataLines[i].location.start.line - 1;
      try {
        memoryDefinitions = memoryDefinitions.concat(
          this.assembleMemoryDefinitions(dataLines[i].line, assemblyData),
        );
      } catch (e) {
        if (e instanceof AssemblyException) {
          throw new AssemblyException(e.message, assemblyData.line + 1, dataLines[i].line);
        } else {
          throw e;
        }
      }
    }
    return memoryDefinitions;
  }

  assembleMemoryDefinitions(line, assemblyData) {
    if (line.label !== null) {
      this.assembleLabel(line.label, assemblyData, MemoryType.Data);
    }
    const definitions = [];
    const { size } = line;
    if (size !== null) {
      for (let i = 0; i < line.constants.length; i++) {
        const constant = line.constants[i];
        if (constant.tag === 'String') {
          const characters = constant.value;
          for (let j = 0; j < characters.length; j++) {
            definitions.push(
              new MemoryDefinition(assemblyData.dataAddress, size, characters[j].charCodeAt(0)),
            );
            assemblyData.dataAddress += size;
          }
        } else if (constant.tag === 'Number') {
          definitions.push(new MemoryDefinition(assemblyData.dataAddress, size, constant.value));
          assemblyData.dataAddress += size;
        }
      }
    }
    return definitions;
  }

  assembleTextSegment(textLines, assemblyData) {
    const instructions = [];
    for (let i = 0; i < textLines.length; i++) {
      assemblyData.line = textLines[i].location.start.line - 1;
      try {
        const instruction = this.assembleInstruction(textLines[i].line, assemblyData);
        if (instruction !== null) {
          instructions.push(instruction);
          assemblyData.lineMap.mapLine(assemblyData.textAddress, assemblyData.line);
          assemblyData.textAddress++;
        }
      } catch (e) {
        if (e instanceof AssemblyException) {
          throw new AssemblyException(e.message, assemblyData.line + 1, textLines[i].line);
        } else {
          throw e;
        }
      }
    }
    return instructions;
  }

  assembleInstruction(line, assemblyData) {
    if (line.label !== null) {
      this.assembleLabel(line.label, assemblyData, MemoryType.Text);
    }
    if (line.instruction !== null) {
      return this.parseInstruction(line.instruction, assemblyData);
    }

    return null;
  }

  parseInstruction(instruction, assemblyData) {
    instruction.name = instruction.name.toUpperCase();
    if (!_.has(InstructionMapping, instruction.name)) {
      throw new AssemblyException(`Unknown instruction name ${instruction.name}`);
    }
    const instructionInstance = new InstructionMapping[instruction.name]();
    return new EncodedInstruction(
      instructionInstance,
      this.loadParameters(
        instructionInstance,
        instruction.operands,
        instruction.name,
        assemblyData,
      ),
    );
  }

  loadParameters(instruction, operands, name, assemblyData) {
    if (operands !== undefined && operands.length == 2) {
      if (this.isMemoryDereference(operands[0])) {
        operands[0].size = operands[1].size;
      }
    }
    this.checkParameterCompatibility(instruction, operands, name);
    const mapping = {};
    mapping[Parameter.Reg] = this.parseRegisterParameter;
    mapping[Parameter.Constant] = this.parseLabelParameter;
    mapping[Parameter.DerefConstant] = this.parseLabelParameter;
    mapping[Parameter.Memory] = this.parseMemoryParameter;
    return _.map(operands, (operand) => {
      const innerOperand = this.getInnerParameter(operand);
      return mapping[this.getTag(innerOperand)].call(
        this,
        this.getParameterSize(operand),
        innerOperand,
        assemblyData,
      );
    });
  }

  parseRegisterParameter(size, operand, assemblyData) {
    return new RegisterParameter(size, REGISTER_INDEX[this.parseRegisterName(operand)].id);
  }

  parseLabelParameter(size, operand, assemblyData) {
    let labelParameter;
    if (_.has(operand, 'deref') && operand.deref) {
      labelParameter = new DerefLabelParameter(
        size,
        operand.tag === 'Label' ? operand.value : '',
        this.parseIndexer(operand.index),
      );
    } else {
      labelParameter = new LabelParameter(size, operand.tag === 'Label' ? operand.value : '');
    }
    if (operand.tag === 'Label') {
      assemblyData.labelResolver.markUnresolvedParameter(labelParameter, assemblyData.line);
    } else {
      labelParameter.resolveLabel(operand.value);
    }
    return labelParameter;
  }

  parseMemoryParameter(size, operand, assemblyData) {
    const baseRegId = REGISTER_INDEX[this.parseRegisterName(operand.baseRegister)].id;
    const indexer = this.parseIndexer(operand.index);
    return new MemoryParameter(size, baseRegId, indexer);
  }

  parseIndexer(index) {
    let indexReg = REGISTER_INDEX.NULL.id;
    let multiplier = 1;
    let constant = 0;
    if (index !== null) {
      if (index.index != null) {
        indexReg = REGISTER_INDEX[this.parseRegisterName(index.index.register)].id;
        multiplier = index.index.multiplier;
      }
      if (index.constant != null) {
        constant = index.constant.value;
      }
    }
    return { indexReg, multiplier, constant };
  }

  parseRegisterName(operand) {
    const registerName = operand.name.toUpperCase();
    if (!_.has(REGISTER_INDEX, registerName)) {
      throw new AssemblyException(`Unknown register ${registerName}`);
    }
    return registerName;
  }

  checkParameterCompatibility(instruction, operands, name) {
    if (operands !== undefined && operands.length == 2) {
      // if (this.getParameterSize(operands[0]) != this.getParameterSize(operands[1]))
      // {
      //     throw new AssemblyException("Wrong size of operands");
      // }
    }
    const parameterMask = _.map(operands, (operand) =>
      this.getTag(this.getInnerParameter(operand)),
    );
    const validMasks = instruction.validParameters;
    for (let i = 0; i < validMasks.length; i++) {
      if (_.isEqual(parameterMask, validMasks[i])) {
        return;
      }
    }
    throw new AssemblyException(
      `Unknown parameter combination for instruction ${name}.` +
        ` Got ${parameterMask.toString()}, expected one of ${JSON.stringify(validMasks)}`,
    );
  }

  getTag(operand) {
    let { tag } = operand;
    if (_.includes(['Label', 'Number'], tag)) {
      tag = Parameter.Constant;
      if (_.has(operand, 'deref') && operand.deref) {
        tag = Parameter.DerefConstant;
      }
    } else if (tag === 'Mem') {
      tag = Parameter.Memory;
    } else if (tag === 'Reg') {
      tag = Parameter.Reg;
    } else {
      throw new AssemblyException(`Unexpected tag ${tag}`);
    }
    return tag;
  }

  getInnerParameter(operand) {
    if (operand.tag === 'Cast') {
      return this.getInnerParameter(operand.value);
    }

    return operand;
  }

  getParameterSize(operand) {
    if (operand.tag === 'Cast') {
      return operand.size > 0
        ? operand.size
        : operand.hasOwnProperty('value')
        ? this.getParameterSize(operand.value)
        : 4;
    }
    if (operand.hasOwnProperty('size')) {
      return operand.size;
    }
    return 4;
  }

  isMemoryDereference(operand) {
    const tag = this.getTag(this.getInnerParameter(operand));
    return tag === Parameter.Memory || tag === Parameter.DerefConstant;
  }

  assembleLabel(label, assemblyData, memoryType) {
    assemblyData.labelResolver.addLabel(
      assemblyData.getAddress(memoryType),
      label.name.value,
      label.local,
    );
  }
}
let MemoryType;
(function (MemoryType) {
  MemoryType[(MemoryType.Data = 0)] = 'Data';
  MemoryType[(MemoryType.Text = 1)] = 'Text';
})(MemoryType || (MemoryType = {}));
class AssemblyData {
  textAddress;

  dataAddress;

  lineMap;

  labelResolver;

  line;

  constructor(
    textAddress = 0,
    dataAddress = 0,
    lineMap = new LineMap(),
    labelResolver = new LabelResolver(),
    line = 0,
  ) {
    this.textAddress = textAddress;
    this.dataAddress = dataAddress;
    this.lineMap = lineMap;
    this.labelResolver = labelResolver;
    this.line = line;
  }

  getAddress(memoryType) {
    return memoryType === MemoryType.Data ? this.dataAddress : this.textAddress;
  }
}
