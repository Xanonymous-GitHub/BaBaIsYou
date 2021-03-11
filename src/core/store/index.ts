import {createServices} from "./services";
import {ContainerService} from './services/container'
import {Container} from "pixi.js";

const createContainerStore = (containerService: ContainerService) => {
    return {
        getContainerByName: (name: string) => containerService.getContainerByName(name),
        getContainerByIndex: (index: number) => containerService.getContainerByIndex(index),
        getContainerById: (id: string) => containerService.getContainerById(id),
        addContainer: (container: Container, name: string, index?: number) => containerService.addContainer(container, name, index),
    }
}

export const createGameStore = () => {
    const services = createServices()

    const containerStore = createContainerStore(services.containerService)

    return {
        ...containerStore
    }
}

export type GameStore = typeof createGameStore
