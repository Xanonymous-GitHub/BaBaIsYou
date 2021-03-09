import * as PIXI from 'pixi.js'
import {Task} from './'

abstract class TextureTask<T> implements Task<T> {
    public abstract execute(): Promise<T>;
}

class LoadSourceToTexture extends TextureTask<PIXI.Texture> {
    private readonly _path: string

    constructor(path: string) {
        super()
        this._path = path
    }

    public execute(): Promise<PIXI.Texture> {
        return new Promise<PIXI.Texture>((resolve, reject) => {
            const texture = PIXI.Texture.from(this._path)
            if (texture) {
                resolve(texture)
            }
            reject(texture)
        })
    }
}