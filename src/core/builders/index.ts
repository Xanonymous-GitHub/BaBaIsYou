import { GameStore } from '@/core/store'

export abstract class Controller {
  protected readonly _store: GameStore

  protected constructor(store: GameStore) {
    this._store = store
  }
}