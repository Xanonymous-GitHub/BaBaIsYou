import PriorityQueue from "../../data-structures/priorityQueue";

export interface Command {
    readonly value: string
}

export interface CommandPackage {
    priority: number,
    command: Command
}

export interface CommandService {
    nextCommand: () => Readonly<Command> | null
    addCommand: (command: Command) => void
    clearCommand: () => void
    initCommandWatchService: () => void
}

const commandPackages: Array<CommandPackage> = [
    {
        command: {
            value: 'esc'
        },
        priority: 0
    },
    {
        command: {
            value: 'up'
        },
        priority: 1
    },
    {
        command: {
            value: 'DOWN'
        },
        priority: 1
    },
    {
        command: {
            value: 'left'
        },
        priority: 1
    },
    {
        command: {
            value: 'right'
        },
        priority: 1
    },
]

const createCommandPrioritiesMap = (): Map<Command, number> => {
    const commandPrioritiesMap: Map<Command, number> = new Map<Command, number>()
    for (const commandPackage of commandPackages) {
        commandPrioritiesMap.set(commandPackage.command, commandPackage.priority)
    }

    return commandPrioritiesMap
}

class CommandServiceConcrete implements CommandService {
    private readonly _commands: PriorityQueue<Command> = new PriorityQueue<Command>()
    private readonly _commandPrioritiesMap: Map<Command, number> = createCommandPrioritiesMap()

    private _judgementCommandPriority(command: Command): number {
        const priority = this._commandPrioritiesMap.get(command)
        if (typeof priority === 'undefined' || priority === undefined) throw new Error(`this command ${command} is not have any priority defined`)
        return priority
    }

    public addCommand(command: Command): void {
        const priority = this._judgementCommandPriority(command)
        this._commands.add(command, priority)
    }

    public clearCommand(): void {
        this._commands.clear()
    }

    public nextCommand(): Readonly<Command> | null {
        return this._commands.poll()
    }

    public initCommandWatchService(): void {
        const mousetrap = require('mousetrap')
        for (const commandPackage of commandPackages) {
            mousetrap.bind(commandPackage.command.value, this.addCommand(commandPackage.command))
        }
    }
}

export const createCommandService = (): CommandService => {
    return new CommandServiceConcrete()
}