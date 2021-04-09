import {Observable, ObservableSubject} from './observable';
import {Observer} from './observer';
import {GameStore} from '../store'
import {getUid} from '../utils/uuid';
import {Thing} from '../things'
import {isNone} from 'fp-ts/es6/Option';
import {RuleController} from './rule';
import {Instruction} from '../instructions';
import PriorityQueue from '../data-structures/priorityQueue';
import {Option, none, some} from 'fp-ts/es6/Option';
import {Command} from '../store/services/command';

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

    private _addInstruction(instruction: Instruction): void {
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

class InstructionReceiverConcrete implements Observer {
    public observeId: string;
    private _dispatchServer: Observable
    private _ruleController: RuleController
    private readonly _thing: Thing

    constructor(dispatchServer: InstructionDispatchServerConcrete, ruleController: RuleController, thing: Thing) {
        // generate observerId (uuid) for the Thing.
        this.observeId = getUid()

        // save the Observable target and register self in for command notifications.
        this._dispatchServer = dispatchServer
        this._dispatchServer.addObserver(this)

        // set rule controller.
        this._ruleController = ruleController

        // store the thing
        this._thing = thing
    }

    public async update(subject: Observable, command: Command): Promise<void> {
        // 1. when received a command, ask ruleController if self has privilege to execute this command. (am I 'YOU'?)

        // 2. if could, check if there leaves any obstacles to perform this command.
            // A. am I at the edge?
            // B. is the place I will go has any other Thing now?
                // Yes
                    // send ENCOUNTER request to the neighbor by the Map controller. => accept or reject
                // No
                    // accept.
        // 3. if not any obstacles, apply an self instruction to the DispatchServer.

        // 4. done.
    }

    public disconnect(): void {
        this._dispatchServer.deleteObserver(this)
    }
}

export const createInstructionDispatchServer = (store: GameStore) => {
    return new InstructionDispatchServerConcrete(store)
}

export const createInstructionReceiver = (dispatchServer: InstructionDispatchServerConcrete, ruleController: RuleController, thing: Thing) => {
    return new InstructionReceiverConcrete(dispatchServer, ruleController, thing)
}

export type InstructionDispatchServer = InstructionDispatchServerConcrete
export type InstructionReceiver = ReturnType<typeof createInstructionReceiver>
