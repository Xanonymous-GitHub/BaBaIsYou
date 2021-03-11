import {Container, DisplayObject} from "pixi.js";
import {Task} from './'

abstract class StageTask<T> implements Task<T> {
    protected readonly _stage: Container
    protected readonly _container: Container

    protected constructor(stage: Container, container: Container) {
        this._stage = stage
        this._container = container
    }

    public abstract execute(): Promise<T>;
}


export class MountContainerToStage extends StageTask<void> {
    public async execute(): Promise<void> {
        await new Promise<void>(resolve => {
            this._stage.addChild(this._container)
            resolve()
        })
    }
}

export class UnmountContainerFromStage extends StageTask<Container> {
    public async execute(): Promise<Container> {
        return await new Promise<Container>((resolve, reject) => {
            const unmountContainerFromStage = this._stage.removeChild(this._container)
            if (unmountContainerFromStage) {
                resolve(unmountContainerFromStage)
            }
            reject(unmountContainerFromStage)
        })
    }
}

export class MountContainerToStageAt extends StageTask<void> {
    protected readonly _mountAtIndex: number

    constructor(stage: Container, container: Container, mountAtIndex: number) {
        super(stage, container)
        this._mountAtIndex = mountAtIndex
    }

    public async execute(): Promise<void> {
        await new Promise<void>(resolve => {
            this._stage.addChildAt(this._container, this._mountAtIndex)
            resolve()
        })
    }
}

export class UnmountContainerFromStageAt extends StageTask<DisplayObject> {
    protected readonly _unmountAtIndex: number

    constructor(stage: Container, container: Container, unmountAtIndex: number) {
        super(stage, container)
        this._unmountAtIndex = unmountAtIndex
    }

    public async execute(): Promise<DisplayObject> {
        return await new Promise<DisplayObject>((resolve, reject) => {
            const unmountContainerFromStage = this._stage.removeChildAt(this._unmountAtIndex)
            if (unmountContainerFromStage) {
                resolve(unmountContainerFromStage)
            }
            reject(unmountContainerFromStage)
        })
    }
}