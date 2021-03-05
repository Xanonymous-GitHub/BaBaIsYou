import * as PIXI from 'pixi.js'
import {Towards} from "@/core/types/things";

export abstract class Thing extends PIXI.Sprite {
  private _blockX?: number
  private _blockY?: number
  private _maxBlockX?: number
  private _maxBlockY?: number
  private _defaultTowards?: Towards
  private _blockSize?: number
  
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
  
  public abstract moveTop(): Promise<void>;
  
  public abstract moveDown(): Promise<void>;
  
  public abstract moveRight(): Promise<void>;
  
  public abstract moveLeft(): Promise<void>;
}
