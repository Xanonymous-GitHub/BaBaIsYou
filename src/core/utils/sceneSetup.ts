import {SceneSetup} from '../types';
import {Species} from '../resource';
import {ThingSetup} from '../types/things';

export interface SceneSetupImport {
    readonly id: string
    readonly name: string
    readonly thingsMap: Array<ThingsMapImport>
}

export interface ThingsMapImport {
    readonly species: Species
    readonly name: string
    readonly thingsSetup: Array<ThingSetup>
}

const convertSceneToObject = (sceneSetupImport: SceneSetupImport): SceneSetup => {
    const thingsMap = new Map<{ species: Species, name: string }, Array<ThingSetup>>()
    for (const thing of sceneSetupImport.thingsMap) {
        const key = {species: thing.species, name: thing.name}
        thingsMap.set(key, thing.thingsSetup)
    }

    return {
        id: sceneSetupImport.id,
        name: sceneSetupImport.name,
        thingsMap
    }
}

const loadSceneSetupImport = async (filePath: string): Promise<SceneSetupImport> => {
    return await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText))
            } else {
                reject('Error occurred while loading JSON from local')
            }
        }
        xhr.open('GET', filePath, true)
        xhr.send()
    })
}

export const getSceneSetup = async (filePath: string): Promise<SceneSetup> => {
    const sceneSetupImport = await loadSceneSetupImport(filePath)
    return convertSceneToObject(sceneSetupImport)
}