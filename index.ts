export interface Chain<T> {
    readonly value: T;
    map: <U>(f: (x: T) => U) => Chain<U>;
    then: <U>(f: (x: T) => Chain<U>) => Chain<U>;
}

export function chain<T>(x: T): Chain<T> {
    return {
        value: x,
        map: f => chain(f(x)),
        then: f => f(x)
    };
}
