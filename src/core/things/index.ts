import * as PIXI from 'pixi.js'
import {Towards} from "../types/things";

export abstract class Thing extends PIXI.Sprite {
  private _blockX?: number
  private _blockY?: number
  private readonly _maxBlockX?: number
  private readonly _maxBlockY?: number
  private _defaultTowards?: Towards
  private readonly _blockSize?: number
  
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
  };
  
  public set blockX(x: number) {
    this._blockX = x
  };
  
  public get blockY(): number {
    return Number(this._blockX)
  };
  
  public set blockY(y: number) {
    this._blockY = y
  };
  
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
  };
  
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
  };
  
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
  };
  
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
  };
}
