import { assert } from "chai";
import { HashMap } from "../src";

describe("HashMap", () => {

    class CompoundKey {
        constructor(
            readonly name: string,
            readonly id: number
        ) { }

        getHashValue(): string {
            return `${this.name}#${this.id}`;
        }
    }

    it("Should create a new empty hashMap", () => {
        const hashMap = new HashMap<CompoundKey, any>(k => k.getHashValue());

        assert.equal(hashMap.size, 0);
        assert.deepEqual([...hashMap.keys()], []);
        assert.deepEqual([...hashMap.values()], []);
    });

    it("Should add one entry", () => {
        const hashMap = new HashMap<CompoundKey, any>(k => k.getHashValue());

        hashMap.set(new CompoundKey("key", 1), null);

        assert.equal(hashMap.size, 1);
    });

    it("Should add undefined or null values", () => {
        const hashMap = new HashMap<CompoundKey, any>(k => k.getHashValue());

        hashMap.set(new CompoundKey("key", 1), null);
        hashMap.set(new CompoundKey("key", 2), undefined);

        assert.equal(hashMap.size, 2);

        assert.isTrue(hashMap.has(new CompoundKey("key", 1)));
        assert.isTrue(hashMap.has(new CompoundKey("key", 2)));

        assert.isNull(hashMap.get(new CompoundKey("key", 1)));
        assert.isUndefined(hashMap.get(new CompoundKey("key", 2)));
    });

    it("Should override an existing value", () => {
        const hashMap = new HashMap<CompoundKey, any>(k => k.getHashValue());

        hashMap.set(new CompoundKey("key", 1), 0);
        hashMap.set(new CompoundKey("key", 1), 1);

        assert.equal(hashMap.size, 1);
        assert.equal(hashMap.get(new CompoundKey("key", 1)), 1);
    });

    it("Should add multiple values on multiple keys", () => {
        const hashMap = new HashMap<CompoundKey, any>(k => k.getHashValue());

        hashMap.set(new CompoundKey("key", 1), 55);
        hashMap.set(new CompoundKey("key", 2), 22);
        hashMap.set(new CompoundKey("key", 5), 22);
        hashMap.set(new CompoundKey("key", 6), 0);
        hashMap.set(new CompoundKey("key", 2), 33);

        assert.equal(hashMap.size, 4);
        assert.deepEqual([...hashMap.values()], [55, 33, 22, 0])
    });

    it("Should delete all items of an existing key", () => {
        const hashMap = new HashMap<CompoundKey, any>(k => k.getHashValue());

        hashMap.set(new CompoundKey("key", 1), 55);
        hashMap.set(new CompoundKey("key", 2), 22);
        hashMap.set(new CompoundKey("key", 5), 22);
        hashMap.set(new CompoundKey("key", 6), 0);

        hashMap.delete(new CompoundKey("key", 2));

        assert.equal(hashMap.size, 3);

        assert.isUndefined(hashMap.get(new CompoundKey("key", 2)));
    });

    it("Should delete nothing", () => {
        const hashMap = new HashMap<CompoundKey, any>(k => k.getHashValue());

        hashMap.set(new CompoundKey("key", 1), 55);
        hashMap.set(new CompoundKey("key", 2), 22);
        hashMap.set(new CompoundKey("key", 5), 22);
        hashMap.set(new CompoundKey("key", 6), 0);

        hashMap.delete(new CompoundKey("key", 7));

        assert.equal(hashMap.size, 4);
    });

    it("Should clear all values", () => {
        const hashMap = new HashMap<CompoundKey, any>(k => k.getHashValue());

        hashMap.set(new CompoundKey("key", 1), 55);
        hashMap.set(new CompoundKey("key", 2), 22);
        hashMap.set(new CompoundKey("key", 5), 22);
        hashMap.set(new CompoundKey("key", 6), 0);

        hashMap.clear();

        assert.equal(hashMap.size, 0);
    });

});
