import { HashFactory } from "./hash-factory";

export class HashSet<K> implements Iterable<K> {
    private readonly _hashFactory: (key: K) => any;
    private readonly _store: Map<any, K>;

    get size(): number { return this._store.size; }

    get [Symbol.toStringTag](): string { return "[Object HashSet]"; }

    constructor(hashFactory: HashFactory<K> = String, values?: Iterable<K>) {
        this._hashFactory = hashFactory;
        this._store = new Map<any, K>(
            this.mapEntries(values)
        );
    }

    has(key: K): boolean {
        const hash = this._hashFactory(key);
        return this._store.has(hash);
    }

    add(key: K): this {
        const hash = this._hashFactory(key);
        this._store.set(hash, key);
        return this;
    }

    delete(key: K): boolean {
        const hash = this._hashFactory(key);
        return this._store.delete(hash);
    }

    clear(): void {
        this._store.clear();
    }

    forEach(callbackfn: (value: K, key: K, map: this) => void, thisArg?: any): void {
        for (const key of this) {
            callbackfn.call(thisArg, key, key, this);
        }
    }

    keys(): IterableIterator<K> {
        return this._store.values();
    }

    *entries(): IterableIterator<[K, K]> {
        for (const item of this._store.values()) {
            yield [item, item];
        }
    }

    values(): IterableIterator<K> {
        return this.keys();
    }

    [Symbol.iterator](): IterableIterator<K> {
        return this.keys();
    }

    private *mapEntries(entries?: Iterable<K>): Iterable<[any, K]> {
        if (entries) {
            for (const k of entries) {
                yield [this._hashFactory(k), k];
            }
        }
    }
}
