import {ThingCreator} from '../factory';
import {createBaba} from './baba';
import {createWall} from './wall';

const characters: { [index: string]: ThingCreator } = {
    Baba: createBaba,
    Wall: createWall
}

export default characters