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
