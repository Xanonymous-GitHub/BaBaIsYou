import {RuleScanner} from '@/core/utils/ruleScanner';

export interface ScannerService {
    setScanner: (scanner: RuleScanner) => void
    getScanner: () => RuleScanner
}

class ScannerServiceConcrete implements ScannerService {
    private _scanner!: RuleScanner

    public getScanner(): RuleScanner {
        return this._scanner;
    }

    public setScanner(scanner: RuleScanner): void {
        this._scanner = scanner;
    }
}

export const createScannerService = (): ScannerService => {
    return new ScannerServiceConcrete()
}