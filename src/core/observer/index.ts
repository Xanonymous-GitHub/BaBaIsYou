import {Observable, ObservableSubject} from './observable';
import {Observer} from './observer';
import {Command} from '../store/services/command';
import {GameStore} from '../store'
import {getUid} from '../utils/uuid';
import {Thing} from '../things'
import {isNone} from 'fp-ts/es6/Option';

export class ThingCommandDispatchServerConcrete extends ObservableSubject {
    private _store: GameStore
    private _runningCommand = false
    private _isActive = false

    constructor(store: GameStore) {
        super()
        this._store = store
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

    public run() {
        if (this._isActive) {
            if (!this._runningCommand) {
                const nextCommand = this._store.nextCommand()
                if (!isNone(nextCommand)) {
                    this._setRunning()
                    this.setChanged()
                    this.notifyObservers(nextCommand.value)
                        .then(() => this._setNotRunning())
                }
            }
        }
    }
}

class ThingCommandReceiverConcrete implements Observer {
    public observeId: string;
    private _dispatchServer: Observable
    private _thing: Thing

    constructor(dispatchServer: ThingCommandDispatchServerConcrete, thing: Thing) {
        // generate observerId (uuid) for the Thing.
        this.observeId = getUid()

        // save the Observable target and register self in for command notifications.
        this._dispatchServer = dispatchServer
        this._dispatchServer.addObserver(this)

        // store the thing
        this._thing = thing
    }

    public async update(subject: Observable, command: Command): Promise<void> {
        await this._thing.performCommand(command)
    }

    public disconnect(): void {
        this._dispatchServer.deleteObserver(this)
    }
}

export const createThingCommandDispatchServer = (store: GameStore) => {
    return new ThingCommandDispatchServerConcrete(store)
}

export const createThingCommandReceiver = (dispatchServer: ThingCommandDispatchServerConcrete, thing: Thing) => {
    return new ThingCommandReceiverConcrete(dispatchServer, thing)
}

export type ThingCommandDispatchServer = ThingCommandDispatchServerConcrete
export type ThingCommandReceiver = ReturnType<typeof createThingCommandReceiver>
