import { CharacterType } from '@/core/types/characters'
import { NounType } from '@/core/types/nouns'

export const convertNounToCharacter = (noun: NounType): CharacterType => {
  return noun.substr(5) as CharacterType
}