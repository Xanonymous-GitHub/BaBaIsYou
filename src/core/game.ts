import { store } from '@/core/index'
import { getSceneSetup } from '@/core/resource/sceneSetup'

export const startLevel = async (setupFileName: string) => {
  // get references.
  const stageBuilder = store.getStageBuilder()

  // fetch sceneSetup.
  const sceneSetup = await getSceneSetup(setupFileName)

  // build the scene.
  await stageBuilder.addGameScene(sceneSetup)

  // start command dispatcher.
  store.initDispatchServer()

  // start listen keyboard event
  store.initCommandWatchService()
}