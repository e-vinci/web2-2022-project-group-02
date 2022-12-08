import { UnaryWriteOperation } from './instruction';
export class Pop extends UnaryWriteOperation {
  execute(cpu) {
    this.target.setValue(cpu.pop());
    return cpu.getNextInstruction();
  }
}
