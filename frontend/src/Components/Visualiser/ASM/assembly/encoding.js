/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
// @ts-nocheck
import * as _ from 'lodash-es';
export class EncodedInstruction {
  instruction;
  parameters;
  constructor(instruction, parameters) {
    this.instruction = instruction;
    this.parameters = parameters;
  }
  instantiate(cpu) {
    let data = _.map(this.parameters, (parameter) => parameter.fetchData(cpu));
    this.instruction.loadParameters.apply(this.instruction, data);
    return this.instruction;
  }
}
