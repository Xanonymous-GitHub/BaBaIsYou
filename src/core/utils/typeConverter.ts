import {CharacterType} from '../types/characters'
import {NounType} from '../types/nouns'

export const convertNounToCharacter = (noun: NounType): CharacterType => {
    return noun.substr(5) as CharacterType
}