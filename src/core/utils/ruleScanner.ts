import {MapController} from '../observer/map'
import {FeatureCondition, RuleController} from '../observer/rule'
import {SceneSetup, ThingType} from '../types'
import {Species} from '../resource'
import {Direction} from '../types/things'
import {NounType} from '../types/nouns'
import {OperatorType} from '../types/operators'
import {PropertyType} from '../types/properties'
import {isNone, isSome, none, Option, some} from 'fp-ts/es6/Option'
import {convertNounToCharacter} from '../utils/typeConverter';

export interface RulePattern {
    primaryCharacters: Option<Array<NounType>>
    conditionSettings: Option<Map<OperatorType, Array<NounType>>>
    effectRules: Option<Map<OperatorType, Array<NounType | PropertyType>>>
}

export interface RuleScanner {
    scanRule: (startX: number, startY: number, maxX: number, maxY: number, scanDirection: Direction) => Option<RulePattern>
    addRulesFromRulePattern: (rulePattern: RulePattern) => void
    findRulesFromMap: (sceneSetup: SceneSetup) => void
}

class RuleScannerConcrete implements RuleScanner {
    private readonly _ruleController: RuleController
    private readonly _mapController: MapController

    constructor(ruleController: RuleController, mapController: MapController) {
        this._ruleController = ruleController
        this._mapController = mapController
    }

    public scanRule(
        startX: number,
        startY: number,
        maxX: number,
        maxY: number,
        scanDirection: Direction
    ): Option<RulePattern> {
        if (scanDirection === Direction.LEFT || scanDirection === Direction.TOP) {
            throw new Error(`scan direction ${scanDirection} should be Direction.RIGHT or Direction.DOWN`)
        }

        const verbs = [OperatorType.IS, OperatorType.HAS, OperatorType.MAKE]
        const adjectives = [OperatorType.ON, OperatorType.NEAR, OperatorType.FACING]

        let x = startX
        let y = startY
        let expectAnd = false

        const rulePattern: RulePattern = {
            primaryCharacters: none,
            conditionSettings: none,
            effectRules: none
        }

        // 1. scan primary characters
        while (true) {
            if (x >= maxX && y >= maxY) return none
            const thingsOnBlock = this._mapController.whoAreThere(x, y)
            if (isNone(thingsOnBlock)) return none

            // console.log(`scanning primary characters in location (${x}, ${y}) `)

            if (expectAnd) {
                // check if current block has AND
                let containsAnd = true
                for (const thing of thingsOnBlock.value) {
                    const name = thing.name as ThingType
                    if (name !== OperatorType.AND) {
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
                        if (isNone(rulePattern.primaryCharacters)) rulePattern.primaryCharacters = some([])
                        if (isSome(rulePattern.primaryCharacters)) {
                            const name = thing.name as NounType
                            rulePattern.primaryCharacters.value.push(name)
                            containsNoun = true
                        } else {
                            throw new Error('unexpected error cause by rulePattern.primaryCharacters is not a some value')
                        }
                    }
                }

                // stop scanning if block is not a NOUN, which makes sentence unable to activate
                if (!containsNoun) return none
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
            if (x >= maxX && y >= maxY) return none
            const thingsOnBlock = this._mapController.whoAreThere(x, y)
            if (isNone(thingsOnBlock)) return none

            // console.log(`scanning condition settings in location (${x}, ${y}) `)

            if (expectAdj && expectNoun) {
                let containsNoun = false
                let containsAdj = false
                for (const thing of thingsOnBlock.value) {
                    const species = thing.species

                    if (species === Species.NOUNS) {
                        if (isNone(currentAdj)) throw new Error(`adjective ${currentAdj} should not be none`)
                        if (!adjectives.includes(currentAdj.value)) throw new Error(`currentAdj ${currentAdj} should be an adjective operator`)

                        const name = thing.name as NounType
                        if (isNone(rulePattern.conditionSettings)) rulePattern.conditionSettings = some(new Map())
                        if (isSome(rulePattern.conditionSettings)) {
                            if (rulePattern.conditionSettings.value.has(currentAdj.value)) {
                                const condition = rulePattern.conditionSettings.value.get(currentAdj.value)
                                if (condition) {
                                    condition.push(name)
                                    rulePattern.conditionSettings.value.set(currentAdj.value, condition)
                                }
                            } else {
                                rulePattern.conditionSettings.value.set(currentAdj.value, [name])
                            }
                        } else {
                            throw new Error('unexpected error cause by rulePattern.conditionSettings is not a some value')
                        }

                        containsNoun = true
                        break
                    }
                    if (species === Species.OPERATORS) {
                        const name = thing.name as OperatorType

                        if (adjectives.includes(name)) {
                            currentAdj = some(name)
                            containsAdj = true
                        } else {
                            return none
                        }
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
                            return none
                        }
                    } else {
                        return none // NOUNS and PROPS are not valid
                    }
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
                        if (isNone(rulePattern.conditionSettings)) rulePattern.conditionSettings = some(new Map())
                        if (isSome(rulePattern.conditionSettings)) {
                            if (rulePattern.conditionSettings.value.has(currentAdj.value)) {
                                const condition = rulePattern.conditionSettings.value.get(currentAdj.value)
                                if (condition) {
                                    condition.push(name)
                                    rulePattern.conditionSettings.value.set(currentAdj.value, condition)
                                }
                            } else {
                                rulePattern.conditionSettings.value.set(currentAdj.value, [name])
                            }
                        } else {
                            throw new Error('unexpected error cause by rulePattern.conditionSettings is not a some value')
                        }

                    } else {
                        return none
                    }

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
                        } else if (name !== OperatorType.AND) {
                            return none
                        }
                    } else {
                        return none
                    }
                }

