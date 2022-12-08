/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
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
