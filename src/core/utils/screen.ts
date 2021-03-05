import {appHeight, appWidth} from "../configs";

export const getBlockSize = (): number => {
  return 36 // TODO add block size detection in RWD system.
}

export const getMaxHorizontalPoint = () => {
  const blockSize = getBlockSize()
  return Math.floor(appWidth / blockSize) - 1
}

export const getMaxVerticalPoint = () => {
  const blockSize = getBlockSize()
  return Math.floor(appHeight / blockSize) - 1
}
