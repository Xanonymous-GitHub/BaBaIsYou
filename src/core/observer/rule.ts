import {Command, CommandType} from '../store/services/command';
import {Thing} from '../things';
import {PropertyType} from '../types/property';

export interface Rule {
    name: PropertyType
}

export interface RuleController {
    judgmentCommand: (command: Command, thing: Thing) => boolean
    addProperty: (property: PropertyType, thing: Thing) => void
    removeProperty: (property: PropertyType, thing: Thing) => void
}


class RuleControllerConcrete implements RuleController {

    public judgmentCommand(command: Command, thing: Thing): boolean {
        return false;
    }

    public addProperty(property: PropertyType, thing: Thing): void {
    }

    public removeProperty(property: PropertyType, thing: Thing): void {
    }
}