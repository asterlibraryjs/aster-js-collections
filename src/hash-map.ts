import { HashFactory } from "./hash-factory";

export class HashMap<K, V> implements Iterable<[K, V]> {
    private readonly _hashFactory: (key: K) => any;
    private readonly _store: Map<any, [K, V]>;

    get size(): number { return this._store.size; }

    get [Symbol.toStringTag](): string { return "[Object HashMap]"; }

    constructor(hashFactory: HashFactory<K> = k => k, values?: Iterable<readonly [K, V]>) {
        this._hashFactory = hashFactory;
        this._store = new Map<any, [K, V]>(
            this.mapEntries(values)
        );
    }

    has(key: K): boolean {
        const hash = this._hashFactory(key);
        return this._store.has(hash);
    }

    get(key: K): V | undefined {
        const entry = this.getEntry(key);
        if (entry) return entry[1];
    }

    getOrElse(key: K, fallback: V): V {
        const entry = this.getEntry(key);
        return entry ? entry[1] : fallback;
    }

    private getEntry(key: K): [K, V] | undefined {
        const hash = this._hashFactory(key);
        return this._store.get(hash);
    }

    getOrSet(key: K, factory: (key: K, src: HashMap<K, V>) => V): V;
    getOrSet(key: K, factory: (key: K, src: HashMap<K, V>) => Promise<V>): Promise<V>;
    getOrSet(key: K, factory: (key: K, src: HashMap<K, V>) => Promise<V> | V): Promise<V> | V {
        const hash = this._hashFactory(key);
        const entry = this._store.get(hash);
        if (!entry) {
            const value = factory(key, this);

            if (value instanceof Promise) {
                return this.addAsync(hash, key, value);
            }

            this._store.set(hash, [key, value]);
            return value;
        }
        return entry[1];
    }

    private async addAsync(hash: any, key: K, valuePromise: Promise<V>): Promise<V> {
        const value = await valuePromise;
        this._store.set(hash, [key, value]);
        return value;
    }

    set(key: K, value: V): this {
        const hash = this._hashFactory(key);
        this._store.set(hash, [key, value]);
        return this;
    }

    delete(key: K): boolean {
        const hash = this._hashFactory(key);
        return this._store.delete(hash);
    }

    clear(): void {
        this._store.clear();
    }

    forEach(callbackfn: (value: V, key: K, map: this) => void, thisArg?: any): void {
        for (const [key, value] of this) {
            callbackfn.call(thisArg, value, key, this);
        }
    }

    *keys(): IterableIterator<K> {
        for (const [k, _] of this) {
            yield k;
        }
    }

    *values(): IterableIterator<V> {
        for (const [_, v] of this) {
            yield v;
        }
    }

    *entries(): IterableIterator<[K, V]> {
        for (const entry of this._store.values()) {
            yield [...entry];
        }
    }

    [Symbol.iterator](): IterableIterator<[K, V]> {
        return this.entries();
    }

    private *mapEntries(entries?: Iterable<readonly [K, V]>): Iterable<[any, [K, V]]> {
        if (entries) {
            for (const [k, v] of entries) {
                yield [this._hashFactory(k), [k, v]];
            }
        }
    }
}
