import Comparator from './comparator';

export default class Heap<T extends Object> {
    protected compare!: Comparator
    private readonly heapContainer!: Array<T>

    constructor(comparatorFunction?: Function) {
        if (new.target === Heap) {
            throw new TypeError('Cannot construct Heap instance directly');
        }

        this.heapContainer = [];
        this.compare = new Comparator(comparatorFunction);
    }


    public getLeftChildIndex(parentIndex: number): number {
        return (2 * parentIndex) + 1;
    }

    public getRightChildIndex(parentIndex: number): number {
        return (2 * parentIndex) + 2;
    }

    public getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    public hasParent(childIndex: number): boolean {
        return this.getParentIndex(childIndex) >= 0;
    }

    public hasLeftChild(parentIndex: number): boolean {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    }

    public hasRightChild(parentIndex: number): boolean {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    }

    public leftChild(parentIndex: number): T {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)];
    }

    public rightChild(parentIndex: number): T {
        return this.heapContainer[this.getRightChildIndex(parentIndex)];
    }

    public parent(childIndex: number): T {
        return this.heapContainer[this.getParentIndex(childIndex)];
    }

    public swap(indexOne: number, indexTwo: number): void {
        const tmp = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = tmp;
    }

    public peek(): T | null {
        if (this.heapContainer.length === 0) {
            return null;
        }

        return this.heapContainer[0];
    }

    public poll(): T | null {
        if (this.heapContainer.length === 0) {
            return null;
        }

        if (this.heapContainer.length === 1) {
            return this.heapContainer.pop()!;
        }

        const item = this.heapContainer[0];

        this.heapContainer[0] = this.heapContainer.pop()!;
        this.heapifyDown();

        return item;
    }

    public add(item: T): Heap<T> {
        this.heapContainer.push(item);
        this.heapifyUp();
        return this;
    }

    public remove(item: T, comparator: Comparator = this.compare): Heap<T> {
        const numberOfItemsToRemove = this.find(item, comparator).length;

        for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
            const indexToRemove = Number(this.find(item, comparator).pop());
            if (indexToRemove === (this.heapContainer.length - 1)) {
                this.heapContainer.pop();
            } else {
                this.heapContainer[indexToRemove] = this.heapContainer.pop()!;

                const parentItem = this.parent(indexToRemove);

                if (
                    this.hasLeftChild(indexToRemove)
                    && (
                        !parentItem
                        || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove])
                    )
                ) {
                    this.heapifyDown(indexToRemove);
                } else {
                    this.heapifyUp(indexToRemove);
                }
            }
        }

        return this;
    }

    public find(item: T, comparator: Comparator = this.compare): Array<number> {
        const foundItemIndices = [];

        for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
            if (comparator.equal(item, this.heapContainer[itemIndex])) {
                foundItemIndices.push(itemIndex);
            }
        }

        return foundItemIndices;
    }

    public isEmpty(): boolean {
        return !this.heapContainer.length;
    }

    public toString(): string {
        return this.heapContainer.toString();
    }

    public heapifyUp(customStartIndex?: number): void {
        let currentIndex = customStartIndex || this.heapContainer.length - 1;

        while (
            this.hasParent(currentIndex)
            && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
            ) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    public heapifyDown(customStartIndex = 0): void {
        let currentIndex = customStartIndex;
        let nextIndex = null;

        while (this.hasLeftChild(currentIndex)) {
            if (
                this.hasRightChild(currentIndex)
                && this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
            ) {
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }

            if (this.pairIsInCorrectOrder(
                this.heapContainer[currentIndex],
                this.heapContainer[nextIndex]
            )) {
                break;
            }

            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }

    public pairIsInCorrectOrder(firstElement: T, secondElement: T): boolean {
        throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondElement} values.
    `);
    }

    public clear(): void {
        this.heapContainer.length = 0;
    }
}