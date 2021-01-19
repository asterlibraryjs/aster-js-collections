import { assert } from "chai";
import { HashSet } from "../src";

describe("HashSet", () => {

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
        const hashMap = new HashSet<CompoundKey>(k => k.getHashValue());

        assert.equal(hashMap.size, 0);
        assert.deepEqual([...hashMap.keys()], []);
        assert.deepEqual([...hashMap.values()], []);
    });

    it("Should add one entry", () => {
        const hashMap = new HashSet<CompoundKey>(k => k.getHashValue());

        hashMap.add(new CompoundKey("key", 1));

        assert.equal(hashMap.size, 1);
    });

    it("Should add undefined or null values", () => {
        const hashMap = new HashSet<CompoundKey>(k => k.getHashValue());

        hashMap.add(new CompoundKey("key", 1));
        hashMap.add(new CompoundKey("key", 2));

        assert.equal(hashMap.size, 2);

        assert.isTrue(hashMap.has(new CompoundKey("key", 1)));
        assert.isTrue(hashMap.has(new CompoundKey("key", 2)));
    });

    it("Should add multiple values on multiple keys", () => {
        const hashMap = new HashSet<CompoundKey>(k => k.getHashValue());

        hashMap.add(new CompoundKey("key", 1));
        hashMap.add(new CompoundKey("key", 2));
        hashMap.add(new CompoundKey("key", 5));
        hashMap.add(new CompoundKey("key", 6));
        hashMap.add(new CompoundKey("key", 2));

        assert.equal(hashMap.size, 4);
    });

    it("Should delete all items of an existing key", () => {
        const hashMap = new HashSet<CompoundKey>(k => k.getHashValue());

        hashMap.add(new CompoundKey("key", 1));
        hashMap.add(new CompoundKey("key", 2));
        hashMap.add(new CompoundKey("key", 5));
        hashMap.add(new CompoundKey("key", 6));

        hashMap.delete(new CompoundKey("key", 2));

        assert.equal(hashMap.size, 3);

        assert.isFalse(hashMap.has(new CompoundKey("key", 2)));
    });

    it("Should delete nothing", () => {
        const hashMap = new HashSet<CompoundKey>(k => k.getHashValue());

        hashMap.add(new CompoundKey("key", 1));
        hashMap.add(new CompoundKey("key", 2));
        hashMap.add(new CompoundKey("key", 5));
        hashMap.add(new CompoundKey("key", 6));

        hashMap.delete(new CompoundKey("key", 7));

        assert.equal(hashMap.size, 4);
    });

    it("Should clear all values", () => {
        const hashMap = new HashSet<CompoundKey>(k => k.getHashValue());

        hashMap.add(new CompoundKey("key", 1));
        hashMap.add(new CompoundKey("key", 2));
        hashMap.add(new CompoundKey("key", 5));
        hashMap.add(new CompoundKey("key", 6));

        hashMap.clear();

        assert.equal(hashMap.size, 0);
    });

});
