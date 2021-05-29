import {Loader, Texture} from 'pixi.js'
import {ResourceMap} from '@/core/resource';
import {none, Option, some} from 'fp-ts/es6/Option';
import {Species} from '@/core/resource';

export interface TextureService {
    addResourceMap: (resourceMap: ResourceMap) => void
    loadResourcesByName: (species: Species, names: Array<string>) => Promise<void>
    getLoadingProgress: () => number
    getTextureByName: (name: string) => Option<Texture>
}

class TextureServiceConcrete implements TextureService {
    private _resourceMap!: ResourceMap
    private _loadedResources: Array<string> = []
    private _loadingProgress = 0

    public addResourceMap(resourceMap: ResourceMap): void {
        this._resourceMap = resourceMap
    }

    public getLoadingProgress(): number {
        return this._loadingProgress
    }

    public getTextureByName(name: string): Option<Texture> {
        // @ts-ignore
        const texture = Loader.shared.resources[name].texture
        if (!texture) return none
        return some(texture)
    }

    public async loadResourcesByName(species: Species, names: Array<string>): Promise<void> {
        if (!this._resourceMap.has(species)) throw new Error(`species ${species} not exist`)
        const resourcesToLoad = this._resourceMap.get(species)!.filter(resource => names.includes(resource.name) && !this._loadedResources.includes(resource.name))
        const loader = Loader.shared
        await new Promise<void>((resolve, reject) => {
            loader.add(resourcesToLoad)
            loader.onProgress.add((_loader: Loader) => this._loadingProgress = _loader.progress)
            loader.onError.add(() => reject())
            loader.load(() => {
                for (const resourceToLoad of resourcesToLoad) {
                    this._loadedResources.push(resourceToLoad.name)
                }
                resolve()
            })
        })
    }
}

export const createTextureService = (): TextureService => {
    return new TextureServiceConcrete()
}