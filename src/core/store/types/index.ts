import {NounType} from '@/core/types/nouns';
import {PropertyType} from '@/core/types/properties';
import {ThingType} from '@/core/types';

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

export interface CommandTargets {
    command: Command
    targets: Array<ThingType>
}
