import { Assets } from 'pixi.js'
import type { Texture, Spritesheet, Resource } from 'pixi.js'
import type { Species } from '@/core/resource'

export interface TextureService {
  loadResources: (resourcesLocation: string) => Promise<void>
  getLoadingProgress: () => number
  getAnimationTextures: (species: Species, name: string) => Array<Texture<Resource>>
}

class TextureServiceConcrete implements TextureService {
  private _resourcesSheet!: Spritesheet
  private _loadingProgress = 0

  private async _prepareLoadedResources(resourcesLocation: string): Promise<void> {
    const sheet = await Assets.load(resourcesLocation.trim())
    if (!sheet) throw new Error('Could not get game resources!')
    this._resourcesSheet = sheet
  }

  public async loadResources(resourcesLocation: string): Promise<void> {
    if (this._resourcesSheet) return
    await this._prepareLoadedResources(resourcesLocation)
  }

  public getLoadingProgress(): number {
    return this._loadingProgress
  }

  public getAnimationTextures(species: Species, name: string): Array<Texture<Resource>> {
    const textures = this._resourcesSheet.animations[`${species}/${name}`]
    if (!textures) throw new Error(`Could not found the resource of ${species}/${name} !`)
    return textures
  }
}

export const createTextureService = (): TextureService => {
  return new TextureServiceConcrete()
}
