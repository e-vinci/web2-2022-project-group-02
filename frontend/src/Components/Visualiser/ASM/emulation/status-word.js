export class StatusWord {
  _carry = false;
  _zero = false;
  _overflow = false;
  _signum = false;
  _parity = false;
  _direction = false;
  get carry() {
    return this._carry;
  }
  set carry(value) {
    this._carry = value;
  }
  get zero() {
    return this._zero;
  }
  set zero(value) {
    this._zero = value;
  }
  get overflow() {
    return this._overflow;
  }
  set overflow(value) {
    this._overflow = value;
  }
  get signum() {
    return this._signum;
  }
  set signum(value) {
    this._signum = value;
  }
  get parity() {
    return this._parity;
  }
  set parity(value) {
    this._parity = value;
  }
  get direction() {
    return this._direction;
  }
  set direction(value) {
    this._direction = value;
  }
  toString() {
    return (
      '[CF: ' +
      this.carry +
      ', ZF: ' +
      this.zero +
      ', OF: ' +
      this.overflow +
      ' SF: ' +
      this.signum +
      ', DF: ' +
      this.direction +
      ']'
    );
  }
}
