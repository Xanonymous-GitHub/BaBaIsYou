class ContainerControllerConcrete {
    public makeContainer() {
        // find if there has any empty container.
    }
}

export const createContainerController = () => {
    return new ContainerControllerConcrete()
}

export type ContainerController = ReturnType<typeof createContainerController>