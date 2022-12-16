import EmProcess from './EmProcess.js';
import BrotliModule from './brotli/brotli.js';
import { fetch_buffer_view } from './utils.js';

const wasmBinary = fetch_buffer_view('./brotli/brotli.wasm');

export default class BrotliProcess extends EmProcess {
  constructor(opts) {
    super(BrotliModule, { ...opts, wasmBinary });
  }
}
