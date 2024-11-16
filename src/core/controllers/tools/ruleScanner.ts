import type { MapController } from '@/core/controllers/map'
import type { FeatureCondition, RuleController } from '@/core/controllers/rule'
import type { ThingType } from '@/core/types'
import { Species } from '@/core/resource'
import { Direction } from '@/core/types/things'
import { NounType } from '@/core/types/nouns'
import { OperatorType } from '@/core/types/operators'
import { PropertyType } from '@/core/types/properties'
import { isNone, isSome, none, some } from 'fp-ts/es6/Option'
import type { Option } from 'fp-ts/es6/Option'
import { convertNounToCharacter } from '@/core/utils/thingType'
import type { Edge } from '@/core/store/services/screen'
import type { Thing } from '@/core/things'

export interface RulePattern {
  primaryCharacters: Option<Array<NounType>>
  conditionSettings: Option<Map<OperatorType, Array<NounType>>>
  effectRules: Option<Map<OperatorType, Array<NounType | PropertyType>>>
}

export interface RuleScanner {
  scanRule: (startX: number, startY: number, maxX: number, maxY: number, scanDirection: Direction) => Option<RulePattern>
  addRulesFromRulePattern: (rulePattern: RulePattern) => void
  findRulesFromMap: (edge: Edge) => void
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
      if (x >= maxX || y >= maxY) return none
      const thingsOnBlock = this._mapController.whoAreThere(x, y)
      if (isNone(thingsOnBlock)) return none
      // console.log(`scanning primary characters in location (${x}, ${y}) `)

