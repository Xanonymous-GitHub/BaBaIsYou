function convertSceneJson(json) {
    console.log(json['id'])
    console.log(json['name'])
    console.log(json['thingsMap'])

    let thingsMap = new Map();
    for (let thing of json['thingsMap']) {
        let key = {
            species: thing['species'],
            name: thing['name']
        }
        thingsMap.set(key, thing['thingSetup'])
    }
    console.log(thingsMap)

    let sceneSetup = {
        id: json['id'],
        name: json['name'],
        thingsMap: thingsMap
    }

    console.log(sceneSetup)
    return sceneSetup
}

function sceneSetup() {
    let path = './sceneSetups/test.json'
    let promise = new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest()
        xhr.onload = function() {
            // console.log('success: ')
            // console.log(xhr.responseText)
            if (xhr.status === 200) {
                resolve(xhr.responseText)
            } else {
                reject("Error")
            }
        }
        xhr.open("GET", path, true)
        xhr.send()
    })
    promise.then(
        function(result) {
            console.log('resolved')
            let data = JSON.parse(result)
            console.log(data)
            convertSceneJson(data)
        },
        function(error) {
            console.log('rejected')
            console.log(error)
        }
    )
}

sceneSetup()