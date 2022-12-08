import { Parameter } from './parameter';
export class Instruction {
  static get BINARY_WRITE_READ_PARAMS() {
    return [
      [Parameter.Reg, Parameter.Reg],
      [Parameter.Reg, Parameter.Constant],
      [Parameter.Reg, Parameter.DerefConstant],
      [Parameter.Reg, Parameter.Memory],
      [Parameter.Memory, Parameter.Reg],
      [Parameter.Memory, Parameter.Constant],
      [Parameter.DerefConstant, Parameter.Reg],
      [Parameter.DerefConstant, Parameter.Constant],
    ];
  }
  static get UNARY_READ_PARAMS() {
    return [[Parameter.Constant], [Parameter.Reg], [Parameter.Memory], [Parameter.DerefConstant]];
  }
  static get UNARY_WRITE_PARAMS() {
    return [[Parameter.Reg], [Parameter.Memory], [Parameter.DerefConstant]];
  }
  get validParameters() {
    return [[]];
  }
  loadParameters(...args) {}
  toString() {
    return this.constructor.toString();
  }
}
export class UnaryOperation extends Instruction {
  target;
  loadParameters(target) {
    this.target = target;
  }
}
export class UnaryReadOperation extends UnaryOperation {
  get validParameters() {
    return Instruction.UNARY_READ_PARAMS;
  }
}
export class UnaryWriteOperation extends UnaryOperation {
  get validParameters() {
    return Instruction.UNARY_WRITE_PARAMS;
  }
}
export class BinaryOperation extends Instruction {
  target;
  source;
  get validParameters() {
    return Instruction.BINARY_WRITE_READ_PARAMS;
  }
  loadParameters(target, source) {
    this.target = target;
    this.source = source;
  }
}
