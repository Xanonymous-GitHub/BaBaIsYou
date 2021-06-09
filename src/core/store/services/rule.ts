import {NounType} from '@/core/types/nouns';
import {PropertyType} from '@/core/types/properties';
import {Thing} from '@/core/things';
import {OperatorType} from '@/core/types/operators';
import {none, Option, some} from 'fp-ts/es6/Option';
import {ThingType} from '@/core/types';
import {CharacterType} from '@/core/types/characters';
import {Species} from '@/core/resource';
import {Service} from './';
import {Channel, createChannel} from '@/core/store/channel';
import {Command, CommandTargets, FeatureCondition, FeatureList} from '@/core/store/types';

export interface RuleService extends Service {
    $is: (target: ThingType, requestedFeature: PropertyType) => boolean
    $has: (target: ThingType, requestedFeature: NounType) => boolean
    $make: (target: ThingType, requestedFeature: NounType) => boolean
    getFeaturesOfThing: (thing: Thing, operator: OperatorType) => Option<Array<Readonly<FeatureCondition>>>
    getThingTypesFromProperty: (property: PropertyType) => Array<ThingType>
    addFeature: (thingType: ThingType, operator: OperatorType, featureCondition: FeatureCondition) => void
    removeFeature: (thingType: ThingType, operator: OperatorType, featureCondition: FeatureCondition) => void
    refreshAll: () => void
    commandChannel: Channel<Command>
    commandTargetChannel: Channel<CommandTargets>
}

class RuleServiceConcrete implements RuleService {
    private _features!: Map<ThingType, FeatureList>

    public commandChannel!: Channel<Command> // communicate with command service
    public commandTargetChannel!: Channel<CommandTargets> // communicate with map service

    public async init(): Promise<void> {
        this.commandChannel = createChannel<Command>()
        this.commandChannel.setHandler(this._handleCommand)
        this.commandTargetChannel = createChannel<CommandTargets>()
        this._features = new Map();
        this._giveDefaultRules()
    }

    public refreshAll(): void {
        this._features.clear()
        this._giveDefaultRules()
    }

    private _giveDefaultRules(): void {
        const defaultFeatureList = {
            _is: [{
                feature: PropertyType.PUSH,
                on: [], near: [], facing: []
            } as FeatureCondition
            ], _has: [], _make: []
        } as FeatureList

        const thingsWillHaveDefaultRules = [
            ...(Object.values(NounType) as Array<NounType>),
            ...(Object.values(PropertyType) as Array<PropertyType>),
            ...(Object.values(OperatorType) as Array<OperatorType>)
        ]

        for (const thing of thingsWillHaveDefaultRules) {
            this._features.set(thing, defaultFeatureList)
        }
    }

    public $is(target: ThingType, requestedFeature: PropertyType | NounType): boolean {
        const featureConditions = this._features.get(target)
        if (!featureConditions) return false
        const containsProperty = Boolean(featureConditions._is.find(featureCondition => featureCondition.feature === requestedFeature))
        return Boolean(featureConditions && containsProperty)
    }

    public $has(target: ThingType, requestedFeature: NounType): boolean {
        const featureConditions = this._features.get(target)
        if (!featureConditions) return false
        const containsProperty = Boolean(featureConditions._has.find(featureCondition => featureCondition.feature === requestedFeature))
        return Boolean(featureConditions && containsProperty)
    }

    public $make(target: ThingType, requestedFeature: NounType): boolean {
        const featureConditions = this._features.get(target)
        if (!featureConditions) return false
        const containsProperty = Boolean(featureConditions._make.find(featureCondition => featureCondition.feature === requestedFeature))
        return Boolean(featureConditions && containsProperty)
    }

    public getFeaturesOfThing(thing: Thing, operator: OperatorType): Option<Array<Readonly<FeatureCondition>>> {
        if (thing.species !== Species.CHARACTERS) {
            throw new Error('[MY FAULT] Feature "getFeaturesOfThings" for Text-type things are not implemented yet')
        }

        const name = thing.name as CharacterType
        if (!this._features.has(name)) return none

        const featureList = this._features.get(name)
        if (!featureList) throw new Error(`Thing ${name} in featureList has unexpected undefined value`)

        switch (operator) {
            case OperatorType.IS:
                return some(featureList._is)
            case OperatorType.HAS:
                return some(featureList._has)
            case OperatorType.MAKE:
                return some(featureList._make)
            default:
                throw new Error(`operator ${operator} should be a verb (OperatorType.IS, OperatorType.HAS, OperatorType.MAKE) instead of an adjective`)
        }
    }

    public addFeature(thingType: ThingType, operator: OperatorType, featureCondition: FeatureCondition): void {
        if (!this._features.has(thingType)) {
            const featureList = {_is: [], _has: [], _make: []} as FeatureList
            this._features.set(thingType, featureList)
        }

        switch (operator) {
            case OperatorType.IS:
                this._features.get(thingType)!._is.push(featureCondition)
                break

            case OperatorType.HAS:
                this._features.get(thingType)!._has.push(featureCondition)
                break

            case OperatorType.MAKE:
                this._features.get(thingType)!._make.push(featureCondition)
                break

            default:
                throw new Error(`operator ${operator} should be a verb (OperatorType.IS, OperatorType.HAS, OperatorType.MAKE) instead of an adjective`)
        }
    }

    public removeFeature(thingType: ThingType, operator: OperatorType, featureCondition: FeatureCondition): void {
        if (!this._features.has(thingType)) throw new Error(`thingType ${thingType} not been recorded yet`)
        let removeIndex = -1
        switch (operator) {
            case OperatorType.IS:
                removeIndex = this._features.get(thingType)!._is.indexOf(featureCondition)
                if (removeIndex === -1) throw new Error(`thingType ${thingType} does not contain feature ${featureCondition}`)
                this._features.get(thingType)!._is.splice(removeIndex, 1)
                break

            case OperatorType.HAS:
                removeIndex = this._features.get(thingType)!._has.indexOf(featureCondition)
                if (removeIndex === -1) throw new Error(`thingType ${thingType} does not contain feature ${featureCondition}`)
                this._features.get(thingType)!._has.splice(removeIndex, 1)
                break

            case OperatorType.MAKE:
                removeIndex = this._features.get(thingType)!._make.indexOf(featureCondition)
                if (removeIndex === -1) throw new Error(`thingType ${thingType} does not contain feature ${featureCondition}`)
                this._features.get(thingType)!._make.splice(removeIndex, 1)
                break

            default:
                throw new Error(`operator ${operator} should be a verb (OperatorType.IS, OperatorType.HAS, OperatorType.MAKE) instead of an adjective`)
        }
    }

    public getThingTypesFromProperty(property: PropertyType): Array<ThingType> {
        const result: Array<ThingType> = []

        for (const [thingType] of this._features) {
            if (this.$is(thingType, property)) {
                result.push(thingType)
            }
        }

        return result
    }

    private async _handleCommand(command: Command): Promise<void> {
        // find who can execute this command, You, You2.
        const targets = [
            ...this.getThingTypesFromProperty(PropertyType.YOU),
            ...this.getThingTypesFromProperty(PropertyType.YOU2)
        ]

        // send command-and-targets pack to map service.
        await this.commandTargetChannel.send({
            command,
            targets
        })
    }
}

export const createRuleService = (): RuleService => {
    return new RuleServiceConcrete()
}
