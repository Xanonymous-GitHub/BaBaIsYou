import {Thing} from '../';
import {Direction} from '../../types/things';
import {PropertyType} from '../../types/properties';

export class Wall extends Thing {
    public async handleEncounter(visitor: Thing, visitorFrom: Direction): Promise<boolean> {
        // check if self isPush
        const isPush = this._ruleController.$is(this, PropertyType.PUSH)
        if (isPush) {
            // edge detection
            switch (visitorFrom) {
                case Direction.DOWN:
                    if (this.atBottomEdge()) return false
                    break
                case Direction.TOP:
                    if (this.atTopEdge()) return false
                    break
                case Direction.RIGHT:
                    if (this.atRightEdge()) return false
                    break
                case Direction.LEFT:
                    if (this.atLeftEdge()) return false
                    break
            }

            const canLeave = await this._mapController.canIEncounter(this, visitorFrom)
            if (canLeave){
                // add a pending instruction to observer.
            }
        }
        return true
    }

    public async handleBeside(visitor: Thing, visitorBeside: Direction): Promise<void> {

    }


    public async handleLeave(visitor: Thing, visitorLeavesFrom: Direction): Promise<void> {

    }
}