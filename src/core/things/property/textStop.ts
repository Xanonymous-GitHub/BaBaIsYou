import { Thing } from '@/core/things'
import { Direction } from '@/core/types/things'
import { Species } from '@/core/resource'
import { Texture } from 'pixi.js'
import { generalHandleEncounterMixin } from '@/core/things/_mixins/handleEncounter'

class TextStop extends Thing {
  public handleBeside(visitor: Thing, visitorBeside: Direction): Promise<void> {
    return Promise.resolve(undefined)
  }

  public async handleEncounter(visitor: Thing, visitorFrom: Direction): Promise<boolean> {
    return await generalHandleEncounterMixin(this, visitor, visitorFrom, this._thingController)
  }

  public handleLeave(visitor: Thing, visitorLeavesFrom: Direction): Promise<void> {
    return Promise.resolve(undefined)
  }
}

export const createTextStop = (
  name: string,
  species: Species,
  texture: Texture,
  defaultBlockX: number,
  defaultBlockY: number,
  blockSize: number,
  maxBlockX: number,
  maxBlockY: number,
  defaultTowards?: Direction
) => new TextStop(name, species, texture, defaultBlockX, defaultBlockY, blockSize, maxBlockX, maxBlockY, defaultTowards)