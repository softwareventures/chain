interface Chain<T> {
    readonly value: T;
    map: <U>(f: (x: T) => U) => Chain<U>;
    then: <U>(f: (x: T) => Chain<U>) => Chain<U>;
}

function chain<T>(x: T): Chain<T> {
    return {
        value: x,
        map: f => chain(f(x)),
        then: f => f(x)
    };
}

// For forward compatibility with v3.0
chain.chain = chain;

/** @deprecated For backwards compatibility with versions < v1.0.1.
 * Will be removed in v3.0. */
chain.default = chain;

export = chain;
