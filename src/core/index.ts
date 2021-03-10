import {Application, Texture} from 'pixi.js'
import {appOptions} from "./configs";
import {createThing} from "./tasks/sprite";
import {getBlockSize, getMaxHorizontalPoint, getMaxVerticalPoint} from "./utils/screen";

const app = new Application(appOptions)

/* for tmp test. */
const texture = Texture.from('https://i.imgur.com/v9Wz4q3.gif')
Promise.resolve(
    new createThing(
        texture,
        28,
        2,
        getBlockSize(),
        getMaxHorizontalPoint(),
        getMaxVerticalPoint(),
        0
    ).execute()
).then((e) => {
    app.stage.addChild(e)
})

export default app.view
