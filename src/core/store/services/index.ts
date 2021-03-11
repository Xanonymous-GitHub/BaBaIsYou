import {createContainerService} from './container'

export const createServices = () => {
    const containerService = createContainerService()

    return {
        containerService
    }
}