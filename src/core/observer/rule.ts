import {Command, CommandType} from '../store/services/command';
import {Thing} from '../things';
import {PropertyType} from '../types/property';
import {NounType} from '../types/nouns';
import {OperatorType} from '../types/operator';
import {ThingType} from '../types';
import {CharacterType} from '../types/character';

export interface RuleController {
    judgmentCommand: (command: Command, thing: Thing) => boolean
    addProperty: (property: PropertyType, thing: Thing) => void
    removeProperty: (property: PropertyType, thing: Thing) => void
}


class RuleControllerConcrete implements RuleController {
    private _ruleMap: Map<ThingType, Array<PropertyType>>

    constructor() {
        this._ruleMap = new Map();

        // set default property
        (Object.keys(NounType) as Array<NounType>).map(noun => this._ruleMap.set(noun, [PropertyType.PUSH]));
        (Object.keys(PropertyType) as Array<PropertyType>).map(property => this._ruleMap.set(property, [PropertyType.PUSH]));
        (Object.keys(OperatorType) as Array<OperatorType>).map(operator => this._ruleMap.set(operator, [PropertyType.PUSH]));

        // DEBUG
        this._ruleMap.set(CharacterType.BABA, [PropertyType.YOU])
    }

    public judgmentCommand(command: Command, thing: Thing): boolean {
        const noun = thing.name as NounType
        const properties = this._ruleMap.get(noun)
        const commandValue = command.value

        switch (commandValue) {
            case CommandType.UP:
            case CommandType.DOWN:
            case CommandType.RIGHT:
            case CommandType.LEFT:
                return Boolean(properties && properties.includes(PropertyType.YOU))
            default:
                return false
        }
    }

    public addProperty(property: PropertyType, thing: Thing): void {
        const thingType = thing.name as ThingType
        if (!this._ruleMap.has(thingType)) {
            this._ruleMap.set(thingType, [property])
            return
        }
        this._ruleMap.get(thingType)!.push(property)
    }

    public removeProperty(property: PropertyType, thing: Thing): void {
        const thingType = thing.name as ThingType
        if (!this._ruleMap.has(thingType)) throw new Error(`thingType ${thingType} not been recorded yet`)
        const indexToRemove = this._ruleMap.get(thingType)!.indexOf(property)
        if (indexToRemove === -1) throw new Error(`thingType ${thingType} does not have property ${property}`)
        this._ruleMap.get(thingType)!.splice(indexToRemove, 1)
    }
}

export const createRuleController = (): RuleController => {
    return new RuleControllerConcrete()
}
