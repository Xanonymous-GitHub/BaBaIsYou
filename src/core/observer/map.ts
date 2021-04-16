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

export interface Neighbor {
    up: Option<Array<Readonly<Thing>>>
    down: Option<Array<Readonly<Thing>>>
    left: Option<Array<Readonly<Thing>>>
    right: Option<Array<Readonly<Thing>>>
}

export interface MapController {
    canIEncounter: (subject: Thing, direction: Direction) => Promise<boolean>
    update: (subject: Thing, situation: MapUpdateSituation) => Promise<void>
    notifyBeside: (subject: Thing, notifyDirections: Array<Direction>) => Promise<void>
    notifyLeave: (subject: Thing, notifyDirections: Array<Direction>) => Promise<void>
    whoAreThere: (x: number, y: number) => Option<Array<Readonly<Thing>>>
    whoNearMe: (subject: Thing) => Neighbor
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

    public async canIEncounter(requester: Thing, direction: Direction): Promise<boolean> {
        const x = requester.blockX
        const y = requester.blockY

        switch (direction) {

            case Direction.LEFT:
                if (requester.atLeftEdge()) return false
                if (isNone(this._gameMap[x - 1][y])) return true
                return (await Promise.all(
                    (this._gameMap[x - 1][y] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleEncounter(requester, Direction.RIGHT))
                )).reduce((previousResult, currentResult) => previousResult && currentResult, true)

            case Direction.RIGHT:
                if (requester.atRightEdge()) return false
                if (isNone(this._gameMap[x + 1][y])) return true
                return (await Promise.all(
                    (this._gameMap[x + 1][y] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleEncounter(requester, Direction.LEFT))
                )).reduce((previousResult, currentResult) => previousResult && currentResult, true)

            case Direction.TOP:
                if (requester.atTopEdge()) return false
                if (isNone(this._gameMap[x][y - 1])) return true
                return (await Promise.all(
                    (this._gameMap[x][y - 1] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleEncounter(requester, Direction.DOWN))
                )).reduce((previousResult, currentResult) => previousResult && currentResult, true)

            case Direction.DOWN:
                if (requester.atBottomEdge()) return false
                if (isNone(this._gameMap[x][y + 1])) return true
                return (await Promise.all(
                    (this._gameMap[x][y + 1] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleEncounter(requester, Direction.TOP))
                )).reduce((previousResult, currentResult) => previousResult && currentResult, true)
        }
    }

    public async notifyBeside(subject: Thing, notifyDirections: Array<Direction>): Promise<void> {
        const x = subject.blockX
        const y = subject.blockY

        await Promise.allSettled(
            notifyDirections.map((direction): PromiseLike<any> => {
                switch (direction) {
                    case Direction.LEFT:
                        if (subject.atLeftEdge() || isNone(this._gameMap[x - 1][y])) return Promise.resolve()
                        return Promise.allSettled((this._gameMap[x - 1][y] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleBeside(subject, Direction.RIGHT)))

                    case Direction.RIGHT:
                        if (subject.atRightEdge() || isNone(this._gameMap[x + 1][y])) return Promise.resolve()
                        return Promise.allSettled((this._gameMap[x + 1][y] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleBeside(subject, Direction.LEFT)))

                    case Direction.TOP:
                        if (subject.atTopEdge() || isNone(this._gameMap[x][y - 1])) return Promise.resolve()
                        return Promise.allSettled((this._gameMap[x][y - 1] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleBeside(subject, Direction.DOWN)))

                    case Direction.DOWN:
                        if (subject.atBottomEdge() || isNone(this._gameMap[x][y + 1])) return Promise.resolve()
                        return Promise.allSettled((this._gameMap[x][y + 1] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleBeside(subject, Direction.TOP)))
                }
            })
        )
    }

    public async notifyLeave(subject: Thing, notifyDirections: Array<Direction>): Promise<void> {
        const x = subject.blockX
        const y = subject.blockY

        await Promise.allSettled(
            notifyDirections.map((direction): PromiseLike<any> => {
                switch (direction) {
                    case Direction.LEFT:
                        if (subject.atLeftEdge() || isNone(this._gameMap[x - 1][y])) return Promise.resolve()
                        return Promise.allSettled((this._gameMap[x - 1][y] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleLeave(subject, Direction.RIGHT)))

                    case Direction.RIGHT:
                        if (subject.atRightEdge() || isNone(this._gameMap[x + 1][y])) return Promise.resolve()
                        return Promise.allSettled((this._gameMap[x + 1][y] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleLeave(subject, Direction.LEFT)))

                    case Direction.TOP:
                        if (subject.atTopEdge() || isNone(this._gameMap[x][y - 1])) return Promise.resolve()
                        return Promise.allSettled((this._gameMap[x][y - 1] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleLeave(subject, Direction.DOWN)))

                    case Direction.DOWN:
                        if (subject.atBottomEdge() || isNone(this._gameMap[x][y + 1])) return Promise.resolve()
                        return Promise.allSettled((this._gameMap[x][y + 1] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleLeave(subject, Direction.TOP)))
                }
            })
        )
    }

    // this function will be called after an instruction has been performed.
    public async update(subject: Thing, happenedSituation: MapUpdateSituation): Promise<void> {
        const x = subject.blockX
        const y = subject.blockY

        switch (happenedSituation) {
            case MapUpdateSituation.APPEAR:
                this._placeToPosition(x, y, subject)
                break

            case MapUpdateSituation.DISAPPEAR:
                this._removeFromPosition(x, y, subject)
                break

            case MapUpdateSituation.UP:
                this._placeToPosition(x, y, subject)
                this._removeFromPosition(x, y + 1, subject)
                break

            case MapUpdateSituation.DOWN:
                this._placeToPosition(x, y, subject)
                this._removeFromPosition(x, y - 1, subject)
                break

            case MapUpdateSituation.LEFT:
                this._placeToPosition(x, y, subject)
                this._removeFromPosition(x + 1, y, subject)
                break

            case MapUpdateSituation.RIGHT:
                this._placeToPosition(x, y, subject)
                this._removeFromPosition(x - 1, y, subject)
                break
        }
    }

    public clean(): void {
        this._resetMap()
    }

    public whoAreThere(x: number, y: number): Option<Array<Readonly<Thing>>> {
        if (x < 0 || x > this.maxX || y < 0 || y > this.maxY) throw new Error(`Map system error, pos @ x:${x} y:${y} is out of range!`)
        return this._gameMap[x][y]
    }

    public whoNearMe(subject: Thing): Neighbor {
        const x = subject.blockX
        const y = subject.blockY

        const up = subject.atTopEdge() ? none : this._gameMap[x][y - 1]
        const down = subject.atBottomEdge() ? none : this._gameMap[x][y + 1]
        const left = subject.atLeftEdge() ? none : this._gameMap[x - 1][y]
        const right = subject.atRightEdge() ? none : this._gameMap[x + 1][y]

        return {up, down, left, right}
    }
}

export const createMapController = (mapEdge: Edge): MapController => {
    return new MapControllerConcrete(mapEdge)
}
