import { CharacterType } from '@/core/types/characters'
import { Species } from '@/core/resource'
import { NounType } from '@/core/types/nouns'
import { ThingType } from '@/core/types'
import { OperatorType } from '@/core/types/operators'
import { PropertyType } from '@/core/types/properties'

export const convertNounToCharacter = (noun: NounType): CharacterType => {
  return noun.substr(5) as CharacterType
}

export const isCharacter = (thingType: ThingType): boolean => {
  return Object.values(CharacterType).includes(thingType as CharacterType)
}

export const isNoun = (thingType: ThingType): boolean => {
  return Object.values(NounType).includes(thingType as NounType)
}

export const isOperator = (thingType: ThingType): boolean => {
  return Object.values(OperatorType).includes(thingType as OperatorType)
}

export const isProperty = (thingType: ThingType): boolean => {
  return Object.values(PropertyType).includes(thingType as PropertyType)
}

export const getSpeciesByThingType = (thingType: ThingType): Species => {
  if (isCharacter(thingType)) return Species.CHARACTERS
  if (isNoun(thingType)) return Species.NOUNS
  if (isOperator(thingType)) return Species.OPERATORS
  if (isProperty(thingType)) return Species.PROPERTIES
  throw new Error(`ThingType ${thingType} does not exist in all Species`)
}