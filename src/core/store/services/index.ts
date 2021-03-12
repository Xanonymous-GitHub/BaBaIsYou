import {createContainerService} from './container'
import {createCommandService} from './command';
import {createSpriteService} from './sprite';

export const createServices = () => {
    const containerService = createContainerService()
    const commandService = createCommandService()
    const spriteService = createSpriteService()

    return {
        containerService,
        commandService,
        spriteService
    }
}