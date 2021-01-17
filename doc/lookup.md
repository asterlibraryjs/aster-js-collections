
## Lookup

Lookup is a Map that manage a key-value[] pairs: Storing multiple values for each keys.

### Example without Lookup

````typescript
const dependencyMap = new Map<string, string[]>();

export function *getDependencies(key: string): Iterable<string>{
    const found = dependencyMap.get(key);
    if(found) yield* found;
}

export function addDependencies(key: string, dependency: string): void {
    const found = dependencyMap.get(key);
    if(found) {
        found.push(dependency);
    }
    else {
        dependencyMap.set(key, [dependency]);
    }
}
````

### Example with Lookup

````typescript
const dependencyMap = new Lookup<string, string>();

export function getDependencies(key: string): Iterable<string>{
    return dependencyMap.get(key);
}

export function addDependencies(key: string, dependency: string): void {
    dependencyMap.add(key, dependency);
}
````


### Reference
- `readonly size: number`:
Gets the number of stored key-pair[]

- `readonly itemSize: number`: 
Gets the total number of item. This number is not computed each time, a counter is kept.

- `constructor(values?: Iterable<readonly [K, V[]]>, hashFactory?: HashFactory<K>)`: 
Creates a new instance from an existing collection of key-pair[] allowing easy clone of an other `Lookup`.
A `HashFactory` can also be provided to enable the feature as [HashMap](./hash-map.md) does.

- `has(key: K): boolean`: 
Indicates if a store for the provided key as been created / kept. No empty store are kept.

- `hasValue(key: K, value: V): boolean`: 
Indicates if the provided value is stored for the provided key.

- `get(key: K): IterableIterator<V>`:
Returns an iterable iterator of values for the provided key. This method will never fail a returning an iterator even if the key has no entry.

- `add(key: K, ...values: V[]): this`:
Adds new entries for the provided key.

- `delete(key: K): boolean`:
Removes all entries for the provided key. Returns an entry has been removed.

- `deleteValue(key: K, value: V): boolean`:
Deletes a specific value for the provided key. Returns a value has been removed.

- `clear(): void`:
Removes all data.

- `forEach(callbackfn: (value: V, key: K, map: this) => void, thisArg?: any): void`:
Iterates every values one by one (repeating the key) to execute the provided callback on them.

> To avoid flatten iteration, use the `Lookup` `Iterable` implementation.

- `keys(): Iterable<K>`:
Returns all keys.

-`values(): Iterable<V>`:
Returns all flatten values.

- `[Symbol.iterator](): IterableIterator<[K, V[]]>`:
Returns an iterator of all key-pair[].
