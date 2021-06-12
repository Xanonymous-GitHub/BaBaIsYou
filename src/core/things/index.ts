import { Sprite, Texture } from 'pixi.js'
import { Direction, ThingSetup } from '@/core/types/things'
import { getUid } from '@/core/utils/uuid'
import { Species } from '@/core/resource'
import { none, Option } from 'fp-ts/es6/Option'
import { generalHandleEncounterMixin } from '@/core/things/_mixins/handleEncounter'
import { ThingController } from '@/core/controllers/thing'

export class Thing extends Sprite {
  private readonly _id: string
  private readonly _species: Species
  private _blockX: number // start from 0
  private _blockY: number // start from 0
  private readonly _maxBlockX: number
  private readonly _maxBlockY: number
  private readonly _blockSize: number
  private _towards: Direction
  protected _thingController!: ThingController
  private _horizontalPatternId!: Option<string>
  private _verticalPatternId!: Option<string>

  constructor(
    name: string,
    species: Species,
    texture: Texture,
    defaultBlockX: number,
    defaultBlockY: number,
    blockSize: number,
    maxBlockX: number,
    maxBlockY: number,
    defaultTowards?: Direction
  ) {
    // provide the texture to the sprite.
    super(texture)

    // set uid
    this._id = getUid()

    // set name
    this.name = name

    // set species
    this._species = species

    // setup default positions.
    this._blockX = defaultBlockX
    this._blockY = defaultBlockY

    // setup maximum block point on map.
    this._maxBlockX = maxBlockX
    this._maxBlockY = maxBlockY

    // setup default sprite towards.
    this._towards = defaultTowards ?? 0

    // setup block size.
    this._blockSize = blockSize
    this.height = blockSize
    this.width = blockSize

    // center the sprite's anchor point.
    this.anchor.set(0.5)

    // move to the point
    this.x = (this._blockX + 0.5) * this._blockSize
    this.y = (this._blockY + 0.5) * this._blockSize

    // init patter ids (for operators)
    this._horizontalPatternId = none
    this._verticalPatternId = none
  }

  public bindThingController(thingController: ThingController): void {
    this._thingController = thingController
  }

  public setup(options: Pick<ThingSetup, 'defaultBlockX' | 'defaultBlockY' | 'defaultTowards'>) {
    this.blockX = options.defaultBlockX
    this.blockY = options.defaultBlockY
    this.towards = options.defaultTowards
  }

  public get blockX(): number {
    return Number(this._blockX)
  }

  public set blockX(x: number) {
    this._blockX = x
    this.x = (x + 0.5) * this._blockSize
  }

  public get blockY(): number {
    return Number(this._blockY)
  }

  public set blockY(y: number) {
    this._blockY = y
    this.y = (y + 0.5) * this._blockSize
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

  public handleBeside(visitor: Thing, visitorBeside: Direction): Promise<void> {
    return Promise.resolve(undefined)
  }

  public async handleEncounter(visitor: Thing, visitorFrom: Direction): Promise<boolean> {
    return await generalHandleEncounterMixin(this, visitor, visitorFrom, this._thingController)
  }

  public handleLeave(visitor: Thing, visitorLeavesFrom: Direction): Promise<void> {
    return Promise.resolve(undefined)
  }
}
