import { defaultAppHeight, defaultAppWidth } from '@/core/app/configs'
import { Edge, ScreenSize } from '@/core/store/services/screen'

let appEdgeX = 0, appEdgeY = 0, screenWidth = 0, screenHeight = 0, blockSize = 0
const stageEdgePercentage = 5 // unit: % in single side.

export const getBlockSize = (edge?: Edge, screenSize?: ScreenSize): number => {
  if (edge && screenSize) {
    appEdgeX = edge.maxX
    appEdgeY = edge.maxY
    screenWidth = screenSize.width
    screenHeight = screenSize.height

    if (screenWidth > screenHeight) {
      // horizontal
      blockSize = screenHeight * ((100 - stageEdgePercentage) / 100) / (appEdgeY + 1)
    } else {
      // vertical
      blockSize = screenWidth * ((100 - stageEdgePercentage) / 100) / (appEdgeX + 1)
    }
  }

  return blockSize
}

export const getMaxHorizontalPoint = () => {
  const blockSize = getBlockSize()
  return Math.floor(defaultAppWidth / blockSize) - 1
}

export const getMaxVerticalPoint = () => {
  const blockSize = getBlockSize()
  return Math.floor(defaultAppHeight / blockSize) - 1
}
