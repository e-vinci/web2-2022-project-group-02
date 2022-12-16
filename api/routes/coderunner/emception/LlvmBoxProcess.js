import EmProcess from './EmProcess.js';
import LlvmBoxModule from './llvm/llvm-box.js';

export default class LlvmBoxProcess extends EmProcess {
  constructor(opts) {
    const wasmBinary = opts.FS.readFile('/wasm/llvm-box.wasm');
    super(LlvmBoxModule, { ...opts, wasmBinary });
  }
}
