import type { Container } from 'pixi.js'
import { getUid } from '@/core/utils/ulid'
import { none, some } from 'fp-ts/es6/Option'
import type { Option } from 'fp-ts/es6/Option'


export interface ContainerPackage {
  readonly id: string
  name: string,
  container: Container
}

export interface ContainerService {
  getContainerByName: (name: string) => Readonly<Container>
  getNonEmptyContainerByIndex: (index: number) => Readonly<Container>
  getEmptyContainer: () => Option<Readonly<Container>>
  addContainer: (container: Container, name: string, index?: number) => void
  hasContainerById: (id: string) => boolean
  hasContainerByName: (name: string) => boolean
  hasAnyContainer: () => boolean
}

class ContainerServiceConcrete implements ContainerService {
  private _containerPackages: Array<ContainerPackage> = []
  private _emptyContainerPackages: Array<ContainerPackage> = []

  private get _nonEmptySize(): number {
    return this._containerPackages.length
  }

  private _removeContainerPackage(id: string): void {
    const containerPackageIndex = this._containerPackages.findIndex(pkg => pkg.id === id)
    if (containerPackageIndex === -1) {
      const emptyContainerPackage = this._emptyContainerPackages.findIndex(pkg => pkg.id === id)
      if (emptyContainerPackage === -1) throw new Error(`containerPackage ${id} does not exist.`)
      this._emptyContainerPackages.splice(containerPackageIndex, 1)
      return
    }
    this._containerPackages.splice(containerPackageIndex, 1)
  }

  public hasContainerById(id: string): boolean {
    return this._containerPackages.concat(this._emptyContainerPackages).findIndex(pkg => pkg.id === id) !== -1
  }

  public hasContainerByName(name: string): boolean {
    return this._containerPackages.concat(this._emptyContainerPackages).findIndex(pkg => pkg.name === name) !== -1
  }

  public hasAnyContainer(): boolean {
    return this._containerPackages.concat(this._emptyContainerPackages).length !== 0
  }

  public getNonEmptyContainerByIndex(index: number): Readonly<Container> {
    const nonEmptyContainerAmount = this._nonEmptySize
    if (index < 0 || index >= nonEmptyContainerAmount) throw new Error(`Index ${index} out of range`)
    const containerPackage = this._containerPackages[index]
    if (!containerPackage) throw new Error(`Container package ${index} not a valid container package`)
    this._removeContainerPackage(containerPackage.id)
    return containerPackage.container
  }

  public getEmptyContainer(): Option<Readonly<Container>> {
    const emptyContainerPackageAmount = this._emptyContainerPackages.length
    if (emptyContainerPackageAmount === 0) return none
    const emptyContainerPackage = this._emptyContainerPackages[emptyContainerPackageAmount - 1]
    this._removeContainerPackage(emptyContainerPackage.id)
    return some(emptyContainerPackage.container)
  }

  public getContainerByName(name: string): Readonly<Container> {
    let containerPackage = this._containerPackages.find(pkg => pkg.name === name)
    if (!containerPackage) {
      const emptyContainerPackage = this._emptyContainerPackages.find(pkg => pkg.name === name)
      if (!emptyContainerPackage) throw new Error(`Invalid container ${name} not found`)
      containerPackage = emptyContainerPackage
    }
    this._removeContainerPackage(containerPackage.id)
    return containerPackage.container
  }

  public addContainer(container: Container, name: string, index?: number): void {
    const id = getUid()
    const containerPackage = { id, name, container }
    if (container.children.length === 0) {
      this._emptyContainerPackages.splice(Number(index), 0, containerPackage)
    }
    this._containerPackages.splice(Number(index), 0, containerPackage)
  }
}

export const createContainerService = (): ContainerService => {
  return new ContainerServiceConcrete()
}