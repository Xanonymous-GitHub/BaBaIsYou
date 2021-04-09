import {Texture} from 'pixi.js'
import {Task} from './'
import {Thing, ThingFactory} from '../things';
import {Direction} from '../types/things';
import {InstructionDispatchServer, createThingController} from '../observer';
import {RuleController} from '../observer/rule';
import {MapController} from '../observer/map';

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
    private _defaultTowards?: Direction

    public setArgs(
        name: string,
        texture: Texture,
        defaultBlockX: number,
        defaultBlockY: number,
        blockSize: number,
        maxBlockX: number,
        maxBlockY: number,
        defaultTowards?: Direction
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

export class connectThingControllerTask extends SpriteTask<void> {
    private _dispatchServer!: InstructionDispatchServer
    private _ruleController!: RuleController
    private _mapController!: MapController
    private _thing!: Thing

    public setArgs(dispatchServer: InstructionDispatchServer, ruleController: RuleController, mapController: MapController, thing: Thing): void {
        this._dispatchServer = dispatchServer
        this._ruleController = ruleController
        this._mapController = mapController
        this._thing = thing
    }

    public async execute(): Promise<void> {
        return await new Promise<void>(resolve => {
            createThingController(
                this._dispatchServer,
                this._ruleController,
                this._mapController,
                this._thing
            )
            resolve()
        })
    }
}