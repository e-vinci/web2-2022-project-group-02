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
