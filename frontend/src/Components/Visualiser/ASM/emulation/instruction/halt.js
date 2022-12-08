/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
import { Instruction } from './instruction';
export class Halt extends Instruction {
  execute(cpu) {
    cpu.halt();
    return cpu.eip;
  }
}
