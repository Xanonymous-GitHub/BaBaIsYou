export enum Towards {
    TOP,
    DOWN,
    RIGHT,
    LEFT
}

export interface Thing {
    readonly defaultBlockX: number
    readonly defaultBlockY: number
    readonly maxBlockX: number
    readonly maxBlockY: number
    readonly textureSource: string
    readonly defaultTowards: number & Towards
}