import {Thing} from '../';
import {Direction} from '../../types/things';
import {Species} from '../../resource';
import {Texture} from 'pixi.js';

import {canBePushed, preparePushActions} from '../actions';
import {PropertyType} from '../../types/properties';

class Flag extends Thing {
    public handleBeside(visitor: Thing, visitorBeside: Direction): Promise<void> {
        return Promise.resolve(undefined);
    }

    public async handleEncounter(visitor: Thing, visitorFrom: Direction): Promise<boolean> {
        const result = true

        // handle PUSH
        const isPush = this._ruleController.$is(this, PropertyType.PUSH)
        if (isPush){
            if (await canBePushed(this, this._mapController, visitorFrom)) {
                preparePushActions(this, this._ruleController, this._mapController, this._thingController, visitorFrom)
            }
        }

        return result
    }

    public handleLeave(visitor: Thing, visitorLeavesFrom: Direction): Promise<void> {
        return Promise.resolve(undefined);
    }
}

export const createFlag = (
    name: string,
    species: Species,
    texture: Texture,
    defaultBlockX: number,
    defaultBlockY: number,
    blockSize: number,
    maxBlockX: number,
    maxBlockY: number,
    defaultTowards?: Direction
) => new Flag(name, species, texture, defaultBlockX, defaultBlockY, blockSize, maxBlockX, maxBlockY, defaultTowards)