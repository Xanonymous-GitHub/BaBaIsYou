import {Thing} from '../things';
import {PropertyType} from '../types/properties';
import {NounType} from '../types/nouns';
import {OperatorType} from '../types/operators';
import {ThingType} from '../types';
import {MapController} from '../observer/map';
import {RulePattern} from '../utils/ruleScanner';
import {CharacterType} from '@/core/types/characters';

export interface FeatureCondition {
    feature: NounType | PropertyType
    on: Array<NounType>
    near: Array<NounType>
    facing: Array<NounType>
}

export interface FeatureList {
    _is: Array<FeatureCondition>
    _has: Array<FeatureCondition>
    _make: Array<FeatureCondition>
}

export interface RuleController {
    $is: (requester: Thing, requestedFeature: PropertyType) => boolean
    $has: (requester: Thing, requestedFeature: NounType) => boolean
    $make: (requester: Thing, requestedFeature: NounType) => boolean
    addFeature: (thingType: ThingType, operator: OperatorType, featureCondition: FeatureCondition) => void
    removeFeature: (thingType: ThingType, operator: OperatorType, featureCondition: FeatureCondition) => void
    refreshAll: () => void
}

class RuleControllerConcrete implements RuleController {
    private readonly _features: Map<ThingType, FeatureList>
    private readonly _patterns: Map<string, RulePattern>
    private readonly _mapController: MapController

    constructor(mapController: MapController) {
        this._features = new Map();
        this._patterns = new Map();
        this._mapController = mapController;
        this._giveDefaultRules()
    }

    public refreshAll() {
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

    public $is(requester: Thing, requestedFeature: PropertyType | NounType): boolean {
        const requesterName = requester.name as CharacterType
        const featureConditions = this._features.get(requesterName)
        if (!featureConditions) return false
        const containsProperty = Boolean(featureConditions._is.find(featureCondition => featureCondition.feature === requestedFeature))
        return Boolean(featureConditions && containsProperty)
    }

    public $has(requester: Thing, requestedFeature: NounType): boolean {
        const requesterName = requester.name as CharacterType
        const featureConditions = this._features.get(requesterName)
        if (!featureConditions) return false
        const containsProperty = Boolean(featureConditions._has.find(featureCondition => featureCondition.feature === requestedFeature))
        return Boolean(featureConditions && containsProperty)
    }

    public $make(requester: Thing, requestedFeature: NounType): boolean {
        const requesterName = requester.name as CharacterType
        const featureConditions = this._features.get(requesterName)
        if (!featureConditions) return falsef
        const containsProperty = Boolean(featureConditions._make.find(featureCondition => featureCondition.feature === requestedFeature))
        return Boolean(featureConditions && containsProperty)
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
}

export const createRuleController = (mapController: MapController): RuleController => {
    return new RuleControllerConcrete(mapController)
}
