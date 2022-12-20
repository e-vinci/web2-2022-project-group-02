/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
// @ts-nocheck
import { MemoryBlock } from './memory-block';
const GET_METHODS = {
  1: ['getUint8', 'getInt8'],
  2: ['getUint16', 'getInt16'],
  4: ['getUint32', 'getInt32'],
};
const SET_METHODS = {
  1: ['setUint8', 'setInt8'],
  2: ['setUint16', 'setInt16'],
  4: ['setUint32', 'setInt32'],
};
export class MemoryView {
  memory;
  view;
  byteSize;
  index;
  signed;
  getMethod;
  setMethod;
  onSet;
  constructor(memory, byteSize, index = 0, signed = false, onSet = () => {}) {
    this.memory = memory;
    this.byteSize = byteSize;
    this.index = index;
    this.signed = signed;
    this.view = new DataView(this.memory.data, index);
    let signedIndex = signed ? 1 : 0;
    this.getMethod = GET_METHODS[byteSize.toString()][signedIndex];
    this.setMethod = SET_METHODS[byteSize.toString()][signedIndex];
    this.onSet = onSet;
  }
  setValue(value) {
    this.view[this.setMethod](0, value, true);
    this.onSet(this);
  }
  getValue() {
    return this.view[this.getMethod](0, true);
  }
  add(value) {
    this.setValue(this.getValue() + value);
  }
  getOffsetView(offset, byteSize, signed = false) {
    if (byteSize === undefined) {
      byteSize = this.byteSize;
    }
    return new MemoryView(this.memory, byteSize, this.index + offset, signed);
  }
  resize(size) {
    return new MemoryView(this.memory, size, this.index, this.signed);
  }
  get size() {
    return this.byteSize;
  }
}
export class NumericConstant extends MemoryView {
  constructor(value, byteSize = 4, signed = false) {
    super(new MemoryBlock(byteSize), byteSize, 0, signed);
    super.setValue(value);
  }
  setValue(value) {
    throw new Error("Numeric constant's value cannot be changed");
  }
}