      if (expectAnd) {
        // check if the current block has AND
        let containsAnd = false
        for (const thing of thingsOnBlock.value) {
          const name = thing.thingName as ThingType
          if (name === OperatorType.AND) {
            containsAnd = true
            break
          }
        }

        // skip to step 2 if block is not AND, because there are no more NOUNS in sentence
        if (!containsAnd) break
      } else {
        // check if the current block has a NOUN
        let containsNoun = false
        for (const thing of thingsOnBlock.value) {
          const species = thing.species
          if (species === Species.NOUNS) {
            if (isNone(rulePattern.primaryCharacters)) rulePattern.primaryCharacters = some([])
            if (isSome(rulePattern.primaryCharacters)) {
              const name = thing.thingName as NounType
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
      if (x >= maxX || y >= maxY) return none
      const thingsOnBlock = this._mapController.whoAreThere(x, y)
      if (isNone(thingsOnBlock)) return none
      // console.log(`scanning condition settings in location (${x}, ${y}) `)

      const addConditionToPattern = (thing: Readonly<Thing>, currentAdj: OperatorType): void => {
        if (!adjectives.includes(currentAdj)) throw new Error(`currentAdj ${currentAdj} was passed in as unacceptable OperatorType`)

        const name = thing.thingName as NounType
        if (isNone(rulePattern.conditionSettings)) rulePattern.conditionSettings = some(new Map())
        if (isSome(rulePattern.conditionSettings)) {
          if (rulePattern.conditionSettings.value.has(currentAdj)) {
            const condition = rulePattern.conditionSettings.value.get(currentAdj)
            if (condition) {
              condition.push(name)
              rulePattern.conditionSettings.value.set(currentAdj, condition)
            }
          } else {
            rulePattern.conditionSettings.value.set(currentAdj, [name])
          }
        } else {
          throw new Error('unexpected error cause by rulePattern.conditionSettings is not a some value')
        }
      }

      if (expectAdj && expectNoun) {
        for (const thing of thingsOnBlock.value) {
          const species = thing.species

          if (species === Species.NOUNS) {
            if (isNone(currentAdj)) throw new Error(`adjective ${currentAdj} should not be none`)
            if (!adjectives.includes(currentAdj.value)) throw new Error(`currentAdj ${currentAdj} should be an adjective operator`)
            addConditionToPattern(thing, currentAdj.value)

            expectNoun = false
            expectAdj = false
            expectAnd = true
          }
          if (species === Species.OPERATORS) {
            const name = thing.thingName as OperatorType
            if (adjectives.includes(name)) {
              currentAdj = some(name)

              expectNoun = true
              expectAdj = false
              expectAnd = false
            } else {
              return none
            }
          }
        }
      } else if (expectAdj) {
        let containsAdj = false
        let containsVerb = false
        for (const thing of thingsOnBlock.value) {
          const species = thing.species

          if (species === Species.OPERATORS) {
            const name = thing.thingName as OperatorType
            if (name === OperatorType.AND) return none

            if (adjectives.includes(name)) {
              currentAdj = some(name)
              containsAdj = true
            } else if (verbs.includes(name)) {
              containsVerb = true
              break
            }
          }
        }

        if (containsVerb) break
        if (!containsAdj) return none
        expectAdj = false
        expectNoun = true
      } else if (expectNoun) {
        for (const thing of thingsOnBlock.value) {
          const species = thing.species

          if (species === Species.NOUNS) {
            if (isNone(currentAdj)) throw new Error(`adjective ${currentAdj} should not be none`)
            if (!adjectives.includes(currentAdj.value)) throw new Error(`currentAdj ${currentAdj} should be an adjective operator`)
            addConditionToPattern(thing, currentAdj.value)
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
            const name = thing.thingName as OperatorType

            if (name !== OperatorType.AND) return none
            if (verbs.includes(name)) {
              containsVerb = false
              break
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
        throw new Error('unexpected error occurred caused by nonexistent scan condition')
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
      if (x >= maxX || y >= maxY) break
      const thingsOnBlock = this._mapController.whoAreThere(x, y)
      if (isNone(thingsOnBlock)) break
      // console.log(`scanning effect rules in location (${x}, ${y}) `)

      const addEffectToPattern = (thing: Readonly<Thing>, currentVerb: OperatorType): void => {
        if (!verbs.includes(currentVerb)) throw new Error(`currentVerb ${currentVerb} was passed in as unacceptable OperatorType`)

        const name = thing.thingName as (NounType | PropertyType)
        if (isNone(rulePattern.effectRules)) rulePattern.effectRules = some(new Map())
        if (isSome(rulePattern.effectRules)) {
          if (rulePattern.effectRules.value.has(currentVerb)) {
            const effect = rulePattern.effectRules.value.get(currentVerb)
            if (effect) {
              effect.push(name)
              rulePattern.effectRules.value.set(currentVerb, effect)
            }
          } else {
            rulePattern.effectRules.value.set(currentVerb, [name])
          }
        } else {
          throw new Error('unexpected error cause by rulePattern.effectRules is not a some value')
        }
      }

      let endScan = false
      if (expectVerb && expectEffect) {
        let containsVerbOrEffect = false
        for (const thing of thingsOnBlock.value) {
          const species = thing.species
          if (species === Species.OPERATORS) {
            const name = thing.thingName as OperatorType
            if (verbs.includes(name)) {
              currentVerb = some(name)
              containsVerbOrEffect = true
            }
          } else if (species === Species.PROPERTIES) {
            if (isNone(currentVerb)) throw new Error(`verb ${currentVerb} should not be none`)
            if (currentVerb.value === OperatorType.IS) {
              addEffectToPattern(thing, currentVerb.value)
              containsVerbOrEffect = true
            }
          } else if (species === Species.NOUNS) {
            if (isNone(currentVerb)) throw new Error(`verb ${currentVerb} should not be none`)
            if (!verbs.includes(currentVerb.value)) throw new Error(`currentVerb ${currentVerb} should be a verb operator`)
            addEffectToPattern(thing, currentVerb.value)
            containsVerbOrEffect = true
          }
        }
        if (!containsVerbOrEffect) endScan = true
      } else if (expectVerb) {
        let containsVerb = false
        for (const thing of thingsOnBlock.value) {
          const species = thing.species
          if (species === Species.OPERATORS) {
            const name = thing.thingName as OperatorType
            if (verbs.includes(name)) {
              currentVerb = some(name)
              containsVerb = true
            }
          }
        }

        if (!containsVerb) return none // the pattern will not be valid if it does not contain the first verb
        expectEffect = true
        expectVerb = false
      } else if (expectEffect) {
        let containsEffect = false
        for (const thing of thingsOnBlock.value) {
          if (isNone(currentVerb)) throw new Error(`verb ${currentVerb} should not be none`)
          if (!verbs.includes(currentVerb.value)) throw new Error(`currentVerb ${currentVerb} should be a verb operator`)

          const species = thing.species
          if (species === Species.PROPERTIES && currentVerb.value === OperatorType.IS) {
            addEffectToPattern(thing, currentVerb.value)
            containsEffect = true
          } else if (species === Species.NOUNS) {
            addEffectToPattern(thing, currentVerb.value)
            containsEffect = true
          }
        }

        if (!containsEffect) endScan = true
        expectEffect = false
        expectAnd = true
      } else if (expectAnd) {
        let containsAnd = false
        for (const thing of thingsOnBlock.value) {
          if (thing.thingName === OperatorType.AND) {
            containsAnd = true
          }
        }

        if (!containsAnd) endScan = true
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
          const featureCondition: FeatureCondition = { feature: feature, on: [], near: [], facing: [] }

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

  public findRulesFromMap(edge: Edge): void {
    const maxX = edge.maxX + 1
    const maxY = edge.maxY + 1
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

export const createRuleScanner = (ruleController: RuleController, mapController: MapController): RuleScanner => {
  return new RuleScannerConcrete(ruleController, mapController)
}