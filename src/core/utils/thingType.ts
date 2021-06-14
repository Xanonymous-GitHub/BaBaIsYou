import { CharacterType } from '@/core/types/characters'
import { NounType } from '@/core/types/nouns'
import { ThingType } from '@/core/types'

export const convertNounToCharacter = (noun: NounType): CharacterType => {
  return noun.substr(5) as CharacterType
}

export const isCharacter = (thingType: ThingType): boolean => {
  return Object.values(CharacterType).includes(thingType as CharacterType)
}

export const isNoun = (thingType: ThingType): boolean => {
  return Object.values(NounType).includes(thingType as NounType)
}