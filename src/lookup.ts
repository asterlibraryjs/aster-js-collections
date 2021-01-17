import { HashFactory } from "./hash-factory";
import { HashMap } from "./hash-map";

export class Lookup<K, V> {
    private readonly _store: Map<K, V[]>;
    private _itemSize: number;

    get size(): number { return this._store.size; }

    get itemSize(): number { return this._itemSize; }

    constructor(hashFactory?: HashFactory<K>) {
        this._store = hashFactory ? new HashMap<K, V[]>(hashFactory) : new Map();
        this._itemSize = 0;
    }

    has(key: K): boolean {
        return this._store.has(key);
    }

    hasValue(key: K, value: V): boolean {
        const entries = this._store.get(key);
        return entries?.includes(value) ?? false;
    }

    include(value: V): boolean {
        for (const val of this.values()) {
            if (val === value) return true;
        }
        return false;
    }

    first(key: K): V | undefined {
        const entries = this._store.get(key);
        if (entries) return entries[0];
    }

    last(key: K): V | undefined {
        const entries = this._store.get(key);
        if (entries) return entries[entries.length - 1];
    }

    *get(key: K): IterableIterator<V> {
        const entries = this._store.get(key);
        if (entries) yield* entries;
    }

    add(key: K, ...values: V[]): this {
        const entries = this._store.get(key);
        if (entries) {
            entries.push(...values);
        }
        else {
            this._store.set(key, values);
        }

        this._itemSize++;
        return this;
    }

    delete(key: K): boolean {
        const entries = this._store.get(key);
        if (entries) {
            this._itemSize -= entries.length;
            return this._store.delete(key);
        }
        return false;
    }

    deleteValue(key: K, value: V): boolean {
        const entries = this._store.get(key);
        if (entries) {
            const idx = entries.indexOf(value);
            if (idx !== -1) {
                if (entries.length === 1) {
                    this._store.delete(key)
                }
                else {
                    entries.splice(idx, 1);
                }
                this._itemSize--;
                return true;
            }
        }
        return false;
    }

    clear(): void {
        this._itemSize = 0;
        this._store.clear();
    }

    forEach(callbackfn: (value: V, key: K, map: this) => void, thisArg?: any): void {
        for (const [key, values] of this._store) {
            for (const value of values) {
                callbackfn.call(thisArg, value, key, this);
            }
        }
    }

    *keys(): Iterable<K> {
        yield* this._store.keys();
    }

    *values(): Iterable<V> {
        for (const values of this._store.values()) {
            yield* values;
        }
    }

    *[Symbol.iterator](): IterableIterator<[K, V[]]> {
        yield* this._store;
    }

    static create<K, V>(values: Iterable<readonly [K, V]>, hashFactory?: HashFactory<K>): Lookup<K, V> {
        const lookup = new Lookup<K, V>(hashFactory);
        for (const item of values) {
            lookup.add(...item);
        }
        return lookup;
    }
}
