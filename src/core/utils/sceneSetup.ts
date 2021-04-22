import axios from 'axios';
import {SceneSetup} from '../types';
import {Species} from '../resource';
import {ThingSetup} from '../types/things';

export interface ThingsMapJson {
    readonly species: Species
    readonly name: string
    readonly thingSetup: Array<ThingSetup>
}

export interface SceneSetupJson {
    readonly id: string
    readonly name: string
    readonly sceneWidth: number
    readonly sceneHeight: number
    readonly thingsMap: Array<ThingsMapJson>
}

axios.defaults.baseURL = '/sceneSetups/'

const convertToSceneSetup = (sceneSetupJson: SceneSetupJson): SceneSetup => {
    const sceneWidth = sceneSetupJson.sceneWidth
    const sceneHeight = sceneSetupJson.sceneHeight
    const thingsMap = new Map<{ species: Species, name: string }, Array<ThingSetup>>()

    for (const thing of sceneSetupJson.thingsMap) {
        const key = {species: thing.species, name: thing.name}
        const thingSetup = new Array<ThingSetup>()

        for (const it of thing.thingSetup) {
            const setup: ThingSetup = {
                defaultBlockX: it.defaultBlockX,
                defaultBlockY: it.defaultBlockY,
                textureName: it.textureName,
                defaultTowards: it.defaultTowards
            }
            thingSetup.push(setup)
        }

        thingsMap.set(key, thingSetup)
    }

    return {
        id: sceneSetupJson.id,
        name: sceneSetupJson.name,
        sceneWidth,
        sceneHeight,
        thingsMap
    }
}

const loadSceneSetupJson = async (filePath: string): Promise<SceneSetupJson> => {
    try {
        const {data} = await axios.get(filePath)
        return data
    } catch (e) {
        throw new Error('Error occurred while loading JSON from local' + e)
    }
}

export const getSceneSetup = async (filePath: string): Promise<SceneSetup> => {
    return convertToSceneSetup(await loadSceneSetupJson(filePath))
}