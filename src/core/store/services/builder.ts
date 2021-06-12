import { StageBuilderConcrete } from '@/core/builders/stage'
import { ContainerBuilderConcrete } from '@/core/builders/container'
import { SpriteBuilderConcrete } from '@/core/builders/sprite'

export interface BuilderService {
  setStageBuilder: (stageBuilder: StageBuilderConcrete) => void
  setContainerBuilder: (containerBuilder: ContainerBuilderConcrete) => void
  setSpriteBuilder: (spriteBuilder: SpriteBuilderConcrete) => void
  getStageBuilder: () => StageBuilderConcrete,
  getContainerBuilder: () => ContainerBuilderConcrete,
  getSpriteBuilder: () => SpriteBuilderConcrete
}

class BuilderServiceConcrete implements BuilderService {
  private _stageBuilder!: StageBuilderConcrete
  private _containerBuilder!: ContainerBuilderConcrete
  private _spriteBuilder!: SpriteBuilderConcrete

  public getContainerBuilder(): ContainerBuilderConcrete {
    return this._containerBuilder
  }

  public getSpriteBuilder(): SpriteBuilderConcrete {
    return this._spriteBuilder
  }

  public getStageBuilder(): StageBuilderConcrete {
    return this._stageBuilder
  }

  public setContainerBuilder(containerBuilder: ContainerBuilderConcrete): void {
    this._containerBuilder = containerBuilder
  }

  public setSpriteBuilder(spriteBuilder: SpriteBuilderConcrete): void {
    this._spriteBuilder = spriteBuilder
  }

  public setStageBuilder(stageBuilder: StageBuilderConcrete): void {
    this._stageBuilder = stageBuilder
  }
}

export const createBuilderService = (): BuilderService => {
  return new BuilderServiceConcrete()
}
