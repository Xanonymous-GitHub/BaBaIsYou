import {Sprite, Texture} from 'pixi.js'
import {Towards} from '../types/things';
import {Factor} from '../types';
import {ThingSetup} from '../types/things';

export class Thing extends Sprite {
    private _blockX: number // start from 0
    private _blockY: number // start from 0
    private readonly _maxBlockX: number
    private readonly _maxBlockY: number
    private readonly _blockSize: number
    private _towards: Towards

    protected constructor(
        texture: Texture,
        defaultBlockX: number,
        defaultBlockY: number,
        blockSize: number,
        maxBlockX: number,
        maxBlockY: number,
        defaultTowards?: Towards
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
        this._towards = defaultTowards ?? 0;

        // setup block size.
        this._blockSize = blockSize
        this.height = blockSize
        this.width = blockSize

        // center the sprite's anchor point.
        this.anchor.set(0.5)

        // move to the point
        this.x = (this._blockX + 0.5) * this._blockSize
        this.y = (this._blockY + 0.5) * this._blockSize
    }

    public setup(options: Pick<ThingSetup, 'defaultBlockX' | 'defaultBlockY' | 'defaultTowards'>) {
        this.blockX = options.defaultBlockX
        this.blockY = options.defaultBlockY
        this.towards = options.defaultTowards
    }

    public get blockX(): number {
        return Number(this._blockX)
    }

    public set blockX(x: number) {
        this._blockX = x
        this.x = (x + 0.5) * this._blockSize
    }

    public get blockY(): number {
        return Number(this._blockX)
    }

    public set blockY(y: number) {
        this._blockY = y
        this.y = (y + 0.5) * this._blockSize
    }

    public set towards(side: Towards) {
        this._towards = side
    }

    public get towards(): Towards {
        return this._towards
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

abstract class Factory {
    public abstract createInstance<T>(_factor: Factor<T>): T;
}

export class ThingFactory extends Factory {
    public createInstance<T>(factor: Factor<T>, ...args: Array<any>): T {
        return new factor(...args)
    }
}
