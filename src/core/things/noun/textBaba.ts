import {Thing} from '../';
import {Direction} from '../../types/things';
import {Species} from '../../resource';
import {Texture} from 'pixi.js';
import {PropertyType} from '../../types/properties';
import {reverseDirection} from '../../utils/direction';
import {EmptyInstruction, Instruction} from '../../instructions';
import move from '../../instructions/move';

class TextBaba extends Thing {
    public handleBeside(visitor: Thing, visitorBeside: Direction): Promise<void> {
        return Promise.resolve(undefined);
    }

    public async handleEncounter(visitor: Thing, visitorFrom: Direction): Promise<boolean> {
        // check if self isPush
        const isPush = this._ruleController.$is(this, PropertyType.PUSH)
        console.log(isPush)
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

            const canLeave = await this._mapController.canIEncounter(this, reverseDirection(visitorFrom))
            if (!canLeave) return false
            let newInstruction: Instruction
            switch (visitorFrom) {
                case Direction.TOP:
                    newInstruction = new move.MoveDownInstruction(this, this._ruleController, this._mapController)
                    break
                case Direction.DOWN:
                    newInstruction = new move.MoveUpInstruction(this, this._ruleController, this._mapController)
                    break
                case Direction.LEFT:
                    newInstruction = new move.MoveRightInstruction(this, this._ruleController, this._mapController)
                    break
                case Direction.RIGHT:
                    newInstruction = new move.MoveLeftInstruction(this, this._ruleController, this._mapController)
                    break
                default:
                    newInstruction = new EmptyInstruction(this, this._ruleController, this._mapController)
                    break
            }
            this._thingController.pushInstruction(newInstruction)
        }
        return true
    }

    public handleLeave(visitor: Thing, visitorLeavesFrom: Direction): Promise<void> {
        return Promise.resolve(undefined);
    }
}

export const createTextBaba = (
    name: string,
    species: Species,
    texture: Texture,
    defaultBlockX: number,
    defaultBlockY: number,
    blockSize: number,
    maxBlockX: number,
    maxBlockY: number,
    defaultTowards?: Direction
) => new TextBaba(name, species, texture, defaultBlockX, defaultBlockY, blockSize, maxBlockX, maxBlockY, defaultTowards)