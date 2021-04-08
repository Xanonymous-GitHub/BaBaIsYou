import {Texture} from 'pixi.js'
import {Task} from './'
import {Thing, ThingFactory} from '../things';
import {Towards} from '../types/things';
import {InstructionDispatchServer, createInstructionReceiver} from '../observer';
import {RuleController} from '../observer/rule';

abstract class SpriteTask<T> implements Task<T> {
    public abstract execute(): Promise<T>;

    public abstract setArgs(...args: any[]): void
}

export class CreateThingTask<T extends Thing> extends SpriteTask<T> {
    private _name!: string
    private _texture!: Texture
    private _defaultBlockX!: number
    private _defaultBlockY!: number
    private _blockSize!: number
    private _maxBlockX!: number
    private _maxBlockY!: number
    private _defaultTowards?: Towards

    public setArgs(
        name: string,
        texture: Texture,
        defaultBlockX: number,
        defaultBlockY: number,
        blockSize: number,
        maxBlockX: number,
        maxBlockY: number,
        defaultTowards?: Towards
    ) {
        this._name = name
        this._texture = texture
        this._defaultBlockX = defaultBlockX
        this._defaultBlockY = defaultBlockY
        this._blockSize = blockSize
        this._maxBlockX = maxBlockX
        this._maxBlockY = maxBlockY
        this._defaultTowards = defaultTowards
    }

    public async execute(): Promise<T> {
        return await new Promise<T>((resolve, reject) => {
            const thing = new ThingFactory()
                .createInstance<T>(
                    // @ts-ignore
                    Thing,
                    ...Object
                        .getOwnPropertyNames(this)
                        .map(name => Object.getOwnPropertyDescriptor(this, name)!.value)
                )
            if (thing) {
                resolve(thing)
            }
            reject(thing)
        })
    }
}

export class wrapThingInCommandReceiverTask extends SpriteTask<void> {
    private _dispatchServer!: InstructionDispatchServer
    private _ruleController!: RuleController
    private _thing!: Thing

    public setArgs(dispatchServer: InstructionDispatchServer, ruleController: RuleController, thing: Thing): void {
        this._dispatchServer = dispatchServer
        this._ruleController = ruleController
        this._thing = thing
    }

    public async execute(): Promise<void> {
        return await new Promise<void>(resolve => {
            createInstructionReceiver(this._dispatchServer, this._ruleController, this._thing)
            resolve()
        })
    }
}