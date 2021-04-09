import {SingleInstruction} from './';

export class MoveUp extends SingleInstruction {
    public async perform() {
        await this._subject.moveUp()
    }
}

export class MoveDown extends SingleInstruction {
    public async perform() {
        await this._subject.moveDown()
    }
}

export class MoveLeft extends SingleInstruction {
    public async perform() {
        await this._subject.moveLeft()
    }
}

export class MoveRight extends SingleInstruction {
    public async perform() {
        await this._subject.moveRight()
    }
}
