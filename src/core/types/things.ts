export enum Direction {
    TOP,
    DOWN,
    RIGHT,
    LEFT
}

export interface ThingSetup {
    readonly defaultBlockX: number
    readonly defaultBlockY: number
    readonly textureName: string
    readonly defaultTowards: number & Direction
}