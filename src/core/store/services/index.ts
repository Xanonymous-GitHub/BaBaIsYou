import {createContainerService} from './container'
import {createCommandService} from './command';
import {createSpriteService} from './sprite';
import {createTextureService} from './texture'

export const createServices = () => {
    const containerService = createContainerService()
    const commandService = createCommandService()
    const spriteService = createSpriteService()
    const textureService = createTextureService()

    return {
        containerService,
        commandService,
        spriteService,
        textureService
    }
}