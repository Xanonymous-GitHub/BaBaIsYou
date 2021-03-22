import {SceneSetup} from '../types';
import {Species} from '../resource';
import {ThingSetup} from '../types/things';


const convertSceneToObject = (json): SceneSetup => {
    const thingsMap = new Map<{ species: Species, name: string }, Array<ThingSetup>>()
    for (const thing of json['thingsMap']) {
        const key = {species: thing['species'], name: thing['name']}
        thingsMap.set(key, thing['thingSetup'])
    }

    return {
        id: json['id'],
        name: json['name'],
        thingsMap
    }
}

const getSceneJsonFromLocal = async (path: string) => {
    return await new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText))
            } else {
                reject('Error occurred while loading JSON from local')
            }
        }
        xhr.open('GET', path, true)
        xhr.send()
    })
}

export const getSceneSetup = async (path: string): Promise<SceneSetup> => {
    const result = await getSceneJsonFromLocal(path)
    return convertSceneToObject(result)
}