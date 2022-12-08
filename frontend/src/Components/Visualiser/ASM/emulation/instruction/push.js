/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
import { UnaryReadOperation } from './instruction';
export class Push extends UnaryReadOperation {
  execute(cpu) {
    cpu.push(this.target.getValue());
    return cpu.getNextInstruction();
  }
}
