import EmProcess from './EmProcess.js';
import BinaryenBoxModule from './binaryen/binaryen-box.js';

export default class BinaryenBoxProcess extends EmProcess {
  constructor(opts) {
    const wasmBinary = opts.FS.readFile('/wasm/binaryen-box.wasm');
    super(BinaryenBoxModule, { ...opts, wasmBinary });
  }
}
