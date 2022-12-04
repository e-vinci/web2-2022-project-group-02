// Alternative to Angular's EventEmitter
// Good enough for us -Erman
class EventEmitter<T> {
  callbacks: Array<(data: T) => unknown>;

  constructor() {
    this.callbacks = [];
  }

  emit(data: T) {
    this.callbacks.forEach((callback) => {
      callback(data);
    });
  }

  subscribe(callback: (data: T) => unknown) {
    this.callbacks.push(callback);
  }
}

export { EventEmitter };
