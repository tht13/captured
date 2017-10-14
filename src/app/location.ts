export function getCurrentLocation(): Promise<Position> {
    if (!navigator.geolocation) {
        alert("Browser does not support geolocation");
        return Promise.reject("Unsupported Op");
    }
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(position => {
            res(position);
        }, rej);
    });
}

export function getRandom(min: number = 0, max: number = 100): number {
    return Math.random() * max - min;
}

export function offsetLocation(coords: Coordinates, distance: number, direction: number): Coordinates {
    const MAGIC: number = 111111;
    const dy: number = Math.sin(direction) * distance;
    const dx: number = Math.cos(direction) * distance;

    const dLat: number = dy / MAGIC;
    const dLong: number = dx / (MAGIC * Math.cos(dLat + coords.latitude));
    return { ...coords, latitude: coords.latitude + dLat, longitude: coords.longitude + dLong };
}

// 111,111 meters (111.111 km) in the y direction is 1 degree (of latitude)
// 111,111 * cos(latitude) meters in the x direction is 1 degree (of longitude).