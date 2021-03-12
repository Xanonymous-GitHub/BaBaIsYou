import Heap from './heap';

export default class MinHeap extends Heap {
    public pairIsInCorrectOrder(firstElement: any, secondElement: any) {
        return this.compare.lessThanOrEqual(firstElement, secondElement);
    }
}