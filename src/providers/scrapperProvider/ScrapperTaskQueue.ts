import { EventEmitter } from 'react-native';

export default class ScrapperTaskQueue<T> extends EventEmitter {
  private queue: T[] = [];

  public enqueue(t: T) {
    this.queue.push(t);
    this.emit('enqueue');
  }

  public remove(t: T) {
    this.queue = this.queue.filter((data) => {
      return data !== t;
    });
  }

  public dequeue(): T | undefined {
    const data = this.queue.shift();

    return data;
  }

  public size(): number {
    return this.queue.length;
  }
}
