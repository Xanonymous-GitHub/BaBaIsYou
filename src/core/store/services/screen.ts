import { Application } from 'pixi.js'
import { getBlockSize } from '@/core/app/screen'

export interface Edge {
  maxX: number,
  maxY: number
}

export interface ScreenSize {
  width: number,
  height: number
}

export interface ScreenService {
  setAppSize: (width: number, height: number) => void
  getAppEdge: () => Readonly<Edge>
  getScreenSize: () => Readonly<ScreenSize>
  bindAppToScreenService: (app: Application) => void
}

class ScreenServiceConcrete implements ScreenService {
  private _gameApp!: Application
  private _edge!: Edge
  private _screenHeight!: number
  private _screenWidth!: number

  public getAppEdge(): Readonly<Edge> {
    return this._edge
  }

  public getScreenSize(): Readonly<ScreenSize> {
    return {
      width: this._screenWidth,
      height: this._screenHeight
    }
  }

  public setAppSize(width: number, height: number): void {
    this._edge.maxX = width - 1
    this._edge.maxY = height - 1
    this._screenHeight = innerHeight
    this._screenWidth = innerWidth
    const blockSize = getBlockSize(this._edge, this.getScreenSize())
    this._gameApp.renderer.resize(
      width * blockSize,
      height * blockSize
    )
  }

  public bindAppToScreenService(app: Application): void {
    this._gameApp = app
    this._edge = {
      maxX: this._gameApp.screen.x,
      maxY: this._gameApp.screen.y
    }
  }
}

export const createScreenService = (): ScreenService => {
  return new ScreenServiceConcrete()
}