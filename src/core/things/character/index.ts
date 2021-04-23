import {Baba} from './baba';
import {Wall} from './wall';

import {Thing} from '../';
import {Factor} from '../../types';

const characters: { [index: string]: Factor<Thing> } = {
    Baba,
    Wall
}

export default characters