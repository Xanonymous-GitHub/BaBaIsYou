import {MapController} from '../observer/map'
import {RuleController} from '../observer/rule'
import {SceneSetup, ThingType} from '../types'
import {Species} from '../resource'
import {Direction} from '../types/things'
import {NounType} from '../types/nouns'
import {OperatorType} from '../types/operators'
import {PropertyType} from '../types/properties'
import {isNone, none, Option, some} from 'fp-ts/es6/Option'

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

    const verbs = [OperatorType.IS, OperatorType.HAS, OperatorType.MAKE]
    const adjectives = [OperatorType.ON, OperatorType.NEAR, OperatorType.FACING]

    let x = startX
    let y = startY
    let expectAnd = false

    const rulePattern: RulePattern = {
        primaryCharacters: [],
        conditionSettings: new Map(),
        effectRules: new Map()
    }

    // 1. scan primary characters
    while (true) {
        if (x >= maxX && y >= maxY) return
        const thingsOnBlock = mapController.whoAreThere(x, y)
        if (isNone(thingsOnBlock)) return

        if (expectAnd) {
            // check if current block has AND
            let containsAnd = true
            for (const thing of thingsOnBlock.value) {
                const name = thing.name as ThingType
                if (name === OperatorType.AND) {
                    containsAnd = false
                    break
                }
            }

            // skip to step 2 if block is not AND, because there are no more NOUNS in sentence
            if (!containsAnd) break
        } else {
            // check if current block has a NOUN
            let containsNoun = false
            for (const thing of thingsOnBlock.value) {
                const species = thing.species
                if (species === Species.NOUNS) {
                    const name = thing.name as NounType
                    rulePattern.primaryCharacters.push(name)
                    containsNoun = true
                }
            }

            // stop scanning if block is not a NOUN, which makes sentence unable to activate
            if (!containsNoun) return
        }
        expectAnd = !expectAnd

        // iterate to next block
        if (scanDirection === Direction.RIGHT) x++
        if (scanDirection === Direction.DOWN) y++
    }

    // 2. scan condition settings
    expectAnd = false
    let expectNoun = false
    let expectAdj = true
    let currentAdj: Option<OperatorType> = none
    while (true) {
        if (x >= maxX && y >= maxY) return
        const thingsOnBlock = mapController.whoAreThere(x, y)
        if (isNone(thingsOnBlock)) return

        if (expectAdj && expectNoun) {
            let containsNoun = false
            let containsAdj = false
            for (const thing of thingsOnBlock.value) {
                const species = thing.species

                if (species === Species.NOUNS) {
                    if (isNone(currentAdj)) throw new Error(`adjective ${currentAdj} should not be none`)
                    if (!adjectives.includes(currentAdj.value)) throw new Error(`currentAdj ${currentAdj} should be an adjective operator`)

                    const name = thing.name as NounType
                    if (rulePattern.conditionSettings.has(currentAdj.value)) {
                        const condition = rulePattern.conditionSettings.get(currentAdj.value)
                        if (condition) {
                            condition.push(name)
                            rulePattern.conditionSettings.set(currentAdj.value, condition)
                        }
                    } else {
                        rulePattern.conditionSettings.set(currentAdj.value, [name])
                    }

                    containsNoun = true
                    break
                }
                if (species === Species.OPERATORS) {
                    const name = thing.name as OperatorType

                    if (adjectives.includes(name)) {
                        currentAdj = some(name)
                        containsAdj = true
                    } else return
                }
            }

            if (containsNoun) {
                expectNoun = false
                expectAdj = false
                expectAnd = true
            } else if (containsAdj) {
                expectNoun = true
                expectAdj = false
                expectAnd = false
            }
        } else if (expectAdj) {
            let containsVerb = false
            for (const thing of thingsOnBlock.value) {
                const species = thing.species

                if (species === Species.OPERATORS) {
                    const name = thing.name as OperatorType

                    if (adjectives.includes(name)) {
                        currentAdj = some(name)
                    } else if (verbs.includes(name)) {
                        containsVerb = true
                        break
                    } else if (name === OperatorType.AND) {
                        return
                    }
                } else return // NOUNS PROPS are not valid
            }

            if (containsVerb) break
            expectAdj = false
            expectNoun = true
        } else if (expectNoun) {
            for (const thing of thingsOnBlock.value) {
                const species = thing.species

                if (species === Species.NOUNS) {
                    if (isNone(currentAdj)) throw new Error(`adjective ${currentAdj} should not be none`)
                    if (!adjectives.includes(currentAdj.value)) throw new Error(`currentAdj ${currentAdj} should be an adjective operator`)

                    const name = thing.name as NounType
                    if (rulePattern.conditionSettings.has(currentAdj.value)) {
                        const condition = rulePattern.conditionSettings.get(currentAdj.value)
                        if (condition) {
                            condition.push(name)
                            rulePattern.conditionSettings.set(currentAdj.value, condition)
                        }
                    } else {
                        rulePattern.conditionSettings.set(currentAdj.value, [name])
                    }
                } else return

                expectAnd = true
                expectNoun = false
            }
        } else if (expectAnd) {
            let containsVerb = false
            for (const thing of thingsOnBlock.value) {
                const species = thing.species

                if (species === Species.OPERATORS) {
                    const name = thing.name as OperatorType

                    if (verbs.includes(name)) {
                        containsVerb = false
                        break
                    } else if (name !== OperatorType.AND) return
                } else return
            }

            if (containsVerb) break
            expectAnd = false
            expectAdj = true
            expectNoun = true
        } else {
            throw new Error('scan condition does not exist, unexpected error occurred')
        }

        // iterate to next block
        if (scanDirection === Direction.RIGHT) x++
        if (scanDirection === Direction.DOWN) y++
    }

    // 3. scan effect rules
    expectAnd = false
    let expectEffect = false
    let expectVerb = true
    let currentVerb: Option<OperatorType> = none
    while (true) {
        if (x >= maxX && y >= maxY) return
        const thingsOnBlock = mapController.whoAreThere(x, y)
        if (isNone(thingsOnBlock)) return

        let endScan = false
        if (expectVerb && expectEffect) {
            for (const thing of thingsOnBlock.value) {
                const species = thing.species
                if (species === Species.OPERATORS) {
                    const name = thing.name as OperatorType
                    if (verbs.includes(name)) {
                        currentVerb = some(name)
                    } else {
                        endScan = true
                        break
                    }
                } else if (species === Species.PROPERTIES) {
                    if (isNone(currentVerb)) throw new Error(`verb ${currentVerb} should not be none`)
                    if (currentVerb.value !== OperatorType.IS) {
                        endScan = true
                        break
                    }

                    const name = thing.name as PropertyType
                    if (rulePattern.effectRules.has(currentVerb.value)) {
                        const effect = rulePattern.effectRules.get(currentVerb.value)
                        if (effect) {
                            effect.push(name)
                            rulePattern.effectRules.set(currentVerb.value, effect)
                        }
                    } else {
                        rulePattern.effectRules.set(currentVerb.value, [name])
                    }
                } else if (species === Species.NOUNS) {
                    if (isNone(currentVerb)) throw new Error(`verb ${currentVerb} should not be none`)

                    const name = thing.name as NounType
                    if (rulePattern.effectRules.has(currentVerb.value)) {
                        const effect = rulePattern.effectRules.get(currentVerb.value)
                        if (effect) {
                            effect.push(name)
                            rulePattern.effectRules.set(currentVerb.value, effect)
                        }
                    } else {
                        rulePattern.effectRules.set(currentVerb.value, [name])
                    }
                } else {
                    endScan = true
                    break
                }
            }
        } else if (expectVerb) {
            for (const thing of thingsOnBlock.value) {
                const species = thing.species
                if (species === Species.OPERATORS) {
                    const name = thing.name as OperatorType
                    if (verbs.includes(name)) {
                        currentVerb = some(name)
                    } else {
                        endScan = true
                        break
                    }
                } else {
                    endScan = true
                    break
                }
            }

            expectEffect = true
            expectVerb = false
        } else if (expectEffect) {
            for (const thing of thingsOnBlock.value) {
                if (isNone(currentVerb)) throw new Error(`verb ${currentVerb} should not be none`)
                if (!verbs.includes(currentVerb.value)) throw new Error(`currentVerb ${currentVerb} should be an adjective operator`)

                const species = thing.species
                if (species === Species.PROPERTIES && currentVerb.value === OperatorType.IS) {
                    const name = thing.name as PropertyType
                    if (rulePattern.effectRules.has(currentVerb.value)) {
                        const effect = rulePattern.effectRules.get(currentVerb.value)
                        if (effect) {
                            effect.push(name)
                            rulePattern.effectRules.set(currentVerb.value, effect)
                        }
                    } else {
                        rulePattern.effectRules.set(currentVerb.value, [name])
                    }
                } else if (species === Species.NOUNS) {
                    const name = thing.name as NounType
                    if (rulePattern.effectRules.has(currentVerb.value)) {
                        const effect = rulePattern.effectRules.get(currentVerb.value)
                        if (effect) {
                            effect.push(name)
                            rulePattern.effectRules.set(currentVerb.value, effect)
                        }
                    } else {
                        rulePattern.effectRules.set(currentVerb.value, [name])
                    }
                } else {
                    endScan = true
                    break
                }

                expectEffect = false
                expectAnd = true
            }
        } else if (expectAnd) {
            for (const thing of thingsOnBlock.value) {
                const species = thing.species
                if (species !== Species.OPERATORS) {
                    endScan = true
                    break
                }
                const name = thing.name as OperatorType
                if (name !== OperatorType.AND) {
                    endScan = true
                    break
                }
            }

            expectAnd = false
            expectVerb = true
            expectEffect = true
        } else return

        if (scanDirection === Direction.RIGHT) x++
        if (scanDirection === Direction.DOWN) y++

        if (endScan) break
    }

    // 4. add feature from rule pattern
}

const getInitialRules = (ruleController: RuleController, mapController: MapController, sceneSetup: SceneSetup): void => {
    const maxX = sceneSetup.sceneWidth
    const maxY = sceneSetup.sceneHeight
    for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
            const thingsOnBlock = mapController.whoAreThere(x, y)
            if (isNone(thingsOnBlock)) continue

            for (const thing of thingsOnBlock.value) {
                // check if thing is noun
                if (thing.species === Species.NOUNS) {
                    scanRule(mapController, x, y, maxX, maxY, Direction.RIGHT)
                    scanRule(mapController, x, y, maxX, maxY, Direction.TOP)
                }
            }
        }
    }
}
