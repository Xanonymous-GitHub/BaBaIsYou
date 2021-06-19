import type { Sprite } from 'pixi.js'
import { getUid } from '@/core/utils/uuid'
import { none, some } from 'fp-ts/es6/Option'
import type { Option } from 'fp-ts/es6/Option'

interface SpritePackage {
  readonly id: string,
  sprite: Sprite
}

export interface SpriteService {
  getSpriteByName: (name: string) => Option<Readonly<Sprite>>
  getSpritesByName: (name: string, amount: number) => Option<Array<Readonly<Sprite>>>
  getSpriteAmountByName: (name: string) => number
  addSpriteByName: (name: string, sprite: Sprite) => void
  addSpritesByName: (name: string, sprites: Array<Sprite>) => void
}

class SpriteServiceConcrete implements SpriteService {
  private _spritePackages: Map<string, Array<SpritePackage>> = new Map<string, Array<SpritePackage>>()

  private _hasThisSprite(name: string): boolean {
    return this._spritePackages.has(name)
  }

  private _removeSpritePackage(name: string, id: string): void {
    const spritePackages = this._spritePackages.get(name)
    if (!spritePackages) return
    const spritePackageIndex = spritePackages.findIndex(pkg => pkg.id === id)
    if (!spritePackageIndex) throw new Error(`sprite ${id} not found`)
    this._spritePackages.get(name)!.splice(spritePackageIndex, 1)
  }

  private _removeSpritePackages(name: string, amount: number): Array<SpritePackage> | null {
    const spritePackages = this._spritePackages.get(name)
    if (!spritePackages) return null
    return this._spritePackages.get(name)!.splice(0, amount)
  }

  public addSpriteByName(name: string, sprite: Sprite): void {
    const id = getUid()
    const spritePackage: SpritePackage = { id, sprite }
    if (!this._hasThisSprite(name)) {
      this._spritePackages.set(name, [spritePackage])
      return
    }
    this._spritePackages.get(name)!.push(spritePackage)
  }

  public addSpritesByName(name: string, sprites: Array<Sprite>): void {
    const spritePackages = ((_sprites: Array<Sprite>): Array<SpritePackage> => {
      const packages: Array<SpritePackage> = []
      for (const sprite of _sprites) {
        const id = getUid()
        const spritePackage: SpritePackage = { id, sprite }
        packages.push(spritePackage)
      }
      return packages
    })(sprites)
    if (!this._hasThisSprite(name)) {
      this._spritePackages.set(name, spritePackages)
      return
    }
    this._spritePackages.get(name)!.push(...spritePackages)
  }

  public getSpriteAmountByName(name: string): number {
    if (!this._hasThisSprite(name)) return 0
    return this._spritePackages.get(name)!.length
  }

  public getSpriteByName(name: string): Option<Readonly<Sprite>> {
    if (!this._hasThisSprite(name)) return none
    const spritePackage = this._spritePackages.get(name)![0]
    if (!spritePackage) throw new Error(`sprite ${name} not found`)
    this._removeSpritePackage(name, spritePackage.id)
    return some(spritePackage.sprite)
  }

  public getSpritesByName(name: string, amount: number): Option<Array<Readonly<Sprite>>> {
    if (!this._hasThisSprite(name)) return none
    const realAmount = this.getSpriteAmountByName(name)
    if (realAmount < amount) throw new Error(`sprites amount in store ${realAmount} < ${amount}`)
    const spritePackages = this._removeSpritePackages(name, amount)
    if (!spritePackages) throw new Error(`sprites ${name} can not be removed`)
    const sprites: Array<Sprite> = []
    for (const spritePackage of spritePackages) sprites.push(spritePackage.sprite)
    return some(sprites)
  }
}

export const createSpriteService = (): SpriteService => {
  return new SpriteServiceConcrete()
}