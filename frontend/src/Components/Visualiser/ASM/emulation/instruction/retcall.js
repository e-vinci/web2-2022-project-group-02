import { Instruction, UnaryReadOperation } from './instruction';
export class Enter extends Instruction {
  execute(cpu) {
    cpu.push(cpu.getRegisterByName('EBP').getValue());
    cpu.getRegisterByName('EBP').setValue(cpu.getRegisterByName('ESP').getValue());
    return cpu.getNextInstruction();
  }
}
export class Leave extends Instruction {
  execute(cpu) {
    cpu.getRegisterByName('ESP').setValue(cpu.getRegisterByName('EBP').getValue());
    cpu.getRegisterByName('EBP').setValue(cpu.pop());
    return cpu.getNextInstruction();
  }
}
export class Call extends UnaryReadOperation {
  execute(cpu) {
    cpu.push(cpu.eip + 1);
    return this.target.getValue();
  }
}
export class Return extends Instruction {
  execute(cpu) {
    return cpu.pop();
  }
}
