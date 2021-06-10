import { v4 as uuidv4 } from 'uuid'

export const getUid = (): string => {
  return uuidv4()
}