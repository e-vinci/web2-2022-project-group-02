/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
export class Runtime {
  _process = null;
  get process() {
    return this._process;
  }
  set process(process) {
    this._process = process;
  }
  hasProcess() {
    return this.process !== null;
  }
}
