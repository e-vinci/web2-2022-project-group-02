/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
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
