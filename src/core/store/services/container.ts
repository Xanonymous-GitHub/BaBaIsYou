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

    private get _size(): number {
        return this._containerPackages.length
    }

    private _removeContainerPackage(id: string): void {
        const containerPackageIndex = this._containerPackages.findIndex(pkg => pkg.id === id)
        if (containerPackageIndex === -1) throw new Error(`containerPackage ${id} does not exist.`)
        this._containerPackages.splice(containerPackageIndex, 1)
    }

    public getContainerById(id: string): Readonly<ContainerPackage> {
        const containerPackage = this._containerPackages.find(pkg => pkg.id === id)
        if (!containerPackage) throw new Error(`Invalid container ${id}`)
        this._removeContainerPackage(containerPackage.id)
        return containerPackage
    }

    public getContainerByIndex(index: number): Readonly<ContainerPackage> {
        const containerAmount = this._size
        if (index < 0 || index >= containerAmount) throw new Error(`Index ${index} out of range`)
        const containerPackage = this._containerPackages[index]
        if (!containerPackage) throw new Error(`Container package ${index} not a valid container package`)
        this._removeContainerPackage(containerPackage.id)
        return containerPackage
    }

    public getContainerByName(name: string): Readonly<ContainerPackage> {
        const containerPackage = this._containerPackages.find(pkg => pkg.name === name)
        if (!containerPackage) throw new Error(`Invalid container ${name}`)
        this._removeContainerPackage(containerPackage.id)
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