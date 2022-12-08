import { MemoryView } from './memory-view';

export class MemoryBlock {
  _data;

  constructor(size) {
    this._data = new ArrayBuffer(size);
  }

  load(address, size = 4, signed = false) {
    return new MemoryView(this, size, address, signed);
  }

  isValid(address) {
    return address >= 0 && address < this.size;
  }

  clear() {
    for (let i = 0; i < this.size; i++) {
      this.load(i, 1).setValue(0);
    }
  }

  get data() {
    return this._data;
  }

  get size() {
    return this.data.byteLength;
  }
}
