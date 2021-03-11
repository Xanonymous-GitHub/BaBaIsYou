import {Container} from 'pixi.js'
import {getUid} from "../../utils/uuid";


interface ContainerPackage {
    readonly id: string
    name: string,
    container: Container
}

export interface ContainerService {
    getContainerByName: (name: string) => ContainerPackage
    getContainerByIndex: (index: number) => ContainerPackage
    getContainerById: (id: string) => ContainerPackage
    addContainer: (container: Container, name: string, index?: number) => void
}

class ContainerServiceConcrete implements ContainerService {
    private _containerPackages: Array<ContainerPackage> = []

    constructor() {
    }

    private get _size(): number {
        return this._containerPackages.length
    }

    public getContainerById(id: string): Readonly<ContainerPackage> {
        const containerPackage = this._containerPackages.find(pkg => pkg.id === id)
        if (!containerPackage) throw new Error(`Invalid container ${id}`)
        return containerPackage
    }

    public getContainerByIndex(index: number): Readonly<ContainerPackage> {
        const containerAmount = this._size
        if (index < 0 || index >= containerAmount) throw new Error(`Index ${index} out of range`)
        const containerPackage = this._containerPackages[index]
        if (!containerPackage) throw new Error(`Container package ${index} not a valid container package`)
        return containerPackage
    }

    public getContainerByName(name: string) {
        const containerPackage = this._containerPackages.find(pkg => pkg.name === name)
        if (!containerPackage) throw new Error(`Invalid container ${name}`)
        return containerPackage
    }

    public addContainer(container: Container, name: string, index?: number): void {
        const id = getUid()
        const containerPackage = {id, name, container}
        this._containerPackages.splice(Number(index), 0, containerPackage)
    }
}

export const createContainerService = (): ContainerService => {
    return new ContainerServiceConcrete()
}