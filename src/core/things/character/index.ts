import {ThingCreator} from '../factory';
import {createBaba} from './baba';
import {createWall} from './wall';
import {createFlag} from './flag';

const characters: { [index: string]: ThingCreator } = {
    Baba: createBaba,
    Wall: createWall,
    Flag: createFlag
}

export default characters