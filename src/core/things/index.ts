import {appWidth, appHeight} from "@/core/settings";

abstract class Thing {
  private _posX?: number;
  private _posY?: number;
  
  public get posX(): number {
    return Number(this._posX)
  };
  
  public get posY(): number {
    return Number(this._posX)
  };
  
  public set posX(x: number) {
    this._posX = x
  };
  
  public set posY(y: number) {
    this._posY = y
  };
  
  public abstract moveTop(): Promise<void>;
  
  public abstract moveDown(): Promise<void>;
  
  public abstract moveRight(): Promise<void>;
  
  public abstract moveLeft(): Promise<void>;
}
