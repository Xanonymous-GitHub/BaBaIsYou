import {createContainerService} from './container'
import {createCommandService} from "./command";

export const createServices = () => {
    const containerService = createContainerService()
    const commandService = createCommandService()

    return {
        containerService,
        commandService
    }
}