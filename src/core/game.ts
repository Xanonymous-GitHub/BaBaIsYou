import { store } from '@/core'
import { getSceneSetup } from '@/core/resource/sceneSetup'
import { GameResult } from '@/core/types'

export const startLevel = async (setupFileName: string) => {
  const stageBuilder = store.getStageBuilder()

  // stop command listen service.
  store.disposeDispatchServer()

  // remove container on stage.
  await stageBuilder.removeScene()

  // fetch sceneSetup.
  const sceneSetup = await getSceneSetup(setupFileName)

  // build the scene.
  await stageBuilder.addGameScene(sceneSetup)

  // start command dispatcher.
  store.initDispatchServer()

  // start listen keyboard event
  store.initCommandWatchService()
}

export let gameOver: ((gameResult: GameResult) => Promise<void>) | undefined

export const setGameOverOutsideHandler = (outsideHandler: (gameResult: GameResult) => Promise<void>) => {
  gameOver = async (gameResult: GameResult) => {
    const stageBuilder = store.getStageBuilder()

    // stop command listen service.
    store.disposeDispatchServer()

    // wait a little time to perform an import event feeling. (?
    await new Promise<void>(resolve => setTimeout(() => resolve(), 300))

    // call outside layer.
    await outsideHandler(gameResult)

    // remove container on stage.
    await stageBuilder.removeScene()
  }
}