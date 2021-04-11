import {RawInstruction} from './';

export class MoveUpInstruction extends RawInstruction {
    public async perform() {
        await this._subject.moveUp()
    }
}

export class MoveDownInstruction extends RawInstruction {
    public async perform() {
        await this._subject.moveDown()
    }
}

export class MoveLeftInstruction extends RawInstruction {
    public async perform() {
        await this._subject.moveLeft()
    }
}

export class MoveRightInstruction extends RawInstruction {
    public async perform() {
        await this._subject.moveRight()
    }
}
