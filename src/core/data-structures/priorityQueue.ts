import MinHeap from './minHeap';
import Comparator from './comparator';

export default class PriorityQueue extends MinHeap {
    private readonly priorities!: Map<any, any>;

    constructor() {
        super();
        this.priorities = new Map<any, any>();
        this.compare = new Comparator(this.comparePriority.bind(this));
    }

    public add(item: any, priority: number = 0): PriorityQueue {
        this.priorities.set(item, priority);
        super.add(item);
        return this;
    }

    public remove(item: any, customFindingComparator: Comparator): PriorityQueue {
        super.remove(item, customFindingComparator);
        this.priorities.delete(item);
        return this;
    }

    public changePriority(item: any, priority: number): PriorityQueue {
        this.remove(item, new Comparator(this.compareValue));
        this.add(item, priority);
        return this;
    }

    public findByValue(item: any): Array<number> {
        return this.find(item, new Comparator(this.compareValue));
    }

    public hasValue(item: any): boolean {
        return this.findByValue(item).length > 0;
    }

    public comparePriority(a: any, b: any): number {
        if (this.priorities.get(a) === this.priorities.get(b)) {
            return 0;
        }
        return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
    }

    public compareValue(a: any, b: any): number {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    }
}