export const debounce = (func: Function, delay: number, ...args: Array<undefined>): () => unknown => {
    let timer: number;
    return (): void => {
        clearTimeout(timer);
        // @ts-ignore
        timer = setTimeout(() => {
            func(args);
        }, delay)
    }
}