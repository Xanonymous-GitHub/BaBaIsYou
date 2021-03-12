export const deBounce = (func: Function, delay: number, ...args: Array<undefined>): () => unknown => {
    let timer: number;
    return () => {
        clearTimeout(timer);
        // @ts-ignore
        timer = setTimeout(() => {
            func(args);
        }, delay)
    }
}