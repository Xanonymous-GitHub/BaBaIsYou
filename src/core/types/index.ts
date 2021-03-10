export interface SceneSetup<T> {
    readonly id: string
    readonly name: string
    readonly elements: Array<T>
}