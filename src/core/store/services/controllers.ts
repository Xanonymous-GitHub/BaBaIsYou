import { InstructionDispatchServer } from '@/core/controllers/dispatcher'
import { RuleController } from '@/core/controllers/rule'
import { MapController } from '@/core/controllers/map'
import { Edge } from '@/core/store/services/screen'

export interface ControllerService {
  setDispatchServer: (server: InstructionDispatchServer) => void
  getDispatchServer: () => InstructionDispatchServer
  initDispatchServer: () => void
  disposeDispatchServer: () => void
  setRuleController: (controller: RuleController) => void
  setMapController: (controller: MapController) => void
  getRuleController: () => RuleController
  getMapController: () => MapController
  changeMapSize: (edge: Edge) => void
}

class ControllerServiceConcrete implements ControllerService {
  private _dispatchServer!: InstructionDispatchServer
  private _ruleController!: RuleController
  private _mapController!: MapController

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

  public getMapController() {
    return this._mapController
  }

  public setRuleController(ruleController: RuleController) {
    this._ruleController = ruleController
  }

  public setMapController(mapController: MapController) {
    this._mapController = mapController
  }

  public changeMapSize(edge: Edge) {
    this._mapController.changeMapSize(edge)
  }
}

export const createControllerService = (): ControllerService => {
  return new ControllerServiceConcrete()
}