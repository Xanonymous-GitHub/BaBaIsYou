import {ThingCommandDispatchServer} from '../../observer';
import {RuleController} from '../../observer/rule';

export interface DispatchServerService {
    setDispatchServer: (server: ThingCommandDispatchServer) => void
    getDispatchServer: () => ThingCommandDispatchServer
    initDispatchServer: () => void
    disposeDispatchServer: () => void
    setRuleController: (controller: RuleController) => void
    getRuleController: () => RuleController
}

class DispatchServerServiceConcrete implements DispatchServerService {
    private _dispatchServer!: ThingCommandDispatchServer
    private _ruleController!: RuleController

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

    public getRuleController() {
        return this._ruleController
    }

    public setRuleController(ruleController: RuleController) {
        this._ruleController = ruleController
    }
}

export const createDispatchServerService = (): DispatchServerService => {
    return new DispatchServerServiceConcrete()
}