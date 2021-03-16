import {Observable} from './observable';

export interface Observer {
    update: (subject: Observable, ...args: any[]) => void
    observeId: string
}