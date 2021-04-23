import {Thing} from '../';
import {Direction} from '../../types/things';
import {PropertyType} from '../../types/properties';
import {EmptyInstruction, Instruction} from '../../instructions';
import move from '../../instructions/move';

export class Wall extends Thing {
    public async handleEncounter(visitor: Thing, visitorFrom: Direction): Promise<boolean> {
        // check if self isPush
        const isPush = this._ruleController.$is(this, PropertyType.PUSH)
        if (isPush) {
            // edge detection
            switch (visitorFrom) {
                case Direction.DOWN:
                    if (this.atTopEdge()) return false
                    break
                case Direction.TOP:
                    if (this.atBottomEdge()) return false
                    break
                case Direction.RIGHT:
                    if (this.atLeftEdge()) return false
                    break
                case Direction.LEFT:
                    if (this.atRightEdge()) return false
                    break
            }

            const canLeave = await this._mapController.canIEncounter(this, visitorFrom)
            if (canLeave) {
                let newInstruction: Instruction
                switch (visitorFrom) {
                    case Direction.TOP:
                        newInstruction = new move.MoveUpInstruction(this, this._ruleController, this._mapController)
                        break
                    case Direction.DOWN:
                        newInstruction = new move.MoveDownInstruction(this, this._ruleController, this._mapController)
                        break
                    case Direction.LEFT:
                        newInstruction = new move.MoveLeftInstruction(this, this._ruleController, this._mapController)
                        break
                    case Direction.RIGHT:
                        newInstruction = new move.MoveRightInstruction(this, this._ruleController, this._mapController)
                        break
                    default:
                        newInstruction = new EmptyInstruction(this, this._ruleController, this._mapController)
                        break
                }
                this._thingController.pushInstruction(newInstruction)
            }
        }
        return true
    }

    public async handleBeside(visitor: Thing, visitorBeside: Direction): Promise<void> {

    }


    public async handleLeave(visitor: Thing, visitorLeavesFrom: Direction): Promise<void> {

    }
}