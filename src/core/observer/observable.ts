import {Observer} from './observer';

export interface Observable {
    addObserver: (observer: Observer) => void
    deleteObserver: (observer: Observer) => void
    notifyObservers: (...args: any[]) => void
    deleteObservers: () => void
    setChanged: () => void
    clearChanged: () => void
    hasChanged: () => boolean
    countObservers: () => number
}

export class ObservableSubject implements Observable {
    private _changed = false
    private _observers: Array<Observer>

    constructor() {
        this._observers = new Array<Observer>()
    }

    public addObserver(observer: Observer): void {
        if (!observer) throw new Error(`observer is ${typeof observer}`)
        const alreadyObserved = this._observers.includes(observer)
        if (!alreadyObserved) this._observers.push(observer)
    }

    public clearChanged(): void {
        this._changed = false
    }

    public countObservers(): number {
        return this._observers.length
    }

    public deleteObserver(observer: Observer): void {
        const indexToRemove = this._observers.findIndex(_observer => _observer.observeId === observer.observeId)
        if (indexToRemove !== -1) this._observers.splice(indexToRemove, 1)
    }

    public deleteObservers(): void {
        while (this._observers.length) {
            this._observers.pop()
        }
        this._observers.length = 0
    }

    public hasChanged(): boolean {
        return this._changed
    }

    public notifyObservers(...args: any[]): void {
        let observers: Array<Observer> = []

        if (this.hasChanged()) {
            observers = this._observers.slice()
            this.clearChanged()
        }

        for (let i = observers.length - 1; i >= 0; i--) {
            observers[i].update(this, args)
        }
    }

    public setChanged(): void {
        this._changed = true
    }
}