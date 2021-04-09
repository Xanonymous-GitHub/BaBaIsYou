import {Thing} from '../';
import {Direction} from '../../types/things';
import {PropertyType} from '../../types/properties';

export class Wall extends Thing {
    public async handleBesides(visitor: Thing, direction: Direction): Promise<void> {

    }

    public async handleEncounter(visitor: Thing, direction: Direction): Promise<boolean> {
        // check if self isPush
        const isPush = this._ruleController.$is(this, PropertyType.PUSH)
        return true
    }
}