import Heap from './heap'

export default class MinHeap<T> extends Heap<T> {
  public pairIsInCorrectOrder(firstElement: any, secondElement: any): boolean {
    return this.compare.lessThanOrEqual(firstElement, secondElement)
  }
}