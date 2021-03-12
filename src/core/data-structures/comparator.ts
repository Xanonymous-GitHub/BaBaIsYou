export default class Comparator {
    private compare!: Function

    constructor(compareFunction?: Function) {
        this.compare = compareFunction || Comparator.defaultCompareFunction;
    }

    public static defaultCompareFunction(a: any, b: any) {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    }

    public equal(a: any, b: any) {
        return this.compare(a, b) === 0;
    }

    public lessThan(a: any, b: any) {
        return this.compare(a, b) < 0;
    }

    public greaterThan(a: any, b: any) {
        return this.compare(a, b) > 0;
    }

    public lessThanOrEqual(a: any, b: any) {
        return this.lessThan(a, b) || this.equal(a, b);
    }

    public greaterThanOrEqual(a: any, b: any) {
        return this.greaterThan(a, b) || this.equal(a, b);
    }

    public reverse() {
        const compareOriginal = this.compare;
        this.compare = (a: any, b: any) => compareOriginal(b, a);
    }
}