/***************************************************************************************
 *    Title: x86 assembly debugger
 *    Author: Jakub Beránek
 *    Date: 08/12/2022
 *    Code version: commit b952a3b
 *    Availability: https://github.com/Kobzol/davis
 ***************************************************************************************/
import { RuntimeException } from './runtime-exception';
// TODO: reimplement the operations in bitwise manner
export class ALU {
  cpu;
  constructor(cpu) {
    this.cpu = cpu;
  }
  add(op1, op2, previousCarry = 0, subtract = false) {
    op1 = this.normalize(op1);
    op2 = this.normalize(op2);
    const originalOp1 = op1;
    const originalOp2 = op2;
    let result = 0;
    let carry = [0, previousCarry];
    for (let i = 0; i < 32; i++) {
      carry[0] = carry[1];
      let value = (op1 & 1) + (op2 & 1) + carry[0];
      op1 >>= 1;
      op2 >>= 1;
      result |= value % 2 << i;
      carry[1] = value / 2 >= 1 ? 1 : 0;
    }
    this.cpu.statusWord.carry =
      (!subtract && carry[1] === 1) || (subtract && originalOp1 < -originalOp2);
    this.cpu.statusWord.overflow = (carry[0] ^ carry[1]) === 1;
    this.cpu.setFlags(result);
    return this.normalize(result);
  }
  sub(op1, op2, previousCarry = 0) {
    return this.add(op1, this.normalize(-op2), previousCarry, true);
  }
  idivide(dividend, divisor) {
    dividend = this.normalize(dividend);
    divisor = this.normalize(divisor);
    if (divisor === 0) {
      throw new RuntimeException('Division by zero');
    }
    return {
      value: this.normalize(dividend / divisor),
      remainder: this.normalize(dividend % divisor),
    };
  }
  imultiply(op1, op2) {
    op1 = this.normalize(op1);
    op2 = this.normalize(op2);
    let result = op1 * op2;
    let lowerHalf = result & 0xffffffff;
    let upperHalf = result / Math.pow(2, 32);
    return {
      lowerHalf: this.normalize(lowerHalf),
      upperHalf: this.normalize(upperHalf),
    };
  }
  inc(value) {
    value = this.normalize(value);
    return this.normalize(value + 1);
  }
  dec(value) {
    value = this.normalize(value);
    return this.normalize(value - 1);
  }
  and(op1, op2) {
    let result = op1 & op2;
    this.cpu.setFlags(result);
    this.cpu.statusWord.overflow = false;
    this.cpu.statusWord.carry = false;
    return result;
  }
  or(op1, op2) {
    let result = op1 | op2;
    this.cpu.setFlags(result);
    this.cpu.statusWord.overflow = false;
    this.cpu.statusWord.carry = false;
    return result;
  }
  xor(op1, op2) {
    let result = op1 ^ op2;
    this.cpu.setFlags(result);
    this.cpu.statusWord.overflow = false;
    this.cpu.statusWord.carry = false;
    return result;
  }
  extend64bit(lowerHalf, upperHalf) {
    lowerHalf = this.normalize(lowerHalf);
    upperHalf = this.normalize(upperHalf);
    return this.normalize(upperHalf * Math.pow(2, 32) + lowerHalf);
  }
  normalize(value) {
    return value | 0;
  }
}
