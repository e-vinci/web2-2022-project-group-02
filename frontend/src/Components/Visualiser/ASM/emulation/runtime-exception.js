/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
// @ts-nocheck
export class RuntimeException extends Error {
  message;
  constructor(message = '') {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, RuntimeException.prototype);
  }
}
