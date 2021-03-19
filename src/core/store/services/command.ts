import PriorityQueue from '../../data-structures/priorityQueue';
import {MAX_COMMAND_AMOUNT, COMMAND_MIN_INTERVAL} from '../../app/configs';
import {debounce} from '../../utils/debouncer';
import mousetrap from 'mousetrap'
import {none, Option, some} from 'fp-ts/es6/Option';

export enum CommandType {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
    ESC = 'esc',
}

export interface Command {
    readonly value: CommandType
}

export interface CommandPackage {
    priority: number,
    command: Command
}

export interface CommandService {
    nextCommand: () => Option<Readonly<Command>>
    addCommand: (command: Command) => void
    clearCommand: () => void
    initCommandWatchService: () => void
}

const commandPackages: Array<CommandPackage> = [
    {
        command: {
            value: CommandType.ESC
        },
        priority: 0
    },
    {
        command: {
            value: CommandType.UP
        },
        priority: 1
    },
    {
        command: {
            value: CommandType.DOWN
        },
        priority: 1
    },
    {
        command: {
            value: CommandType.LEFT
        },
        priority: 1
    },
    {
        command: {
            value: CommandType.RIGHT
        },
        priority: 1
    }
]

const createCommandPrioritiesMap = (): Map<Command, number> => {
    const commandPrioritiesMap: Map<Command, number> = new Map<Command, number>()
    for (const commandPackage of commandPackages) {
        commandPrioritiesMap.set(commandPackage.command, commandPackage.priority)
    }

    return commandPrioritiesMap
}

class CommandServiceConcrete implements CommandService {
    private readonly _commandPackages: PriorityQueue<CommandPackage> = new PriorityQueue<CommandPackage>()
    private readonly _commandPrioritiesMap: Map<Command, number> = createCommandPrioritiesMap()

    private _judgementCommandPriority(command: Command): number {
        const priority = this._commandPrioritiesMap.get(command)
        if (typeof priority === 'undefined' || priority === undefined) throw new Error(`this command ${command} is not have any priority defined`)
        if (priority === 0) return priority
        return Date.now()
    }

    private get _size(): number {
        return this._commandPackages.size()
    }

    public addCommand(command: Command): void {
        if (this._size < MAX_COMMAND_AMOUNT) {
            debounce(() => {
                const priority = this._judgementCommandPriority(command)
                this._commandPackages.add({
                    command,
                    priority
                }, priority)
            }, COMMAND_MIN_INTERVAL)()
        }
    }

    public clearCommand(): void {
        this._commandPackages.clear()
    }

    public nextCommand(): Option<Readonly<Command>> {
        const commandPackage = this._commandPackages.poll()
        if (!commandPackage) return none
        return some(commandPackage.command)
    }

    public initCommandWatchService(): void {
        for (const commandPackage of commandPackages) {
            mousetrap.bind(commandPackage.command.value, () => this.addCommand(commandPackage.command))
        }
    }
}

export const createCommandService = (): CommandService => {
    return new CommandServiceConcrete()
}