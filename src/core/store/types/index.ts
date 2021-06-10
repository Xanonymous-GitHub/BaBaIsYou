import {NounType} from '@/core/types/nouns';
import {PropertyType} from '@/core/types/properties';
import {ThingType} from '@/core/types';
import {Option} from 'fp-ts/es6/Option';
import {Thing} from '@/core/things';

export enum CommandType {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
    ESC = 'esc',
}

export interface Command {
    readonly value: CommandType
}

export interface CommandPackage {
    priority: number,
    command: Command
}

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

export interface ExecutorTypes {
    command: Command
    targets: Set<ThingType>
}

export interface Neighbor {
    up: Option<Array<Readonly<Thing>>>
    down: Option<Array<Readonly<Thing>>>
    left: Option<Array<Readonly<Thing>>>
    right: Option<Array<Readonly<Thing>>>
}

export enum MapUpdateSituation {
    UP = 'up',
    DOWN = 'down',
    RIGHT = 'right',
    LEFT = 'left',
    APPEAR = 'appear',
    DISAPPEAR = 'disappear'
}