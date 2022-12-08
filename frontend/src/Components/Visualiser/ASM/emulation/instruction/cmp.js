import { BinaryOperation } from './instruction';
import { Parameter } from './parameter';
export class Compare extends BinaryOperation {
  execute(cpu) {
    cpu.alu.sub(this.target.getValue(), this.source.getValue());
    return cpu.getNextInstruction();
  }
  getValidParameters() {
    return [
      [Parameter.Reg, Parameter.Reg],
      [Parameter.Reg, Parameter.Memory],
      [Parameter.Memory, Parameter.Reg],
    ];
  }
}
