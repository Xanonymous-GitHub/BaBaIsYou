import {StageController} from '@/core/builders/stage';
import {ContainerController} from '@/core/builders/container';
import {SpriteController} from '@/core/builders/sprite';

export interface BuilderService {
    setStageBuilder: (stageBuilder: StageController) => void
    setContainerBuilder: (containerBuilder: ContainerController) => void
    setSpriteBuilder: (spriteBuilder: SpriteController) => void
    getStageBuilder: () => StageController,
    getContainerBuilder: () => ContainerController,
    getSpriteBuilder: () => SpriteController
}

class BuilderServiceConcrete implements BuilderService {
    private _stageBuilder!: StageController
    private _containerBuilder!: ContainerController
    private _spriteBuilder!: SpriteController

    public getContainerBuilder(): ContainerController {
        return this._containerBuilder;
    }

    public getSpriteBuilder(): SpriteController {
        return this._spriteBuilder;
    }

    public getStageBuilder(): StageController {
        return this._stageBuilder;
    }

    public setContainerBuilder(containerBuilder: ContainerController): void {
        this._containerBuilder = containerBuilder;
    }

    public setSpriteBuilder(spriteBuilder: SpriteController): void {
        this._spriteBuilder = spriteBuilder
    }

    public setStageBuilder(stageBuilder: StageController): void {
        this._stageBuilder = stageBuilder
    }
}

export const createBuilderService = (): BuilderService => {
    return new BuilderServiceConcrete()
}
