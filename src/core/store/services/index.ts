import {createContainerService} from './container'
import {createCommandService} from './command';
import {createSpriteService} from './sprite';
import {createTextureService} from './texture'
import {createDispatchServerService} from './instruction';
import {createScreenService} from './screen';
import {createScannerService} from './scanner';
import {createBuilderService} from './builder';

export interface Service {
    init: (...args: Array<any>) => Promise<void>
}

export const createServices = () => {
    const containerService = createContainerService()
    const commandService = createCommandService()
    const spriteService = createSpriteService()
    const textureService = createTextureService()
    const dispatchServerService = createDispatchServerService()
    const screenService = createScreenService()
    const scannerService = createScannerService()
    const builderService = createBuilderService()

    return {
        containerService,
        commandService,
        spriteService,
        textureService,
        dispatchServerService,
        screenService,
        scannerService,
        builderService
    }
}