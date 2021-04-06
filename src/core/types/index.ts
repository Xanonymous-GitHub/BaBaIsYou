import {ThingSetup} from './things';
import {Species} from '../resource';
import {CharacterType} from './characters';
import {NounType} from './nouns';
import {PropertyType} from './properties';
import {OperatorType} from './operators';

export type ThingType = CharacterType | PropertyType | NounType | OperatorType

export type Factor<T> = new(...args: Array<any>) => T;


export interface SceneSetup {
    readonly id: string
    readonly name: string
    readonly thingsMap: Map<{ species: Species, name: string }, Array<ThingSetup>>
}