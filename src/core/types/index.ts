import {ThingSetup} from './things';
import {Species} from '../resource';
import {CharacterType} from './character';
import {NounType} from './nouns';
import {PropertyType} from './property';
import {OperatorType} from './operator';

export type ThingType = CharacterType | PropertyType | NounType | OperatorType

export type Factor<T> = new(...args: Array<any>) => T;


export interface SceneSetup {
    readonly id: string
    readonly name: string
    readonly thingsMap: Map<{ species: Species, name: string }, Array<ThingSetup>>
}