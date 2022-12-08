// @ts-nocheck
import { UnaryReadOperation } from './instruction';
export class Interrupt extends UnaryReadOperation {
  number;
  execute(cpu) {
    cpu.onInterrupt.emit(this.number.getValue());
    return cpu.getNextInstruction();
  }
  loadParameters(number) {
    this.number = number;
  }
}
