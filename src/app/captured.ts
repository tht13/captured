import { getCurrentLocation, getRandom, offsetLocation, getLatestServerLocation } from "./location";

let map: google.maps.Map;
async function initMap(): Promise<void> {
    const currentPos: Coordinates = (await getCurrentLocation()).coords;
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: { lat: currentPos.latitude, lng: currentPos.longitude }
    });

    const circlePos: Coordinates = await getLatestServerLocation();
    const offsetPos: Coordinates = offsetLocation(circlePos, getRandom(0, 150), getRandom(0, 360));
    setApproxCircle(offsetPos);
    setCurrentPoint(currentPos);
}
// tslint:disable-next-line:no-string-literal
(window as any)["initMap"] = initMap;


function setApproxCircle(coords: Coordinates): google.maps.Circle {
    return new google.maps.Circle({
        strokeColor: "white",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "blue",
        fillOpacity: 0.3,
        map,
        center: { lat: coords.latitude, lng: coords.longitude },
        radius: 200
    });
}

function setCurrentPoint(coords: Coordinates): google.maps.Marker {
    return new google.maps.Marker({
        position: { lat: coords.latitude, lng: coords.longitude },
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5,
            fillColor: "blue",
            fillOpacity: .8,
            strokeColor: "white",
            strokeWeight: .5
        },
        map: map
    });
}

function loadMapsJs(): void {
    var script: HTMLScriptElement = document.createElement("script");

    // this example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC0WcjJC5ZZ3vJhJ8ovKF6yKRUrpqagLnQ&callback=initMap";
    document.getElementsByTagName("head")[0].appendChild(script);
}

loadMapsJs();