import {ThingSetup} from '@/core/types/things';
import {Species} from '@/core/resource';
import {CharacterType} from '@/core/types/characters';
import {NounType} from '@/core/types/nouns';
import {PropertyType} from '@/core/types/properties';
import {OperatorType} from '@/core/types/operators';

export type ThingType = CharacterType | PropertyType | NounType | OperatorType

export type Factor<T> = new(...args: Array<any>) => T;


export interface SceneSetup {
    readonly id: string
    readonly name: string
    readonly sceneWidth: number
    readonly sceneHeight: number
    readonly thingsMap: Map<{ species: Species, name: string }, Array<ThingSetup>>
}