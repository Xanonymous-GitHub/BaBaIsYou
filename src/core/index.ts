import * as PIXI from 'pixi.js'

const app = new PIXI.Application({
  powerPreference: 'high-performance',
  width: 1280,
  height: 720
})

export default app.view
