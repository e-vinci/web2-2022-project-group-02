/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
import { UnaryWriteOperation } from './instruction';
export class Pop extends UnaryWriteOperation {
  execute(cpu) {
    this.target.setValue(cpu.pop());
    return cpu.getNextInstruction();
  }
}
