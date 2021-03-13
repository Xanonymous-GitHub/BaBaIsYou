import {Controller} from './';
import {GameStore} from '../store';
import {createThingTask} from '../tasks/sprite';
import {isNone} from 'fp-ts/es6/Option';
import {ThingSetup} from '../types/things';
import {Thing} from '../things';
import {getBlockSize} from '../utils/screen';
import {Species} from '../resource';

class SpriteControllerConcrete extends Controller {
    constructor(store: GameStore) {
        super(store)
    }

    public async getThings(thingSetupsMap: Map<{ species: Species, name: string }, Array<ThingSetup>>): Promise<Array<Readonly<Thing>>> {
        const wrappedThings: Array<Readonly<Thing>> = []
        for (const [{species, name}, thingSetups] of thingSetupsMap) {
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
                thing.setup({...thingSetups[currentSetupIndex]})
                currentSetupIndex++
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
                const creationTask = new createThingTask()
                for (let i = 0; i < spriteAmountToCreate; i++) {
                    const options = thingSetups[currentSetupIndex++]
                    creationTask.setArgs(
                        texture,
                        options.defaultBlockX,
                        options.defaultBlockY,
                        getBlockSize(),
                        options.maxBlockX,
                        options.maxBlockY
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
}

export const createSpriteController = (store: GameStore) => {
    return new SpriteControllerConcrete(store)
}

export type SpriteController = ReturnType<typeof createSpriteController>