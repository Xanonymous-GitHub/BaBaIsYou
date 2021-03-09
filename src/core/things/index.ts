import * as PIXI from 'pixi.js'
import {Towards} from "../types/things";

export abstract class Thing extends PIXI.Sprite {
    private _blockX: number // start from 0
    private _blockY: number // start from 0
    private readonly _maxBlockX: number
    private readonly _maxBlockY: number
    private readonly _blockSize: number
    private _defaultTowards?: Towards

    protected constructor(
        texture: PIXI.Texture,
        defaultBlockX: number,
        defaultBlockY: number,
        blockSize: number,
        maxBlockX: number,
        maxBlockY: number,
        defaultTowards?: Towards,
    ) {
        // provide the texture to the sprite.
        super(texture)

        // setup default positions.
        this._blockX = defaultBlockX
        this._blockY = defaultBlockY

        // setup maximum block point on map.
        this._maxBlockX = maxBlockX
        this._maxBlockY = maxBlockY

        // setup default sprite towards.
        this._defaultTowards = defaultTowards;

        // setup block size.
        this._blockSize = blockSize
        this.height = blockSize
        this.width = blockSize

        // center the sprite's anchor point.
        this.anchor.set(0.5)
    }

    public get blockX(): number {
        return Number(this._blockX)
    }

    public set blockX(x: number) {
        this._blockX = (x + 0.5) * this._blockSize
    }

    public get blockY(): number {
        return Number(this._blockX)
    }

    public set blockY(y: number) {
        this._blockY = (y + 0.5) * this._blockSize
    }

    protected async moveTop(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            if (this.blockY === this._maxBlockY) {
                reject()
            } else if (this.blockY === 0) {
                reject()
            } else {
                this.blockY--
            }
            resolve()
        })
    }

    protected async moveDown(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            if (this.blockY === this._maxBlockY) {
                reject()
            } else if (this.blockY === 0) {
                reject()
            } else {
                this.blockY++
            }
            resolve()
        })
    }

    protected async moveRight(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            if (this.blockX === this._maxBlockX) {
                reject()
            } else if (this.blockX === 0) {
                reject()
            } else {
                this.blockX++
            }
            resolve()
        })
    }

    protected async moveLeft(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            if (this.blockX === this._maxBlockX) {
                reject()
            } else if (this.blockX === 0) {
                reject()
            } else {
                this.blockX--
            }
            resolve()
        })
    }
}

abstract class Factory<T> {
    protected readonly _factor!: { new(...params: Array<any>): T }

    public abstract createInstance(...params: Array<any>): T;
}

export class ThingFactory<T extends Thing> extends Factory<T> {
    public createInstance(...params: Array<any>): T {
        return new this._factor(params)
    }
}
