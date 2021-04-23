import {MapController} from '../observer/map'
import {RuleController} from '../observer/rule'
import {SceneSetup} from '../types'
import {Species} from '../resource'
import {Direction} from '../types/things'
import {NounType} from '../types/nouns'
import {OperatorType} from '../types/operators'
import {PropertyType} from '../types/properties'
import {isNone} from 'fp-ts/es6/Option'

interface RulePattern {
    primaryCharacters: Array<NounType>
    conditionSettings: Map<OperatorType, Array<NounType>>
    effectRules: Map<OperatorType, Array<NounType | PropertyType>>
}

const scanRule = (
    mapController: MapController,
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
    let expectAnd = false

    // 1. scan primary characters
    while (true) {
        if (x < maxX && y < maxY) return
        const thingsOnBlock = mapController.whoAreThere(x, y)
        if (isNone(thingsOnBlock)) return

        if (expectAnd) {
            // check if current block has AND
        } else {
            // check if current block has a NOUN
        }

        if (scanDirection === Direction.RIGHT) x++
        if (scanDirection === Direction.DOWN) y++
        expectAnd = !expectAnd
    }

    // 2. scan condition settings

    // 3. scan effect rules
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
                    scanRule(mapController, x, y, maxX, maxY, Direction.RIGHT)
                    scanRule(mapController, x, y, maxX, maxY, Direction.TOP)
                }
            }
        }
    }
}
