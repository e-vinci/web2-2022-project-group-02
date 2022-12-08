/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
import { BinaryOperation, UnaryReadOperation, UnaryWriteOperation } from './instruction';
import { RuntimeException } from '../runtime-exception';
export class Add extends BinaryOperation {
  execute(cpu) {
    this.target.setValue(cpu.alu.add(this.target.getValue(), this.source.getValue()));
    return cpu.getNextInstruction();
  }
}
export class AddWithCarry extends Add {
  execute(cpu) {
    this.target.setValue(
      cpu.alu.add(this.target.getValue(), this.source.getValue(), cpu.statusWord.carry ? 1 : 0),
    );
    return cpu.getNextInstruction();
  }
}
export class Sub extends BinaryOperation {
  execute(cpu) {
    this.target.setValue(cpu.alu.sub(this.target.getValue(), this.source.getValue()));
    return cpu.getNextInstruction();
  }
}
export class SubWithBorrow extends Sub {
  execute(cpu) {
    this.target.setValue(
      cpu.alu.sub(this.target.getValue(), this.source.getValue(), cpu.statusWord.carry ? 1 : 0),
    );
    return cpu.getNextInstruction();
  }
}
export class Increment extends UnaryWriteOperation {
  execute(cpu) {
    this.target.setValue(cpu.alu.inc(this.target.getValue()));
    return cpu.getNextInstruction();
  }
}
export class Decrement extends UnaryWriteOperation {
  execute(cpu) {
    this.target.setValue(cpu.alu.dec(this.target.getValue()));
    return cpu.getNextInstruction();
  }
}
export class DivideSigned extends UnaryReadOperation {
  execute(cpu) {
    if (this.target.getValue() === 0) {
      throw new RuntimeException('Division by zero');
    }
    let edx = cpu.getRegisterByName('EDX').getValue();
    let eax = cpu.getRegisterByName('EAX').getValue();
    let value = cpu.alu.extend64bit(eax, edx);
    let result = cpu.alu.idivide(value, this.target.getValue());
    cpu.getRegisterByName('EDX').setValue(result.remainder);
    cpu.getRegisterByName('EAX').setValue(result.value);
    return cpu.getNextInstruction();
  }
}
export class MultiplySigned extends UnaryReadOperation {
  execute(cpu) {
    let eax = cpu.getRegisterByName('EAX').getValue();
    let result = cpu.alu.imultiply(eax, this.target.getValue());
    cpu.getRegisterByName('EDX').setValue(result.upperHalf);
    cpu.getRegisterByName('EAX').setValue(result.lowerHalf);
    return cpu.getNextInstruction();
  }
}
