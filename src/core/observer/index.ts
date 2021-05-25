import {Observable, ObservableSubject} from './observable';
import {Observer} from './observer';
import {GameStore} from '@/core/store'
import {getUid} from '@/core/utils/uuid';
import {Thing} from '@/core/things'
import {isNone, isSome, none, Option, some} from 'fp-ts/es6/Option';
import {RuleController} from './rule';
import {Instruction, EmptyInstruction} from '@/core/instructions';
import move from '@/core/instructions/move';
import PriorityQueue from '@/core/data-structures/priorityQueue';
import {Command, CommandType} from '@/core/store/services/command';
import {PropertyType} from '@/core/types/properties';
import {MapController} from '@/core/observer/map';
import {Direction} from '@/core/types/things';


export class InstructionDispatchServerConcrete extends ObservableSubject {
    private _store: GameStore
    private _runningCommand = false
    private _isActive = false
    private _pendingInstructions: PriorityQueue<Instruction>
    private _needScanRule = false
    private _win = false

    constructor(store: GameStore) {
        super()
        this._store = store
        this._pendingInstructions = new PriorityQueue<Instruction>()
    }

    private _setRunning() {
        this._runningCommand = true
    }

    private _setNotRunning() {
        this._runningCommand = false
    }

    public enableService() {
        this._isActive = true
    }

    public disableService() {
        this._isActive = false
    }

    private static _judgementInstructionPriority(instruction: Instruction): number {
        const instructionPriority = instruction.getPriority()
        if (!instructionPriority) return Date.now()
        return instructionPriority
    }

    public addInstructions(instructions: Array<Instruction>): void {
        for (const instruction of instructions) {
            const priority = InstructionDispatchServerConcrete._judgementInstructionPriority(instruction)
            this._pendingInstructions.add(instruction, priority)
        }
    }

    private _nextInstruction(): Option<Readonly<Instruction>> {
        const nextInstruction = this._pendingInstructions.poll()
        if (!nextInstruction) return none
        return some(nextInstruction)
    }

    public needScanRule() {
        this._needScanRule = true
    }

    private async addWinScene() {
        await this._store.getStageBuilder().addWinScene()
    }

    public win() {
        this._win = true
    }

    public run() {
        if (!this._isActive || this._runningCommand) return
        const nextCommand = this._store.nextCommand()
        if (isNone(nextCommand)) return
        this._setRunning()
        this.setChanged()
        this.notifyObservers(nextCommand.value)
            .then(() => {
                let currentInstruction = this._nextInstruction()
                while (isSome(currentInstruction)) {
                    currentInstruction.value.perform().then()
                    currentInstruction = this._nextInstruction()
                }
            })
            .then(() => {
                setTimeout(() => {
                    if (this._needScanRule) {
                        this._store.getRuleController().refreshAll()
                        this._store.getScanner().findRulesFromMap(this._store.getAppEdge())
                        this._needScanRule = false
                    }
                }, 0)
                this._setNotRunning()
            })
        if (this._win) {
            this.addWinScene().then(
                () => this.disableService()
            )
        }
    }
}

export type InstructionDispatchServer = InstructionDispatchServerConcrete

class ThingControllerConcrete implements Observer {
    public observeId: string
    private _instructions: Array<Instruction>
    private readonly _dispatchServer: InstructionDispatchServer
    private readonly _ruleController: RuleController
    private readonly _mapController: MapController
    private readonly _thing: Thing

    constructor(dispatchServer: InstructionDispatchServer, ruleController: RuleController, mapController: MapController, thing: Thing) {
        // generate observerId (uuid) for the Thing.
        this.observeId = getUid()

        // init instructions array
        this._instructions = []

        // save the Observable target and register self in for command notifications.
        this._dispatchServer = dispatchServer
        this._dispatchServer.addObserver(this)

        // set rule controller.
        this._ruleController = ruleController

        // set map controller.
        this._mapController = mapController

        // store the thing
        this._thing = thing

        // reverse binding
        this._thing.bindThingController(this)
        this._thing.bindRuleController(this._ruleController)
        this._thing.bindMapController(this._mapController).then()
    }

    public clearInstructions() {
        this._instructions = []
    }

    public addNewInstruction(instruction: Instruction) {
        this._instructions.push(instruction)
    }

    public pushInstructions() {
        this._dispatchServer.addInstructions(this._instructions)
        this.clearInstructions()
    }

    public async update(subject: Observable, command: Command): Promise<void> {
        // 1. when received a command, ask ruleController if self has privilege to execute this command. (am I 'YOU'?)
        const isYou = this._ruleController.$is(this._thing, PropertyType.YOU)
        if (!isYou) return

        // 2. if could, check if there leaves any obstacles to perform this command.
        const iCanEncounter = await this._mapController.canIEncounter(this._thing, ((): Direction => {
            switch (command.value) {
                case CommandType.UP:
                    return Direction.TOP
                case CommandType.DOWN:
                    return Direction.DOWN
                case CommandType.LEFT:
                    return Direction.LEFT
                case CommandType.RIGHT:
                    return Direction.RIGHT
                default:
                    return Direction.UNDEFINED
            }
        })())
        if (!iCanEncounter) return

        // 3. if not any obstacles, apply an self instruction to the DispatchServer.
        let newInstruction: Instruction
        switch (command.value) {
            case CommandType.UP:
                newInstruction = new move.MoveUpInstruction(this._thing, this._ruleController, this._mapController)
                break
            case CommandType.DOWN:
                newInstruction = new move.MoveDownInstruction(this._thing, this._ruleController, this._mapController)
                break
            case CommandType.LEFT:
                newInstruction = new move.MoveLeftInstruction(this._thing, this._ruleController, this._mapController)
                break
            case CommandType.RIGHT:
                newInstruction = new move.MoveRightInstruction(this._thing, this._ruleController, this._mapController)
                break
            default:
                newInstruction = new EmptyInstruction(this._thing, this._ruleController, this._mapController)
                break
        }

        this._dispatchServer.needScanRule()
        // this.pushInstruction(newInstruction)

        this.addNewInstruction(newInstruction)
        this.pushInstructions()
    }

    public stopDispatcher(): void {
        this._dispatchServer.disableService()
    }

    public win(): void {
        this._dispatchServer.win()
    }

    public disconnect(): void {
        this._dispatchServer.deleteObserver(this)
    }
}

export const createInstructionDispatchServer = (store: GameStore) => {
    return new InstructionDispatchServerConcrete(store)
}

export const createThingController = (dispatchServer: InstructionDispatchServerConcrete, ruleController: RuleController, mapController: MapController, thing: Thing) => {
    return new ThingControllerConcrete(dispatchServer, ruleController, mapController, thing)
}

export type ThingController = ReturnType<typeof createThingController>
