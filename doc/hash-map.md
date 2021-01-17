
## HashMap

HashMap is a Map that allow to customise how the key is used by converting it into a hash using a custom hash factory.

This will simplify lots of cases storing key-value pairs with customisation on *how the key is matched* on the map.

HashMap can be cast down into a Map as it contains the same set of methods.

### Example without HashMap

````typescript
type Point = readonly [x: number, y: number];

const dataPoints = new Map<string, any>();

export function addDataPoint(point: Point, data: any): void {
    const key = pointToKey(point);
    dataPoints.set(key, data);
}

export function getDataPoint(point: Point): any {
    const key = pointToKey(point);
    return dataPoints.get(key);
}

function pointToKey([x, y]: Point): string {
    return `${x}:${y}`;
}
````

> The problem with the implementation above is that we loose the key and can't iterate points as the key is a string. Off course this is possible with even more complex logic.

### Example with HashMap

This implementation will allow to retreive original keys

````typescript
type Point = readonly [x: number, y: number];

const dataPoints = new HashMap<Point, any>(([x, y]) => `${x}:${y}`);

export function addDataPoint(point: Point, data: any): void {
    dataPoints.set(point, data);
}

export function getDataPoint(point: Point): any {
    return dataPoints.get(point);
}

export function allPoints(): Iterable<Point> {
    return dataPoints.keys();
}
````