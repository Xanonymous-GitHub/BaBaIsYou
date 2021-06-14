import { Task } from './index'

abstract class Resource<T> implements Task<T> {
  public abstract execute(): Promise<T>;

  public abstract setArgs(...args: any[]): void
}