export enum Towards {
    TOP,
    DOWN,
    RIGHT,
    LEFT
}

export interface ThingSetup {
    readonly defaultBlockX: number
    readonly defaultBlockY: number
    readonly maxBlockX: number
    readonly maxBlockY: number
    readonly textureName: string
    readonly defaultTowards: number & Towards
}