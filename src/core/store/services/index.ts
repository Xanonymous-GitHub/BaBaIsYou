import {createContainerService} from './container'
import {createCommandService} from './command';
import {createSpriteService} from './sprite';
import {createTextureService} from './texture'
import {createDispatchServerService} from './dispatchServer';
import {createScreenService} from './screen';

export const createServices = () => {
    const containerService = createContainerService()
    const commandService = createCommandService()
    const spriteService = createSpriteService()
    const textureService = createTextureService()
    const dispatchServerService = createDispatchServerService()
    const screenService = createScreenService()

    return {
        containerService,
        commandService,
        spriteService,
        textureService,
        dispatchServerService,
        screenService
    }
}