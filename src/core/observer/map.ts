import {Direction} from '../types/things';
import {Thing} from '../things';
import {Edge} from '../store/services/screen';
import {isNone, isSome, none, Option, Some, some} from 'fp-ts/es6/Option';

export enum MapUpdateSituation {
    UP = 'up',
    DOWN = 'down',
    RIGHT = 'right',
    LEFT = 'left',
    APPEAR = 'appear',
    DISAPPEAR = 'disappear'
}

export interface MapController {
    canIEncounter: (subject: Thing, direction: Direction) => Promise<boolean>
    update: (subject: Thing, situation: MapUpdateSituation) => Promise<void>
    clean: () => void
}

class MapControllerConcrete implements MapController {
    private readonly _gameMap: Array<Array<Option<Array<Thing>>>>
    private readonly maxX: number
    private readonly maxY: number

    constructor(mapEdge: Edge) {
        // get map size
        this.maxX = mapEdge.maxX
        this.maxY = mapEdge.maxY

        // construct map from map size
        this._gameMap = new Array<Array<Option<Array<Thing>>>>(this.maxX)
        for (let x = 0; x < this.maxX; x++) {
            this._gameMap[x] = new Array<Option<Array<Thing>>>(this.maxY)
        }

        // init map value
        this._resetMap()
    }

    private _resetMap(): void {
        for (let x = 0; x < this.maxX; x++) {
            for (let y = 0; y < this.maxY; y++) {
                this._gameMap[x][y] = none
            }
        }
    }

    private _placeToPosition(x: number, y: number, subject: Thing): void {
        if (x < 0 || x > this.maxX || y < 0 || y > this.maxY) throw new Error(`Map system error, pos @ x:${x} y:${y} is out of range!`)
        if (isNone(this._gameMap[x][y])) this._gameMap[x][y] = some([subject])
        else if (isSome(this._gameMap[x][y])) (this._gameMap[x][y] as Some<Array<Thing>>).value.push(subject)
        else throw new Error(`Map system error, pos @ x:${x} y:${y} is invalid type!`)
    }

    private _removeFromPosition(x: number, y: number, subject: Thing): void {
        if (x < 0 || x > this.maxX || y < 0 || y > this.maxY) throw new Error(`Map system error, pos @ x:${x} y:${y} is out of range!`)
        if (isSome(this._gameMap[x][y])) {
            const pos = (this._gameMap[x][y] as Some<Array<Thing>>).value.findIndex(thing => thing.id === subject.id)
            if (pos === -1) throw new Error(`Thing ${subject.id} name = ${subject.name} is not in the pos @ x:${x} y:${y}, can't be removed!`);
            (this._gameMap[x][y] as Some<Array<Thing>>).value.splice(pos, 1)
        } else throw new Error(`Map system error, pos @ x:${x} y:${y} is invalid type!`)
    }

    public async canIEncounter(subject: Thing, direction: Direction): Promise<boolean> {
        return Promise.resolve(false);
    }

    private async _notifyBeside(subject: Thing, without?: Array<Direction>): Promise<void> {
        return Promise.resolve(undefined);
    }

    private async _notifyLeave(subject: Thing, without?: Array<Direction>): Promise<void> {
        return Promise.resolve(undefined);
    }

    // this function will be called after an instruction has been performed.
    public async update(subject: Thing, happenedSituation: MapUpdateSituation): Promise<void> {
        const x = subject.blockX
        const y = subject.blockY

        const exclusionDirectionsOfNotifyBeside: Array<Direction> = []
        const exclusionDirectionsOfNotifyLeave: Array<Direction> = []

        switch (happenedSituation) {
            case MapUpdateSituation.APPEAR:
                this._placeToPosition(x, y, subject)
                exclusionDirectionsOfNotifyLeave.push(
                    Direction.TOP,
                    Direction.DOWN,
                    Direction.LEFT,
                    Direction.RIGHT
                )
                break
            case MapUpdateSituation.DISAPPEAR:
                this._removeFromPosition(x, y, subject)
                exclusionDirectionsOfNotifyBeside.push(
                    Direction.TOP,
                    Direction.DOWN,
                    Direction.LEFT,
                    Direction.RIGHT
                )
                break
            case MapUpdateSituation.UP:
                this._placeToPosition(x, y, subject)
                this._removeFromPosition(x, y + 1, subject)
                exclusionDirectionsOfNotifyBeside.push(Direction.DOWN)
                exclusionDirectionsOfNotifyLeave.push(Direction.TOP)
                break
            case MapUpdateSituation.DOWN:
                this._placeToPosition(x, y, subject)
                this._removeFromPosition(x, y - 1, subject)
                exclusionDirectionsOfNotifyBeside.push(Direction.TOP)
                exclusionDirectionsOfNotifyLeave.push(Direction.DOWN)
                break
            case MapUpdateSituation.LEFT:
                this._placeToPosition(x, y, subject)
                this._removeFromPosition(x + 1, y, subject)
                exclusionDirectionsOfNotifyBeside.push(Direction.RIGHT)
                exclusionDirectionsOfNotifyLeave.push(Direction.LEFT)
                break
            case MapUpdateSituation.RIGHT:
                this._placeToPosition(x, y, subject)
                this._removeFromPosition(x - 1, y, subject)
                exclusionDirectionsOfNotifyBeside.push(Direction.LEFT)
                exclusionDirectionsOfNotifyLeave.push(Direction.RIGHT)
                break
        }

        await Promise.all([
            this._notifyBeside(subject, exclusionDirectionsOfNotifyBeside),
            this._notifyLeave(subject, exclusionDirectionsOfNotifyLeave)
        ])
    }

    public clean(): void {
        this._resetMap()
    }
}

export const createMapController = (mapEdge: Edge): MapController => {
    return new MapControllerConcrete(mapEdge)
}
