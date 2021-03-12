import {v5 as uuidV5} from 'uuid'

export const getUid = (): string => {
    return uuidV5()
}