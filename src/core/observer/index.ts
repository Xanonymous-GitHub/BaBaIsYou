import {Observable, ObservableSubject} from './observable';
import {Observer} from './observer';
import {GameStore} from '../store'
import {getUid} from '../utils/uuid';
import {Thing} from '../things'
import {isNone, isSome, none, Option, some} from 'fp-ts/es6/Option';
import {RuleController} from './rule';
import {Instruction, EmptyInstruction} from '../instructions';
import move from '../instructions/move';
import PriorityQueue from '../data-structures/priorityQueue';
import {Command, CommandType} from '../store/services/command';
import {PropertyType} from '../types/properties';
import {MapController} from '../observer/map';
import {Direction} from '../types/things';


export class InstructionDispatchServerConcrete extends ObservableSubject {
    private _store: GameStore
    private _runningCommand = false
    private _isActive = false
    private _pendingInstructions: PriorityQueue<Instruction>
    private _needScanRule = false

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

    public addInstruction(instruction: Instruction): void {
        const priority = InstructionDispatchServerConcrete._judgementInstructionPriority(instruction)
        this._pendingInstructions.add(instruction, priority)
    }

    private _nextInstruction(): Option<Readonly<Instruction>> {
        const nextInstruction = this._pendingInstructions.poll()
        if (!nextInstruction) return none
        return some(nextInstruction)
    }

    public needScanRule() {
        this._needScanRule = true
    }

    public win() {
        setTimeout(() => this._store.getStageBuilder().addWinScene(), 0)
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
    }
}

export type InstructionDispatchServer = InstructionDispatchServerConcrete

class ThingControllerConcrete implements Observer {
    public observeId: string;
    private readonly _dispatchServer: InstructionDispatchServer
    private readonly _ruleController: RuleController
    private readonly _mapController: MapController
    private readonly _thing: Thing

    constructor(dispatchServer: InstructionDispatchServer, ruleController: RuleController, mapController: MapController, thing: Thing) {
        // generate observerId (uuid) for the Thing.
        this.observeId = getUid()

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

    public pushInstruction(instruction: Instruction) {
        this._dispatchServer.addInstruction(instruction)
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
        this.pushInstruction(newInstruction)
    }

    public stopDispatcher(): void {
        this._dispatchServer.disableService()
        setTimeout(
            () => alert('WIN!!!!!!'), 0
        )
        // this._dispatchServer.win()
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