                if (containsVerb) break
                expectAnd = false
                expectAdj = true
                expectNoun = true
            } else {
                throw new Error('unexpected error occurred caused by unexisting scan condition')
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
            if (x >= maxX && y >= maxY) break
            const thingsOnBlock = this._mapController.whoAreThere(x, y)
            if (isNone(thingsOnBlock)) break

            // console.log(`scanning effect rules in location (${x}, ${y}) `)

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
                        if (isNone(rulePattern.effectRules)) rulePattern.effectRules = some(new Map())
                        if (isSome(rulePattern.effectRules)) {
                            if (rulePattern.effectRules.value.has(currentVerb.value)) {
                                const effect = rulePattern.effectRules.value.get(currentVerb.value)
                                if (effect) {
                                    effect.push(name)
                                    rulePattern.effectRules.value.set(currentVerb.value, effect)
                                }
                            } else {
                                rulePattern.effectRules.value.set(currentVerb.value, [name])
                            }
                        } else {
                            throw new Error('unexpected error cause by rulePattern.effectRules is not a some value')
                        }
                    } else if (species === Species.NOUNS) {
                        if (isNone(currentVerb)) throw new Error(`verb ${currentVerb} should not be none`)
                        if (!verbs.includes(currentVerb.value)) throw new Error(`currentVerb ${currentVerb} should be a verb operator`)

                        const name = thing.name as NounType
                        if (isNone(rulePattern.effectRules)) rulePattern.effectRules = some(new Map())
                        if (isSome(rulePattern.effectRules)) {
                            if (rulePattern.effectRules.value.has(currentVerb.value)) {
                                const effect = rulePattern.effectRules.value.get(currentVerb.value)
                                if (effect) {
                                    effect.push(name)
                                    rulePattern.effectRules.value.set(currentVerb.value, effect)
                                }
                            } else {
                                rulePattern.effectRules.value.set(currentVerb.value, [name])
                            }
                        } else {
                            throw new Error('unexpected error cause by rulePattern.effectRules is not a some value')
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
                    if (!verbs.includes(currentVerb.value)) throw new Error(`currentVerb ${currentVerb} should be a verb operator`)

                    const species = thing.species
                    if (species === Species.PROPERTIES && currentVerb.value === OperatorType.IS) {
                        const name = thing.name as PropertyType
                        if (isNone(rulePattern.effectRules)) rulePattern.effectRules = some(new Map())
                        if (isSome(rulePattern.effectRules)) {
                            if (rulePattern.effectRules.value.has(currentVerb.value)) {
                                const effect = rulePattern.effectRules.value.get(currentVerb.value)
                                if (effect) {
                                    effect.push(name)
                                    rulePattern.effectRules.value.set(currentVerb.value, effect)
                                }
                            } else {
                                rulePattern.effectRules.value.set(currentVerb.value, [name])
                            }
                        } else {
                            throw new Error('unexpected error cause by rulePattern.effectRules is not a some value')
                        }

                    } else if (species === Species.NOUNS) {
                        const name = thing.name as NounType
                        if (isNone(rulePattern.effectRules)) rulePattern.effectRules = some(new Map())
                        if (isSome(rulePattern.effectRules)) {
                            if (rulePattern.effectRules.value.has(currentVerb.value)) {
                                const effect = rulePattern.effectRules.value.get(currentVerb.value)
                                if (effect) {
                                    effect.push(name)
                                    rulePattern.effectRules.value.set(currentVerb.value, effect)
                                }
                            } else {
                                rulePattern.effectRules.value.set(currentVerb.value, [name])
                            }
                        } else {
                            throw new Error('unexpected error cause by rulePattern.effectRules is not a some value')
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
            } else {
                return none
            }

            if (scanDirection === Direction.RIGHT) x++
            if (scanDirection === Direction.DOWN) y++

            if (endScan) break
        }

        return some(rulePattern)
    }

    public addRulesFromRulePattern(rulePattern: RulePattern): void {
        if (isNone(rulePattern.primaryCharacters)) return
        if (isNone(rulePattern.effectRules)) return

        const verbs = [OperatorType.IS, OperatorType.HAS, OperatorType.MAKE]
        for (const noun of rulePattern.primaryCharacters.value) {
            const character = convertNounToCharacter(noun)

            for (const verb of verbs) {
                const features = rulePattern.effectRules.value.get(verb)
                if (!features) continue

                for (const feature of features) {
                    const featureCondition: FeatureCondition = {feature: feature, on: [], near: [], facing: []}

                    if (isSome(rulePattern.conditionSettings)) {
                        featureCondition.on = rulePattern.conditionSettings.value.get(OperatorType.ON) || []
                        featureCondition.near = rulePattern.conditionSettings.value.get(OperatorType.NEAR) || []
                        featureCondition.facing = rulePattern.conditionSettings.value.get(OperatorType.FACING) || []
                    }

                    this._ruleController.addFeature(character, verb, featureCondition)
                }
            }
        }
    }

    public findRulesFromMap(sceneSetup: SceneSetup): void {
        const maxX = sceneSetup.sceneWidth
        const maxY = sceneSetup.sceneHeight
        for (let x = 0; x < maxX; x++) {
            for (let y = 0; y < maxY; y++) {
                const thingsOnBlock = this._mapController.whoAreThere(x, y)
                if (isNone(thingsOnBlock)) continue

                for (const thing of thingsOnBlock.value) {
                    // check if thing is noun
                    if (thing.species === Species.NOUNS) {
                        // console.log(`scanning rule at location (${x}, ${y})`)

                        // console.log('scanRule (Direction.RIGHT)')
                        const rulePatternRight = this.scanRule(x, y, maxX, maxY, Direction.RIGHT)
                        // console.log(rulePatternRight)
                        if (isSome(rulePatternRight)) this.addRulesFromRulePattern(rulePatternRight.value)

                        // console.log('scanRule (Direction.DOWN)')
                        const rulePatternDown = this.scanRule(x, y, maxX, maxY, Direction.DOWN)
                        // console.log(rulePatternDown)
                        if (isSome(rulePatternDown)) this.addRulesFromRulePattern(rulePatternDown.value)

                        // console.log(`end scan at location (${x}, ${y})`)
                        // console.log('====================')
                    }
                }
            }
        }
    }
}

const addRulesFromRulePattern = (ruleController: RuleController, rulePattern: RulePattern): void => {
    if (isNone(rulePattern.primaryCharacters)) return
    if (isNone(rulePattern.effectRules)) return

    const verbs = [OperatorType.IS, OperatorType.HAS, OperatorType.MAKE]
    for (const noun of rulePattern.primaryCharacters.value) {
        const character = convertNounToCharacter(noun)

        for (const verb of verbs) {
            const features = rulePattern.effectRules.value.get(verb)
            if (!features) continue

            for (const feature of features) {
                const featureCondition: FeatureCondition = {feature: feature, on: [], near: [], facing: []}

                if (isSome(rulePattern.conditionSettings)) {
                    featureCondition.on = rulePattern.conditionSettings.value.get(OperatorType.ON) || []
                    featureCondition.near = rulePattern.conditionSettings.value.get(OperatorType.NEAR) || []
                    featureCondition.facing = rulePattern.conditionSettings.value.get(OperatorType.FACING) || []
                }

                ruleController.addFeature(character, verb, featureCondition)
            }
        }
    }
}

export const createRuleScanner = (ruleController: RuleController, mapController: MapController) => {
    return new RuleScannerConcrete(ruleController, mapController)
}