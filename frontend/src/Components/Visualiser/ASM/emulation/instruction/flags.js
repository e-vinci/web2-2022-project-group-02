import { Instruction } from './instruction';
export class SetDirection extends Instruction {
  execute(cpu) {
    cpu.statusWord.direction = true;
    return cpu.getNextInstruction();
  }
}
export class ClearDirection extends Instruction {
  execute(cpu) {
    cpu.statusWord.direction = false;
    return cpu.getNextInstruction();
  }
}
export class SetCarry extends Instruction {
  execute(cpu) {
    cpu.statusWord.carry = true;
    return cpu.getNextInstruction();
  }
}
export class ClearCarry extends Instruction {
  execute(cpu) {
    cpu.statusWord.carry = false;
    return cpu.getNextInstruction();
  }
}
