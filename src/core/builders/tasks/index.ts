export interface Task<T> {
  execute: () => Promise<T>;
  setArgs: (...args: any[]) => void;
}
