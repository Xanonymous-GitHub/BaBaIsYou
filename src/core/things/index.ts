import * as PIXI from 'pixi.js'
import {getBlockSize} from "@/core/utils/screen";
import {Towards} from "@/core/types/things";

export abstract class Thing extends PIXI.Sprite {
  private _blockX?: number
  private _blockY?: number
  private _maxBlockX?: number
  private _maxBlockY?: number
  private _defaultTowards?: Towards
  
  protected constructor(
    texture: PIXI.Texture,
    defaultBlockX: number,
    defaultBlockY: number,
    maxBlockX: number,
    maxBlockY: number,
    defaultTowards?: Towards,
  ) {
    super(texture);
    this._blockX = defaultBlockX
    this._blockY = defaultBlockY
    this._maxBlockX = maxBlockX
    this._maxBlockY = maxBlockY
    this._defaultTowards = defaultTowards;
    
    const blockSize = getBlockSize()
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
