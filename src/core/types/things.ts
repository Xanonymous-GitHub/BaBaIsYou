export enum Direction {
    TOP,
    DOWN,
    RIGHT,
    LEFT,
    UNDEFINED
}

export interface ThingSetup {
    readonly defaultBlockX: number
    readonly defaultBlockY: number
    readonly textureName: string
    readonly defaultTowards: number & Direction
}