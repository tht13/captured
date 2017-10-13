export function getCircle(magnitude: number): google.maps.Symbol {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "pink",
        fillOpacity: .2,
        scale: Math.pow(2, magnitude) / 2,
        strokeColor: "white",
        strokeWeight: .5
    };
}
