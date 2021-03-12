import Heap from './heap';

export default class MaxHeap<T> extends Heap<T> {
    public pairIsInCorrectOrder(firstElement: any, secondElement: any) {
        return this.compare.greaterThanOrEqual(firstElement, secondElement);
    }
}