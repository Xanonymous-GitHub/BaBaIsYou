import {Application} from 'pixi.js'
import {getBlockSize} from '../../utils/screen';

export interface Edge {
    maxX: number,
    maxY: number
}

export interface ScreenService {
    setAppSize: (width: number, height: number) => void
    getAppEdge: () => Readonly<Edge>
    bindAppToScreenService: (app: Application) => void
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
        const blockSize = getBlockSize()
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