// Alternative to Angular's EventEmitter
// Good enough for us -Erman
class EventEmitter {
  callbacks;
  constructor() {
    this.callbacks = [];
  }
  emit(data) {
    this.callbacks.forEach((callback) => {
      callback(data);
    });
  }
  subscribe(callback) {
    this.callbacks.push(callback);
  }
}
export { EventEmitter };
