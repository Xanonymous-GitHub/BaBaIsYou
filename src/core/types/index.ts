import {ThingSetup} from './things';
import {Species} from '../resource';

export type Factor<T> = new(...args: Array<any>) => T;

export interface SceneSetup {
    readonly id: string
    readonly name: string
    readonly thingsMap: Map<{ species: Species, name: string }, Array<ThingSetup>>
}