import { BinaryOperation } from './instruction';
export class Move extends BinaryOperation {
  execute(cpu) {
    this.target.setValue(this.source.getValue());
    return cpu.getNextInstruction();
  }
  loadParameters(target, source) {
    this.target = target;
    this.source = source;
  }
}
