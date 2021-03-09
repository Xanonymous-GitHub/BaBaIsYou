export interface Task<T> {
    execute: () => Promise<T>;
}
