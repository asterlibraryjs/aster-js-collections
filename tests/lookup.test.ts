import { assert } from "chai";
import { Lookup } from "../src";

describe("Lookup", () => {

    it("Should create a new empty Lookup", () => {
        const lookup = new Lookup();

        assert.equal(lookup.size, 0);
        assert.equal(lookup.itemSize, 0);
        assert.deepEqual([...lookup.values()], []);
    });

    it("Should add one entry", () => {
        const lookup = new Lookup<string, any>();

        lookup.add("key1", null);

        assert.equal(lookup.size, 1);
        assert.equal(lookup.itemSize, 1);
    });

    it("Should add undefined or null values", () => {
        const lookup = new Lookup<string, any>();

        lookup.add("key1", null);
        lookup.add("key2", undefined);

        assert.equal(lookup.size, 2);
        assert.equal(lookup.itemSize, 2);
        assert.deepEqual([...lookup.get("key1")], [null]);
    });

    it("Should add multiple undefined or null values", () => {
        const lookup = new Lookup<string, any>();

        lookup.add("key1", null);
        lookup.add("key1", undefined);

        assert.equal(lookup.size, 1);
        assert.equal(lookup.itemSize, 2);
        assert.deepEqual([...lookup.get("key1")], [null, undefined]);
    });

    it("Should add multiple values", () => {
        const lookup = new Lookup<string, number>();

        lookup.add("key1", 0);
        lookup.add("key1", 22);
        lookup.add("key1", 0);
        lookup.add("key1", 0);

        assert.equal(lookup.size, 1);
        assert.equal(lookup.itemSize, 4);
        assert.deepEqual([...lookup.get("key1")], [0, 22, 0, 0]);
    });

    it("Should add multiple values on multiple keys", () => {
        const lookup = new Lookup<string, number>();

        lookup.add("key1", 0);
        lookup.add("key2", 22);
        lookup.add("key1", 22);
        lookup.add("key2", 0);
        lookup.add("key1", 0);

        assert.equal(lookup.size, 2);
        assert.equal(lookup.itemSize, 5);

        assert.deepEqual([...lookup.get("key1")], [0, 22, 0]);

        assert.deepEqual(lookup.first("key2"), 22);
        assert.deepEqual(lookup.last("key2"), 0);
        assert.deepEqual([...lookup.get("key2")], [22, 0]);
    });

    it("Should delete all items of an existing key", () => {
        const lookup = new Lookup<string, number>();

        lookup.add("key1", 0);
        lookup.add("key2", 22);
        lookup.add("key1", 22);
        lookup.add("key2", 0);
        lookup.add("key1", 0);

        lookup.delete("key1");

        assert.equal(lookup.size, 1);
        assert.equal(lookup.itemSize, 2);

        assert.deepEqual([...lookup.get("key1")], []);
        assert.deepEqual([...lookup.get("key2")], [22, 0]);
    });

    it("Should delete nothing", () => {
        const lookup = new Lookup<string, number>();

        lookup.add("key1", 0);
        lookup.add("key2", 22);
        lookup.add("key1", 22);
        lookup.add("key2", 0);
        lookup.add("key1", 0);

        lookup.delete("key3");

        assert.equal(lookup.size, 2);
        assert.equal(lookup.itemSize, 5);
    });

    it("Should clear all values", () => {
        const lookup = new Lookup<string, number>();

        lookup.add("key2", 22);
        lookup.add("key1", 0);
        lookup.add("key1", 22);
        lookup.add("key2", 33);
        lookup.add("key1", 0);

        lookup.clear();

        assert.equal(lookup.size, 0);
        assert.equal(lookup.itemSize, 0);
    });

    it("Should return all values", () => {
        const lookup = new Lookup<string, number>();

        lookup.add("key1", 0);
        lookup.add("key2", 22);
        lookup.add("key1", 22);
        lookup.add("key2", 0);
        lookup.add("key1", 0);

        assert.deepEqual([...lookup.values()], [0, 22, 0, 22, 0]);
    });

    it("Should return all values", () => {
        const lookup = new Lookup<string, number>();

        lookup.add("key2", 22);
        lookup.add("key1", 0);
        lookup.add("key1", 22);
        lookup.add("key2", 0);
        lookup.add("key1", 0);

        assert.deepEqual([...lookup.keys()], ["key2", "key1"]);
    });

    it("Should returns true when check for an included value", () => {
        const lookup = new Lookup<string, number>();

        lookup.add("key2", 22);
        lookup.add("key1", 0);
        lookup.add("key1", 22);
        lookup.add("key2", 33);
        lookup.add("key1", 0);

        assert.isTrue(lookup.include(33));
    });

    it("Should returns false when check for an non included value", () => {
        const lookup = new Lookup<string, number>();

        lookup.add("key2", 22);
        lookup.add("key1", 0);
        lookup.add("key1", 22);
        lookup.add("key2", 33);
        lookup.add("key1", 0);

        assert.isFalse(lookup.include(2));
    });

});
