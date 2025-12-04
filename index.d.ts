export declare function derivedPublisher<const A extends readonly Publisher<any>[], R>(sources: A, fn: (value: keyof {
    [K in keyof A]: A[K] extends Publisher<infer U> ? U : never;
}) => R): Publisher<R>;

export declare function derivedValue<const A extends readonly ReactiveValue<any>[], R>(sources: A, fn: (...values: {
    [K in keyof A]: A[K] extends ReactiveValue<infer U> ? U : never;
}) => R): ReactiveValue<R> & Subscription;

export declare function effect<T>(source: Publisher<T>, fn: (value: T) => void): Subscription;

export declare interface Emitter<T> extends Publisher<T> {
    emit(value: T): void;
}

export declare function makeEmitter<T>(): Emitter<T>;

export declare function makeReactiveObject<T extends object>(initial: T): ReactiveValue<T>;

export declare function makeReactiveValue<T>(initial: T): ReactiveValue<T>;

export declare interface Publisher<T> {
    subscribe(fn: Subscriber<T>): Subscription;
}

export declare interface ReactiveValue<T> extends ReactiveValueReadOnly<T> {
    value: T;
}

export declare interface ReactiveValueReadOnly<T> extends Publisher<T> {
    get value(): T;
}

export declare type Subscriber<T> = (value: T) => void;

export declare type SubscriberCollection<T> = Set<Subscriber<T>>;

export declare interface Subscription {
    unsubscribe(): void;
}

export declare type SubscriptionCollection = Set<Subscription>;

export declare const unsubscribe: (subscription: Subscription) => void;

export declare function unsubscribeAll(subscriptions: SubscriptionCollection): void;

export { }
