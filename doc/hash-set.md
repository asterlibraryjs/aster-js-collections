
## HashMap

HashSet is a Set that allow to customise how the key is used by converting it into a hash using a custom hash factory.

This will simplify lots of cases using compound values.

HashSet can be cast down into a Set as it contains the same set of methods.

### Example without HashSet

````typescript
type Point = readonly [x: number, y: number];

const points = new Set<string>();

export function addPoint(point: Point): void {
    const key = pointToKey(point);
    points.add(key);
}

export function hasPoint(point: Point): boolean {
    const key = pointToKey(point);
    return points.has(key);
}

function pointToKey([x, y]: Point): string {
    return `${x}:${y}`;
}
````

> The problem with the implementation above is that we loose the key and can't easily iterate points as the key is a string.

### Example with HashMap

This implementation will allow to retreive original keys

````typescript
type Point = readonly [x: number, y: number];

const points = new HashSet<Point>(([x, y]) => `${x}:${y}`);

export function addDataPoint(point: Point): void {
    points.add(point);
}

export function getDataPoint(point: Point): boolean {
    return points.has(point);
}

/* Bonus */
export function allPoints(): Iterable<Point> {
    return points.keys();
}
````