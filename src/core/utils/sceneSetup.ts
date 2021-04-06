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
    readonly thingsMap: Array<ThingsMapJson>
}

axios.defaults.baseURL = '/sceneSetups/'

const convertToSceneSetup = (sceneSetupJson: SceneSetupJson): SceneSetup => {
    const thingsMap = new Map<{ species: Species, name: string }, Array<ThingSetup>>()
    for (const thing of sceneSetupJson.thingsMap) {
        const key = {species: thing.species, name: thing.name}

        console.log(thing)
        // console.log(key)
        console.log(thing.thingSetup)

        thingsMap.set(key, thing.thingSetup)
    }

    return {
        id: sceneSetupJson.id,
        name: sceneSetupJson.name,
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
    const sceneSetupJson = await loadSceneSetupJson(filePath)
    const sceneSetup = convertToSceneSetup(sceneSetupJson)
    return sceneSetup
}