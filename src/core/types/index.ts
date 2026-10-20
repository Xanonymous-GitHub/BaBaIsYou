import type { ThingSetup } from '@/core/types/things'
import type { Species } from '@/core/resource'
import type { CharacterType } from '@/core/types/characters'
import type { NounType } from '@/core/types/nouns'
import type { PropertyType } from '@/core/types/properties'
import type { OperatorType } from '@/core/types/operators'

export type ThingType = CharacterType | PropertyType | NounType | OperatorType

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
  gameView: HTMLCanvasElement,
  startLevel: (setupFileName: string) => Promise<void>
  pause: () => void
  resume: () => void
  setGameOverOutsideHandler: (handler: (gameResult: GameResult) => Promise<void>) => void
  setYouGoneOutsideHandler: (handler: (existYou: boolean) => Promise<void>) => void
}
