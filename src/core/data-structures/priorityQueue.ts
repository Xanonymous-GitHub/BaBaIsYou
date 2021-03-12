import MaxHeap from './maxHeap';
import Comparator from './comparator';

export default class PriorityQueue<T> extends MaxHeap<T> {
    private readonly priorities!: Map<T, number>;

    constructor() {
        super();
        this.priorities = new Map<T, number>();
        this.compare = new Comparator(this.comparePriority.bind(this));
    }

    public add(item: T, priority: number = 0): PriorityQueue<T> {
        this.priorities.set(item, priority);
        super.add(item);
        return this;
    }

    public remove(item: T, customFindingComparator: Comparator): PriorityQueue<T> {
        super.remove(item, customFindingComparator);
        this.priorities.delete(item);
        return this;
    }

    public changePriority(item: T, priority: number): PriorityQueue<T> {
        this.remove(item, new Comparator(this.compareValue));
        this.add(item, priority);
        return this;
    }

    public findByValue(item: T): Array<number> {
        return this.find(item, new Comparator(this.compareValue));
    }

    public hasValue(item: T): boolean {
        return this.findByValue(item).length > 0;
    }

    public comparePriority(a: T, b: T): number {
        if (this.priorities.get(a) === this.priorities.get(b)) {
            return 0;
        }
        return Number(this.priorities.get(a)) < Number(this.priorities.get(b)) ? -1 : 1;
    }

    public compareValue(a: any, b: any): number {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    }

    public size(): number {
        return this.priorities.size
    }
}