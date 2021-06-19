import type { Observable } from './observable'

export interface Observer {
  update: (subject: Observable, ...args: any[]) => Promise<void>
  observeId: string
}