import { UnaryReadOperation } from './instruction';
export class Push extends UnaryReadOperation {
  execute(cpu) {
    cpu.push(this.target.getValue());
    return cpu.getNextInstruction();
  }
}
