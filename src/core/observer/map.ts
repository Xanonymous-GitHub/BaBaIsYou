import {Direction} from '../types/things';
import {Thing} from '../things';

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
    update: (subject: Thing, situation: MapUpdateSituation) => void
}

class MapControllerConcrete implements MapController {
    private _gameMap: Array<Array<Thing>>

    constructor() {
        this._gameMap = [[]]
    }

    public canIEncounter(subject: Thing, direction: Direction): Promise<boolean> {
        return Promise.resolve(false);
    }

    public update(subject: Thing, situation: MapUpdateSituation): void {
        // switch (situation) {
        //     case MapUpdateSituation.APPEAR:
        //         this._gameMap
        // }
    }
}

export const createMapController = (): MapController => {
    return new MapControllerConcrete()
}
