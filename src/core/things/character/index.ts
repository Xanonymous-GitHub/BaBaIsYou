import {Thing} from '@/core/things';

class Character extends Thing {
  moveDown(): Promise<void> {
    return Promise.resolve(undefined);
  }
  
  moveLeft(): Promise<void> {
    return Promise.resolve(undefined);
  }
  
  moveRight(): Promise<void> {
    return Promise.resolve(undefined);
  }
  
  moveUp(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
