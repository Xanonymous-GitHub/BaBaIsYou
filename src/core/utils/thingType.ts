import { CharacterType } from '@/core/types/characters'
import { NounType } from '@/core/types/nouns'
import { ThingType } from '@/core/types'

export const convertNounToCharacter = (noun: NounType): CharacterType => {
  return noun.substr(5) as CharacterType
}

export const isCharacter = (thingType: ThingType): boolean => {
  for (const name of Object.values(CharacterType)) {
    if (name === thingType) {
      return true
    }
  }
  return false
}

export const isNoun = (thingType: ThingType): boolean => {
  for (const name of Object.values(NounType)) {
    if (name === thingType) {
      return true
    }
  }
  return false
}