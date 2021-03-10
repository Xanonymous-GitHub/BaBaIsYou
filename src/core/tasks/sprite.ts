import * as PIXI from 'pixi.js'
import {Task} from './'
import {Thing, ThingFactory} from "../things";
import {Towards} from "../types/things";

abstract class SpriteTask<T> implements Task<T> {
    public abstract execute(): Promise<T>;
}

export class createThing<T extends Thing> extends SpriteTask<T> {
    private readonly _texture: PIXI.Texture
    private readonly _defaultBlockX: number
    private readonly _defaultBlockY: number
    private readonly _blockSize: number
    private readonly _maxBlockX: number
    private readonly _maxBlockY: number
    private readonly _defaultTowards?: Towards

    constructor(
        texture: PIXI.Texture,
        defaultBlockX: number,
        defaultBlockY: number,
        blockSize: number,
        maxBlockX: number,
        maxBlockY: number,
        defaultTowards?: Towards
    ) {
        super();
        this._texture = texture
        this._defaultBlockX = defaultBlockX
        this._defaultBlockY = defaultBlockY
        this._blockSize = blockSize
        this._maxBlockX = maxBlockX
        this._maxBlockY = maxBlockY
        this._defaultTowards = defaultTowards
    }

    public async execute(): Promise<T> {
        return await new Promise<T>((resolve, reject) => {
            const thing = new ThingFactory()
                .createInstance<T>(
                    // @ts-ignore
                    Thing,
                    ...Object
                        .getOwnPropertyNames(this)
                        .map(name => Object.getOwnPropertyDescriptor(this, name)!.value)
                )
            if (thing) {
                resolve(thing)
            }
            reject(thing)
        })
    }
}