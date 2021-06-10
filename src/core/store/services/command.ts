import PriorityQueue from '@/core/data-structures/priorityQueue';
import {COMMAND_MIN_INTERVAL, MAX_COMMAND_AMOUNT} from '@/core/app/configs';
import {debounce} from '@/core/utils/debouncer';
import mousetrap from 'mousetrap'
import {isSome, none, Option, some} from 'fp-ts/es6/Option';
import {Service} from './';
import {Channel, createChannel} from '@/core/store/channel';
import {Command, CommandPackage, CommandType} from '@/core/store/types';

export interface CommandService extends Service {
    startCommandWatchService: () => void
    stopCommandWatchService: () => void
    commandChannel: Channel<Command>
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
    private _commandPackages!: PriorityQueue<CommandPackage>
    private _commandPrioritiesMap!: Map<Command, number>
    private _runningCommand!: boolean
    private _isActive!: boolean

    public commandChannel!: Channel<Command>

    public async init(): Promise<void> {
        this._commandPackages = new PriorityQueue<CommandPackage>()
        this._commandPrioritiesMap = createCommandPrioritiesMap()
        this._runningCommand = false
        this._isActive = false
        this.commandChannel = createChannel<Command>()
    }

    private _judgementCommandPriority(command: Command): number {
        const priority = this._commandPrioritiesMap.get(command)
        if (typeof priority === 'undefined' || priority === undefined) throw new Error(`this command ${command} is not have any priority defined`)
        if (priority === 0) return priority
        return Date.now()
    }

    private get _size(): number {
        return this._commandPackages.size()
    }

    private _addCommand(command: Command): void {
        if (this._size < MAX_COMMAND_AMOUNT) {
            debounce(() => {
                const priority = this._judgementCommandPriority(command)
                this._commandPackages.add({
                    command,
                    priority
                }, priority)
                this._digestCommand().then()
            }, COMMAND_MIN_INTERVAL)()
        }
    }

    private _clearCommand(): void {
        this._commandPackages.clear()
    }

    private _nextCommand(): Option<Readonly<Command>> {
        const commandPackage = this._commandPackages.poll()
        if (!commandPackage) return none
        return some(commandPackage.command)
    }

    public startCommandWatchService(): void {
        for (const commandPackage of commandPackages) {
            mousetrap.bind(commandPackage.command.value, () => this._addCommand(commandPackage.command))
        }
    }

    public stopCommandWatchService(): void {
        this._isActive = false
        this._clearCommand()
    }

    private async _digestCommand(): Promise<void> {
        if (!this._isActive || this._runningCommand) return
        this._runningCommand = true
        let nextCommand = this._nextCommand()
        while (isSome(nextCommand)) {
            await this.commandChannel.send(nextCommand.value)
            nextCommand = this._nextCommand()
        }
        this._runningCommand = false
    }
}

export const createCommandService = (): CommandService => {
    return new CommandServiceConcrete()
}