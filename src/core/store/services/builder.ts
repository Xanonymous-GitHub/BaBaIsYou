import {StageControllerConcrete} from '@/core/builders/stage';
import {ContainerControllerConcrete} from '@/core/builders/container';
import {SpriteControllerConcrete} from '@/core/builders/sprite';
// to be removed.
export interface BuilderService {
    setStageBuilder: (stageBuilder: StageControllerConcrete) => void
    setContainerBuilder: (containerBuilder: ContainerControllerConcrete) => void
    setSpriteBuilder: (spriteBuilder: SpriteControllerConcrete) => void
    getStageBuilder: () => StageControllerConcrete,
    getContainerBuilder: () => ContainerControllerConcrete,
    getSpriteBuilder: () => SpriteControllerConcrete
}

class BuilderServiceConcrete implements BuilderService {
    private _stageBuilder!: StageControllerConcrete
    private _containerBuilder!: ContainerControllerConcrete
    private _spriteBuilder!: SpriteControllerConcrete

    public getContainerBuilder(): ContainerControllerConcrete {
        return this._containerBuilder;
    }

    public getSpriteBuilder(): SpriteControllerConcrete {
        return this._spriteBuilder;
    }

    public getStageBuilder(): StageControllerConcrete {
        return this._stageBuilder;
    }

    public setContainerBuilder(containerBuilder: ContainerControllerConcrete): void {
        this._containerBuilder = containerBuilder;
    }

    public setSpriteBuilder(spriteBuilder: SpriteControllerConcrete): void {
        this._spriteBuilder = spriteBuilder
    }

    public setStageBuilder(stageBuilder: StageControllerConcrete): void {
        this._stageBuilder = stageBuilder
    }
}

export const createBuilderService = (): BuilderService => {
    return new BuilderServiceConcrete()
}
