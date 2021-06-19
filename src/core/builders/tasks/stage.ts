import type { Container, DisplayObject } from 'pixi.js'
import type { Task } from './index'

abstract class StageTask<T> implements Task<T> {
  protected _stage!: Readonly<Container>
  protected _container!: Readonly<Container>

  public abstract execute(): Promise<T>;

  public abstract setArgs(...args: any[]): void
}


export class MountContainerToStageTask extends StageTask<void> {
  public setArgs(stage: Readonly<Container>, container: Readonly<Container>): void {
    this._stage = stage
    this._container = container
  }

  public async execute(): Promise<void> {
    await new Promise<void>(resolve => {
      this._stage.addChild(this._container as Container)
      resolve()
    })
  }
}

export class UnmountContainerFromStageTask extends StageTask<void> {
  public setArgs(stage: Readonly<Container>, container: Readonly<Container>): void {
    this._stage = stage
    this._container = container
  }

  public async execute(): Promise<void> {
    return await new Promise<void>(resolve => {
      this._stage.removeChild(this._container as Container)
      resolve()
    })
  }
}

export class MountContainerToStageAtIndexTask extends StageTask<void> {
  protected _mountAtIndex!: number

  public setArgs(stage: Readonly<Container>, container: Readonly<Container>, mountAtIndex: number): void {
    this._stage = stage
    this._container = container
    this._mountAtIndex = mountAtIndex
  }

  public async execute(): Promise<void> {
    await new Promise<void>(resolve => {
      this._stage.addChildAt(this._container as Container, this._mountAtIndex)
      resolve()
    })
  }
}

export class UnmountContainerFromStageAtIndexTask extends StageTask<DisplayObject> {
  protected _unmountAtIndex!: number

  public setArgs(stage: Readonly<Container>, container: Readonly<Container>, unmountAtIndex: number): void {
    this._stage = stage
    this._container = container
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