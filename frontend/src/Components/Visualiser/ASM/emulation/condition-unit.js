/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
export class ConditionUnit {
  cpu;
  constructor(cpu) {
    this.cpu = cpu;
  }
  get overflow() {
    return this.cpu.statusWord.overflow;
  }
  get sign() {
    return this.cpu.statusWord.signum;
  }
  get parity() {
    return this.cpu.statusWord.parity;
  }
  get equal() {
    return this.cpu.statusWord.zero;
  }
  get below() {
    return this.cpu.statusWord.carry;
  }
  get above() {
    return !this.cpu.statusWord.carry && !this.cpu.statusWord.zero;
  }
  get less() {
    return this.cpu.statusWord.signum !== this.cpu.statusWord.overflow;
  }
  get greater() {
    return !this.cpu.statusWord.zero && this.cpu.statusWord.signum === this.cpu.statusWord.overflow;
  }
}
