import {Observer, Subject} from 'rxjs';
import {none, some, Option, isSome} from 'fp-ts/es6/Option';

interface Deferrer {
    progress: Promise<unknown>
    refreshPromise: () => void
    resolve: () => void
}

class DeferrerConcrete implements Deferrer {
    private res!: (value: unknown) => void
    private rej!: (reason?: any) => void
    public progress!: Promise<unknown>

    constructor() {
        this.refreshPromise()
    }

    public refreshPromise(): void {
        this.progress = new Promise((resolve, reject) => {
            this.res = resolve
            this.rej = reject
        })
    }

    public resolve(): void {
        this.res(undefined)
    }
}

export interface Channel<MsgType> {
    connect: (channel: Channel<MsgType>) => void
    send: (msg: MsgType) => Promise<void>
    onReceive: (msg: MsgType) => Promise<void>
    setHandler: (handler: (msg: MsgType) => Promise<void>) => void
    sender: Subject<MsgType>
    receiver: Observer<MsgType>
    status: Deferrer
    complete: () => void
}

class ChannelConcrete<MsgType> implements Channel<MsgType> {
    public sender: Subject<MsgType>
    public receiver: Observer<MsgType>
    public status: Deferrer

    private _handler: Option<(msg: MsgType) => Promise<void>> = none
    private _otherChannel: Option<Channel<MsgType>> = none

    constructor() {
        this.sender = new Subject<MsgType>()
        this.receiver = {
            next: this.onReceive,
            error: () => undefined,
            complete: () => undefined
        }
        this.status = new DeferrerConcrete()
    }

    public connect(otherChannel: Channel<MsgType>): void {
        this._otherChannel = some(otherChannel)
        this.sender.subscribe(otherChannel.receiver)
        otherChannel.sender.subscribe(this.receiver)
    }

    public setHandler(handler: (msg: MsgType) => Promise<void>): void {
        this._handler = some(handler)
    }

    public complete(): void {
        this.status.resolve()
    }

    public async send(msg: MsgType): Promise<void> {
        this.sender.next(msg)
        await this.status.progress
        this.status.refreshPromise()
    }

    public async onReceive(msg: MsgType): Promise<void> {
        if (isSome(this._handler)) {
            await this._handler.value(msg)
        }
        if (isSome(this._otherChannel)) {
            this._otherChannel.value.complete()
        } else {
            this.sender.error('otherChannel is missing.')
        }
    }
}

export function createChannel<MsgType>(): Channel<MsgType> {
    return new ChannelConcrete<MsgType>()
}