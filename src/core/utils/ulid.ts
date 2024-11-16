import { ulid } from "ulidx"

export const getUid = (): string => {
  return ulid()
}