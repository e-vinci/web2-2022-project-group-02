/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
// @ts-nocheck
import * as _ from 'lodash-es';
import { AssemblyException } from './assembler';
class Label {
  name;
  local;
  address;
  constructor(name, local, address) {
    this.name = name;
    this.local = local;
    this.address = address;
  }
}
export class LabelResolver {
  labels = {};
  lastGlobalLabel = null;
  unresolvedParameters = [];
  addLabel(address, label, local = false) {
    label = this.normalizeLabelName(label, local, address);
    if (this.hasLabel(label)) {
      throw new AssemblyException('Duplicate label found: ' + label);
    }
    this.labels[label] = new Label(label, local, address);
    if (!local) {
      this.lastGlobalLabel = this.labels[label];
    }
  }
  markUnresolvedParameter(labelParameter, line) {
    if (labelParameter.label.startsWith('.')) {
      if (this.lastGlobalLabel === null) {
        throw new AssemblyException(
          'Local label used without global label: ' + labelParameter.label,
          line,
        );
      }
      labelParameter.label = this.lastGlobalLabel.name + labelParameter.label;
    }
    this.unresolvedParameters.push({
      labelParameter: labelParameter,
      line: line,
    });
  }
  resolveAddresses() {
    _.each(this.unresolvedParameters, (record) => {
      if (!_.has(this.labels, record.labelParameter.label)) {
        throw new AssemblyException(
          'Unknown label ' + record.labelParameter.label,
          record.line + 1,
        );
      }
      record.labelParameter.resolveLabel(this.labels[record.labelParameter.label].address);
    });
  }
  normalizeLabelName(label, local, address) {
    if (local) {
      let previousLabel = this.findPreviousGlobalLabel(address);
      if (previousLabel === undefined) {
        throw new AssemblyException('Local label without a global label: ' + label);
      }
      return previousLabel.name + '.' + label;
    }
    return label;
  }
  hasLabel(label) {
    return _.has(this.labels, label);
  }
  findPreviousGlobalLabel(address) {
    return _.findLast(this.labels, (label) => !label.local && label.address <= address);
  }
}
