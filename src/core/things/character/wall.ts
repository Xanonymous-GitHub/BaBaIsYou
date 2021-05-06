import {Thing} from '../';
import {Direction} from '../../types/things';
import {Species} from '../../resource';
import {Texture} from 'pixi.js';

import {canBePushed, preparePushActions} from '../actions';

class Wall extends Thing {
    public async handleBeside(visitor: Thing, visitorBeside: Direction): Promise<void> {

    }

    public async handleEncounter(visitor: Thing, visitorFrom: Direction): Promise<boolean> {
        if (!(await canBePushed(this, this._ruleController, this._mapController, visitorFrom))) return false
        preparePushActions(this, this._ruleController, this._mapController, this._thingController, visitorFrom)
        return true
    }

    public async handleLeave(visitor: Thing, visitorLeavesFrom: Direction): Promise<void> {

    }
}

export const createWall = (
    name: string,
    species: Species,
    texture: Texture,
    defaultBlockX: number,
    defaultBlockY: number,
    blockSize: number,
    maxBlockX: number,
    maxBlockY: number,
    defaultTowards?: Direction
) => new Wall(name, species, texture, defaultBlockX, defaultBlockY, blockSize, maxBlockX, maxBlockY, defaultTowards)