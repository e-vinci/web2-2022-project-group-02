/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
export class Process {
  _cpu;
  started = false;
  constructor(_cpu) {
    this._cpu = _cpu;
    this.cpu.onExit.subscribe((cpu) => (this.started = false));
  }
  get cpu() {
    return this._cpu;
  }
  start(sync = false) {
    this.started = true;
    this.reset();
    this.initMemory();
    if (sync) {
      this.cpu.runSync();
    } else this.cpu.run();
  }
  isStarted() {
    return this.started;
  }
  isRunning() {
    return this.isStarted() && this.cpu.running;
  }
  isPaused() {
    return this.isStarted() && !this.cpu.running;
  }
  reset() {
    this.cpu.reset();
    this.cpu.memory.clear();
  }
  initMemory() {
    let memoryDefinitions = this.cpu.program.memoryDefinitions;
    let memory = this.cpu.memory;
    for (const memoryDef of memoryDefinitions) {
      memory.load(memoryDef.address, memoryDef.size).setValue(memoryDef.value);
    }
  }
}
