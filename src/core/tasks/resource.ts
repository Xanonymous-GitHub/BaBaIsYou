import {Task} from './'

abstract class Resource<T> implements Task<T> {
    public abstract execute(): Promise<T>;
}