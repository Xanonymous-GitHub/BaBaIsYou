import { CreateThingTask, connectThingControllerTask } from '@/core/builders/tasks/sprite'
import { isNone } from 'fp-ts/es6/Option'
import type { Thing } from '@/core/things'
import { getBlockSize } from '@/core/app/screen'
import { store } from '@/core'
import type { ThingSetupMap } from '@/core/types'

export class SpriteBuilderConcrete {
  public async getThings(thingSetupsMap: ThingSetupMap): Promise<Array<Thing>> {
    const wrappedThings: Array<Thing> = []
    for (const [{ species, name }, thingSetups] of thingSetupsMap) {
      // check we surely need some Things.
      const thingAmountWeNeed = thingSetups.length
      if (!thingAmountWeNeed) break

      // get existing Things from store. Because we specified the name, the sprite here must be a Thing.
      const thingAmountInStore = store.getSpriteAmountByName(name)
      const thingsOption = store.getSpritesByName(name, Math.min(thingAmountInStore, thingAmountWeNeed))
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
        const textures = store.getAnimationTextures(species, name)

        // call a creation task to create Things and setup.
        const creationTask = new CreateThingTask()
        const blockSize = getBlockSize()
        const { maxX, maxY } = store.getAppEdge()
        for (let i = 0; i < spriteAmountToCreate; i++) {
          const options = thingSetups[currentSetupIndex++]
          creationTask.setArgs(
            name,
            species,
            textures,
            options.defaultBlockX,
            options.defaultBlockY,
            blockSize,
            maxX,
            maxY,
            options.defaultTowards
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

  public async connectThingsToThingController(things: Array<Thing>): Promise<void> {
    const bindingTask = new connectThingControllerTask()
    for (const thing of things) {
      bindingTask.setArgs(thing)
      await bindingTask.execute()
    }
  }
}

export const createSpriteBuilder = () => {
  return new SpriteBuilderConcrete()
}

export type SpriteController = ReturnType<typeof createSpriteBuilder>