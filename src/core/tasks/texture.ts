import { Texture } from 'pixi.js'
import { Task } from './'

abstract class TextureTask<T> implements Task<T> {
  public abstract execute(): Promise<T>;

  public abstract setArgs(...args: any[]): void
}

export class LoadSourceToTextureTask extends TextureTask<Texture> {
  private _path!: string

  public setArgs(path: string) {
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