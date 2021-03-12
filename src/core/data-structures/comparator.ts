export default class Comparator {
    private compare!: Function

    constructor(compareFunction?: Function) {
        this.compare = compareFunction || Comparator.defaultCompareFunction;
    }

    public static defaultCompareFunction(a: any, b: any): 0 | 1 | -1 {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    }

    public equal(a: any, b: any): boolean {
        return this.compare(a, b) === 0;
    }

    public lessThan(a: any, b: any): boolean {
        return this.compare(a, b) < 0;
    }

    public greaterThan(a: any, b: any): boolean {
        return this.compare(a, b) > 0;
    }

    public lessThanOrEqual(a: any, b: any): boolean {
        return this.lessThan(a, b) || this.equal(a, b);
    }

    public greaterThanOrEqual(a: any, b: any): boolean {
        return this.greaterThan(a, b) || this.equal(a, b);
    }

    public reverse(): void {
        const compareOriginal = this.compare;
        this.compare = (a: any, b: any) => compareOriginal(b, a);
    }
}