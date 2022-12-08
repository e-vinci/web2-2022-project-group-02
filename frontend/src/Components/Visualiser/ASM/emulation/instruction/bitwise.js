/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
import { BinaryOperation } from './instruction';

export class And extends BinaryOperation {
  execute(cpu) {
    this.target.setValue(cpu.alu.and(this.target.getValue(), this.source.getValue()));
    return cpu.getNextInstruction();
  }
}
export class Or extends BinaryOperation {
  execute(cpu) {
    this.target.setValue(cpu.alu.or(this.target.getValue(), this.source.getValue()));
    return cpu.getNextInstruction();
  }
}
export class Xor extends BinaryOperation {
  execute(cpu) {
    this.target.setValue(cpu.alu.xor(this.target.getValue(), this.source.getValue()));
    return cpu.getNextInstruction();
  }
}
