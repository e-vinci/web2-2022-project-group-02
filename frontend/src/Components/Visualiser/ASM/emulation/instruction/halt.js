import { Instruction } from './instruction';
export class Halt extends Instruction {
  execute(cpu) {
    cpu.halt();
    return cpu.eip;
  }
}
