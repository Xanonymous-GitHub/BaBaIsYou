import { Builder } from './'
import { GameStore } from '@/core/store'
import { CreateThingTask, connectThingControllerTask } from '@/core/tasks/sprite'
import { isNone } from 'fp-ts/es6/Option'
import { ThingSetup } from '@/core/types/things'
import { Thing } from '@/core/things'
import { getBlockSize } from '@/core/utils/screen'
import { Species } from '@/core/resource'
import { InstructionDispatchServer } from '@/core/observer'
import { RuleController } from '@/core/observer/rule'
import { MapController } from '@/core/observer/map'

export class SpriteBuilderConcrete extends Builder {
  constructor(store: GameStore) {
    super(store)
  }

  public async getThings(thingSetupsMap: Map<{ species: Species, name: string }, Array<ThingSetup>>): Promise<Array<Thing>> {
    const wrappedThings: Array<Thing> = []
    for (const [{ species, name }, thingSetups] of thingSetupsMap) {
      // check we surely need some Things.
      const thingAmountWeNeed = thingSetups.length
      if (!thingAmountWeNeed) break

      // get existing Things from store. Because we specified the name, the sprite here must be a Thing.
      const thingAmountInStore = this._store.getSpriteAmountByName(name)
      const thingsOption = this._store.getSpritesByName(name, Math.min(thingAmountInStore, thingAmountWeNeed))
      let things: Array<Thing> = []
      if (!isNone(thingsOption)) things = thingsOption.value as Array<Thing>

      // setup existing Things for new environment.
      let currentSetupIndex = 0
      for (const thing of things) {
        thing.setup({ ...thingSetups[currentSetupIndex++] })
      }

      // make up for the missing Things, and setup.
      if (thingAmountInStore < thingAmountWeNeed) {
        // calculate how many sprites we need to create.
        const spriteAmountToCreate = thingAmountWeNeed - thingAmountInStore

        // load the texture of this Thing
        await this._store.loadResourcesByName(species, [name])
        const textureOption = this._store.getTextureByName(name)
        if (isNone(textureOption)) throw new Error(`texture ${name} not load`)
        const texture = textureOption.value

        // call creation task to create Things and setup.
        const creationTask = new CreateThingTask()
        const blockSize = getBlockSize()
        const { maxX, maxY } = this._store.getAppEdge()
        for (let i = 0; i < spriteAmountToCreate; i++) {
          const options = thingSetups[currentSetupIndex++]
          creationTask.setArgs(
            name,
            species,
            texture,
            options.defaultBlockX,
            options.defaultBlockY,
            blockSize,
            maxX,
            maxY
          )
          things.push(
            await creationTask.execute()
          )
        }
      }

      // add to the map.
      wrappedThings.push(...things)
    }

    return wrappedThings
  }

  public async connectThingsToThingController(dispatchServer: InstructionDispatchServer, ruleController: RuleController, mapController: MapController, things: Array<Thing>): Promise<void> {
    const bindingTask = new connectThingControllerTask()
    for (const thing of things) {
      bindingTask.setArgs(this._store, thing)
      await bindingTask.execute()
    }
  }
}

export const createSpriteBuilder = (store: GameStore) => {
  return new SpriteBuilderConcrete(store)
}

export type SpriteController = ReturnType<typeof createSpriteBuilder>