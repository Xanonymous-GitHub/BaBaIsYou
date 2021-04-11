import {Observable, ObservableSubject} from './observable';
import {Observer} from './observer';
import {GameStore} from '../store'
import {getUid} from '../utils/uuid';
import {Thing} from '../things'
import {isNone, none, Option, some} from 'fp-ts/es6/Option';
import {RuleController} from './rule';
import {Instruction} from '../instructions';
import PriorityQueue from '../data-structures/priorityQueue';
import {Command} from '../store/services/command';
import {PropertyType} from '../types/properties';
import {MapController} from '../observer/map';


export class InstructionDispatchServerConcrete extends ObservableSubject {
    private _store: GameStore
    private _runningCommand = false
    private _isActive = false
    private _pendingInstructions: PriorityQueue<Instruction>

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

    public run() {
        if (this._isActive) {
            if (!this._runningCommand) {
                const nextCommand = this._store.nextCommand()
                if (!isNone(nextCommand)) {
                    this._setRunning()
                    this.setChanged()
                    this.notifyObservers(nextCommand.value)
                        .then(() => {
                            // start to clean the _pendingInstructions.
                            this._setNotRunning()
                        })
                }
            }
        }
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
        this._thing.bindMapController(this._mapController)
    }

    public async update(subject: Observable, command: Command): Promise<void> {
        // 1. when received a command, ask ruleController if self has privilege to execute this command. (am I 'YOU'?)
        const isYou = this._ruleController.$is(this._thing, PropertyType.YOU)
        if (!isYou) return

        // 2. if could, check if there leaves any obstacles to perform this command.

        // B. is the place I will go has any other Thing now?
        // Yes
        // send ENCOUNTER request to the neighbor by the Map controller. => accept or reject
        // No
        // accept.
        // 3. if not any obstacles, apply an self instruction to the DispatchServer.

        // 4. done.
    }

    public pushInstruction(instruction: Instruction) {
        this._dispatchServer.addInstruction(instruction)
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
