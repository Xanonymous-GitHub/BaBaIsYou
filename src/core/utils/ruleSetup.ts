import {MapController} from '../observer/map'
import {RuleController} from '../observer/rule'
import {SceneSetup} from '../types'
import {Species} from '../resource'
import {Direction} from '../types/things'
import {isNone} from 'fp-ts/es6/Option'

const scanRule = (
    startX: number,
    startY: number,
    maxX: number,
    maxY: number,
    scanDirection: Direction
): void => {
    if (scanDirection === Direction.LEFT || scanDirection === Direction.TOP) {
        throw new Error(`scan direction ${scanDirection} should be Direction.RIGHT or Direction.DOWN`)
    }

    let x = startX
    let y = startY
    while (x < maxX && y < maxY) {
        if (scanDirection === Direction.RIGHT) x++
        if (scanDirection === Direction.RIGHT) y++
    }
}

const getInitialRules = (ruleController: RuleController, mapController: MapController, sceneSetup: SceneSetup): void => {
    const maxX = sceneSetup.sceneWidth
    const maxY = sceneSetup.sceneHeight
    for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
            const thingsOnBlock = mapController.whoAreThere(x, y)
            if (isNone(thingsOnBlock)) continue

            for (const thing of thingsOnBlock.value) {
                const name = thing.name
                if (name === Species.NOUNS) {
                    scanRule(x, y, maxX, maxY, Direction.RIGHT)
                    scanRule(x, y, maxX, maxY, Direction.TOP)
                }
            }
        }
    }
}
