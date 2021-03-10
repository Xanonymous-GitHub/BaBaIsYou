export type Factor<T> = new(...args: Array<any>) => T;

export interface SceneSetup<T> {
    readonly id: string
    readonly name: string
    readonly elements: Array<T>
}