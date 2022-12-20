/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
import { NumericConstant } from '../memory-view';
export class Parameter {
  size;
  static get Reg() {
    return 'Reg';
  }
  static get Memory() {
    return 'Mem';
  }
  static get Constant() {
    return 'Constant';
  }
  static get DerefConstant() {
    return 'DerefConstant';
  }
  constructor(size = 4) {
    this.size = size;
  }
}
export class RegisterParameter extends Parameter {
  registerIndex;
  constructor(size, registerIndex) {
    super(size);
    this.registerIndex = registerIndex;
  }
  fetchData(cpu) {
    return cpu.getRegisterByIndex(this.registerIndex);
  }
}
export class MemoryParameter extends Parameter {
  baseReg;
  indexer;
  constructor(size, baseReg, indexer) {
    super(size);
    this.baseReg = baseReg;
    this.indexer = indexer;
  }
  fetchData(cpu) {
    let baseReg = cpu.getRegisterByIndex(this.baseReg);
    let indexReg = cpu.getRegisterByIndex(this.indexer.indexReg);
    return cpu.derefAddress(
      cpu.calculateEffectiveAddressFromRegister(
        baseReg,
        indexReg,
        this.indexer.multiplier,
        this.indexer.constant,
      ),
      this.size,
    );
  }
}
export class LabelParameter extends Parameter {
  _label;
  value = -1;
  constructor(size, _label = '') {
    super(size);
    this._label = _label;
  }
  get label() {
    return this._label;
  }
  set label(value) {
    this._label = value;
  }
  resolveLabel(value) {
    this.value = value;
  }
  fetchData(cpu) {
    return new NumericConstant(this.value, this.size);
  }
}
export class DerefLabelParameter extends LabelParameter {
  indexer;
  constructor(size, label = '', indexer) {
    super(size, label);
    this.indexer = indexer;
  }
  fetchData(cpu) {
    let indexReg = cpu.getRegisterByIndex(this.indexer.indexReg);
    return cpu.derefAddress(
      cpu.calculateEffectiveAddress(
        this.value,
        indexReg,
        this.indexer.multiplier,
        this.indexer.constant,
      ),
      this.size,
    );
  }
}
