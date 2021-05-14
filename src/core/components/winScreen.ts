import {Graphics, Container} from 'pixi.js'
import {Edge} from '../store/services/screen';
import {getBlockSize} from '../utils/screen';

export const createWinScreen = (edge: Edge): Container => {
    const blockSize = getBlockSize()
    const width = (edge.maxX + 1) * blockSize
    const height = (edge.maxY + 1) * blockSize

    const graphics = new Graphics()
    graphics.beginFill(0xFFFFFF, 0.5)
    graphics.drawRect(0, 0, width, height)
    graphics.endFill()

    const screen = new Container()
    screen.addChildAt(graphics, 0)

    return screen
}
