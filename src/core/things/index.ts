import type { Texture } from 'pixi.js'
import { AnimatedSprite } from 'pixi.js'
import type { ThingSetup } from '@/core/types/things'
import { Direction } from '@/core/types/things'
import { getUid } from '@/core/utils/ulid'
import type { Species } from '@/core/resource'
import { generalHandleEncounterMixin } from '@/core/things/_mixins/handleEncounter'
import { Easing, Tween } from '@tweenjs/tween.js'
import { THING_MOVE_DURATION } from '@/core/app/configs'
import type { ThingController } from '@/core/controllers/thing'
import { reverseDirection } from '@/core/utils/direction'

export class Thing extends AnimatedSprite {
  private readonly _id: string
  private readonly _species: Species
  private _blockX: number // start from 0
  private _blockY: number // start from 0
  private readonly _maxBlockX: number
  private readonly _maxBlockY: number
  private readonly _blockSize: number
  private _towards: Direction
  public thingController!: ThingController

  constructor(
    name: string,
    species: Species,
    textures: Array<Texture>,
    defaultBlockX: number,
    defaultBlockY: number,
    blockSize: number,
    maxBlockX: number,
    maxBlockY: number,
    defaultTowards?: Direction
  ) {
    // provide the texture to the sprite.
    super(textures)

    // set uid
    this._id = getUid()

    // set name
    this.label = name

    // set species
    this._species = species

    // setup default positions.
    this._blockX = defaultBlockX
    this._blockY = defaultBlockY

    // setup maximum block point on a map.
    this._maxBlockX = maxBlockX
    this._maxBlockY = maxBlockY

    // setup default sprite towards.
    this._towards = defaultTowards ?? 0
    this.updateTowards(this._towards)

    // setup block size.
    this._blockSize = blockSize
    this.height = blockSize
    this.width = blockSize

    // center the sprite's anchor point.
    this.anchor.set(0.5)

    // move to the point
    this.x = (this._blockX + 0.5) * this._blockSize
    this.y = (this._blockY + 0.5) * this._blockSize

    this.animationSpeed = 0.08
    super.play()
  }

  public bindThingController(thingController: ThingController): void {
    this.thingController = thingController
  }

  public setup(options: Pick<ThingSetup, 'defaultBlockX' | 'defaultBlockY' | 'defaultTowards'>) {
    this.blockX = options.defaultBlockX
    this.blockY = options.defaultBlockY
    this.updateTowards(options.defaultTowards)
  }

  public get blockX(): number {
    return Number(this._blockX)
  }

  public set blockX(x: number) {
    this._blockX = x
    const currentX = { x: this.x }
    const finalX = { x: (x + 0.5) * this._blockSize }

    let animationId = 0

    const tween = new Tween(currentX).to(finalX, THING_MOVE_DURATION)
      .onUpdate(() => this.x = currentX.x)
      .easing(Easing.Quadratic.Out)
      .onComplete(() => cancelAnimationFrame(animationId))
      .start()

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate)
      tween.update(time)
    }

    animationId = requestAnimationFrame(animate)
  }

  public get blockY(): number {
    return Number(this._blockY)
  }

  public set blockY(y: number) {
    this._blockY = y
    const currentY = { y: this.y }
    const finalY = { y: (y + 0.5) * this._blockSize }

    let animationId = 0

    const tween = new Tween(currentY).to(finalY, THING_MOVE_DURATION)
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => this.y = currentY.y)
      .onComplete(() => cancelAnimationFrame(animationId))
      .start()

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate)
      tween.update(time)
    }

    animationId = requestAnimationFrame(animate)
  }

  public get thingName(): string {
    return this.label
  }

  public set thingName(newName: string) {
    this.label = newName
  }

  public updateTowards(side: Direction) {
    switch (side) {
      case Direction.LEFT:
        this.scale.x = -1 * Math.abs(this.scale.x)
        break
      case Direction.RIGHT:
        this.scale.x = Math.abs(this.scale.x)
        break
    }
    this.towards = side
  }

  public set towards(side: Direction) {
    this._towards = side
  }

  public get towards(): Direction {
    return this._towards
  }

  public get id(): string {
    return this._id
  }

  public get species(): Readonly<Species> {
    return this._species
  }

  public atRightEdge(): boolean {
    return this.blockX === this._maxBlockX
  }

  public atLeftEdge(): boolean {
    return this.blockX === 0
  }

  public atTopEdge(): boolean {
    return this.blockY === 0
  }

  public atBottomEdge(): boolean {
    return this.blockY === this._maxBlockY
  }

  public async moveUp(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this.atTopEdge()) {
        reject()
      } else {
        this.blockY--
      }
      resolve()
    })
  }

  public async moveDown(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this.atBottomEdge()) {
        reject()
      } else {
        this.blockY++
      }
      resolve()
    })
  }

  public async moveRight(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this.atRightEdge()) {
        reject()
      } else {
        this.blockX++
      }
      resolve()
    })
  }

  public async moveLeft(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this.atLeftEdge()) {
        reject()
      } else {
        this.blockX--
      }
      resolve()
    })
  }

  public async reverseTowards(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this.towards === Direction.UNDEFINED) {
        reject()
      } else {
        this.updateTowards(reverseDirection(this.towards))
        resolve()
      }
    })
  }

  public handleBeside(_: Thing, __: Direction): Promise<void> {
    return Promise.resolve(undefined)
  }

  public async handleEncounter(visitor: Thing, visitorFrom: Direction): Promise<boolean> {
    return await generalHandleEncounterMixin(this, visitor, visitorFrom, this.thingController)
  }

  public handleLeave(_: Thing, __: Direction): Promise<void> {
    return Promise.resolve(undefined)
  }
}
