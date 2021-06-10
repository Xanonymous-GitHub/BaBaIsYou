import { Thing } from '@/core/things'
import { Direction } from '@/core/types/things'
import { Species } from '@/core/resource'
import { Texture } from 'pixi.js'
import { generalHandleEncounterMixin } from '@/core/things/_mixins/handleEncounter'

class Wall extends Thing {
  public async handleBeside(visitor: Thing, visitorBeside: Direction): Promise<void> {

  }

  public async handleEncounter(visitor: Thing, visitorFrom: Direction): Promise<boolean> {
    return await generalHandleEncounterMixin(this, visitor, visitorFrom, this._ruleController, this._mapController, this._thingController)
  }

  public async handleLeave(visitor: Thing, visitorLeavesFrom: Direction): Promise<void> {

  }
}

export const createWall = (
  name: string,
  species: Species,
  texture: Texture,
  defaultBlockX: number,
  defaultBlockY: number,
  blockSize: number,
  maxBlockX: number,
  maxBlockY: number,
  defaultTowards?: Direction
) => new Wall(name, species, texture, defaultBlockX, defaultBlockY, blockSize, maxBlockX, maxBlockY, defaultTowards)