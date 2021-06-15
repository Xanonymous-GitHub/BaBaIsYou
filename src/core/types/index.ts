import { ThingSetup } from '@/core/types/things'
import { Species } from '@/core/resource'
import { CharacterType } from '@/core/types/characters'
import { NounType } from '@/core/types/nouns'
import { PropertyType } from '@/core/types/properties'
import { OperatorType } from '@/core/types/operators'

export type ThingType = CharacterType | PropertyType | NounType | OperatorType

export type Factor<T> = new(...args: Array<any>) => T;

export type ThingSetupMap = Map<{ species: Species, name: string }, Array<ThingSetup>>


export interface SceneSetup {
  readonly id: string
  readonly name: string
  readonly sceneWidth: number
  readonly sceneHeight: number
  readonly thingsMap: ThingSetupMap
}

export enum GameResult {
  WIN = 'WIN',
  LEAVE = 'LEAVE',
  RESTART = 'RESTART'
}

export interface GameCore {
  gameView: HTMLCanvasElement
  startLevel: (setupFileName: string) => Promise<void>
  setGameOverOutsideHandler: (handler: (gameResult: GameResult) => Promise<void>) => void
}