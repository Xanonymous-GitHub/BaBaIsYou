import {ThingCommandDispatchServer} from '../../observer';

export interface DispatchServerService {
    setDispatchServer: (server: ThingCommandDispatchServer) => void
    getDispatchServer: () => ThingCommandDispatchServer
    initDispatchServer: () => void
    disposeDispatchServer: () => void
}

class DispatchServerServiceConcrete implements DispatchServerService {
    private _dispatchServer!: ThingCommandDispatchServer

    public getDispatchServer(): ThingCommandDispatchServer {
        return this._dispatchServer
    }

    public setDispatchServer(dispatchServer: ThingCommandDispatchServer): void {
        this._dispatchServer = dispatchServer
    }

    public initDispatchServer() {
        this._dispatchServer.enableService()
    }

    public disposeDispatchServer() {
        this._dispatchServer.disableService()
    }
}

export const createDispatchServerService = (): DispatchServerService => {
    return new DispatchServerServiceConcrete()
}