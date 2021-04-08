import {InstructionDispatchServer} from '../../observer';
import {RuleController} from '../../observer/rule';

export interface DispatchServerService {
    setDispatchServer: (server: InstructionDispatchServer) => void
    getDispatchServer: () => InstructionDispatchServer
    initDispatchServer: () => void
    disposeDispatchServer: () => void
    setRuleController: (controller: RuleController) => void
    getRuleController: () => RuleController
}

class DispatchServerServiceConcrete implements DispatchServerService {
    private _dispatchServer!: InstructionDispatchServer
    private _ruleController!: RuleController

    public getDispatchServer(): InstructionDispatchServer {
        return this._dispatchServer
    }

    public setDispatchServer(dispatchServer: InstructionDispatchServer): void {
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