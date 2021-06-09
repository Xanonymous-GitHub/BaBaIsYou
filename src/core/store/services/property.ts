import {Service} from './';
import {Thing} from '@/core/things';
import {PropertyType} from '@/core/types/properties';
import {Direction} from '@/core/types/things';

export interface PropertyService extends Service {
    activateProperties: (properties: Array<PropertyType>) => void
    handleEncounter: (subject: Thing, visitor: Thing, visitorFrom: Direction, property: PropertyType) => Promise<boolean>
    handleLeave: (subject: Thing, visitor: Thing, visitorLeavesFrom: Direction, property: PropertyType) => Promise<void>
    handleBeside: (subject: Thing, visitor: Thing, visitorBeside: Direction, property: PropertyType) => Promise<void>
}