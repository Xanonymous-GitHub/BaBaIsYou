import { GameStore } from '@/core/store'

export abstract class Builder {
  protected readonly _store: GameStore

  protected constructor(store: GameStore) {
    this._store = store
  }
}