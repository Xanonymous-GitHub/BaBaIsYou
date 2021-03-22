const convertSceneToObject = (json) => {
    let thingsMap = new Map()
    for (let thing of json["thingsMap"]) {
        let key = {species: thing["species"], name: thing["name"]}
        thingsMap.set(key, thing["thingSetup"])
    }

    return {
        id: json["id"],
        name: json["name"],
        thingsMap: thingsMap
    }
}

const getSceneJsonFromLocal = async (path) => {
    let promise = new Promise(function(resolve, reject)  {
        const xhr = new XMLHttpRequest()
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText))
            } else {
                reject("Error occurred while loading JSON from local")
            }
        }
        xhr.open("GET", path, true)
        xhr.send()
    })
    return await promise
}

const getSceneSetup = async (path) => {
    let result = await getSceneJsonFromLocal(path)
    let setup = convertSceneToObject(result)
    console.log(setup)
}

getSceneSetup("./sceneSetups/test.json")