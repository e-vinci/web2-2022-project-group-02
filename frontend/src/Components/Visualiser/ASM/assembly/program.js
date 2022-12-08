/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
import * as _ from 'lodash-es';
export class LineMap {
  mapping = {};
  mapLine(address, line) {
    this.mapping[address] = line;
  }
  getLineByAddress(address) {
    return _.findLast(this.mapping, (line, key) => key <= address);
  }
  getAddressByLine(row) {
    return Number(_.findKey(this.mapping, (line) => line === row));
  }
}
export class Program {
  _instructions;
  _memoryDefinitions;
  _lineMap;
  constructor(_instructions, _memoryDefinitions, _lineMap) {
    this._instructions = _instructions;
    this._memoryDefinitions = _memoryDefinitions;
    this._lineMap = _lineMap;
  }
  get instructions() {
    return this._instructions;
  }
  get memoryDefinitions() {
    return this._memoryDefinitions;
  }
  get lineMap() {
    return this._lineMap;
  }
  getInstructionByAddress(cpu, address) {
    return this.instructions[address].instantiate(cpu);
  }
}
