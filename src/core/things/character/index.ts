import {ThingCreator} from '@/core/things/factory';
import {createBaba} from './baba';
import {createWall} from './wall';
import {createFlag} from './flag';
import {createStar} from './star';
import {createSkull} from './skull';
import {createCrab} from './crab';
import {createRock} from './rock';
import {createJelly} from './jelly';
import {createAlgae} from './algae';
import {createTile} from './tile';
import {createGrass} from './grass';
import {createWater} from './water';


const characters: { [index: string]: ThingCreator } = {
    Baba: createBaba,
    Wall: createWall,
    Flag: createFlag,
    Star: createStar,
    Skull: createSkull,
    Crab: createCrab,
    Rock: createRock,
    Jelly: createJelly,
    Algae: createAlgae,
    Tile: createTile,
    Grass: createGrass,
    Water: createWater
}

export default characters