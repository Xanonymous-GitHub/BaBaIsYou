import {Texture} from 'pixi.js'
import {Task} from './'

abstract class TextureTask<T> implements Task<T> {
    public abstract execute(): Promise<T>;
}

export class LoadSourceToTexture extends TextureTask<Texture> {
    private readonly _path: string

    constructor(path: string) {
        super()
        this._path = path
    }

    public execute(): Promise<Texture> {
        return new Promise<Texture>((resolve, reject) => {
            const texture = Texture.from(this._path)
            if (texture) {
                resolve(texture)
            }
            reject(texture)
        })
    }
}