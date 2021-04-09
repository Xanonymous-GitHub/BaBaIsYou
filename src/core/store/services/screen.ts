import {Application} from 'pixi.js'

export interface Edge {
    maxX: number,
    maxY: number
}

export interface ScreenService {
    setAppSize: (width: number, height: number) => void
    getAppEdge: () => Readonly<Edge>
    bindApp: (app: Application) => void
}

class ScreenServiceConcrete implements ScreenService {
    private _gameApp!: Application
    private _edge!: Edge

    public getAppEdge(): Readonly<Edge> {
        return this._edge
    }

    public setAppSize(width: number, height: number): void {
        this._edge.maxX = width - 1
        this._edge.maxY = height - 1
        this._gameApp.renderer.resize(
            this._edge.maxX,
            this._edge.maxY
        )
    }

    public bindApp(app: Application): void {
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