import { getCircle } from "./circle.js";

let map: google.maps.Map;
function initMap(): void {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 2,
        center: { lat: -33.865427, lng: 151.196123 },
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    // create a <script> tag and set the USGS URL as the source.
    var script: HTMLScriptElement = document.createElement("script");

    // this example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src = "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
    document.getElementsByTagName("head")[0].appendChild(script);

    map.data.setStyle(function (feature: google.maps.Data.Feature): google.maps.Data.StyleOptions {
        var magnitude: number = feature.getProperty("mag");
        return {
            icon: getCircle(magnitude)
        };
    });
}
// tslint:disable-next-line:no-string-literal
(window as any)["initMap"] = initMap;

function eqfeed_callback(results: google.maps.Data.Feature[]): void {
    map.data.addGeoJson(results);
}

// tslint:disable-next-line:no-string-literal
(window as any)["eqfeed_callback"] = eqfeed_callback;

function loadMapsJs(): void {
    var script: HTMLScriptElement = document.createElement("script");

    // this example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC0WcjJC5ZZ3vJhJ8ovKF6yKRUrpqagLnQ&callback=initMap";
    document.getElementsByTagName("head")[0].appendChild(script);
}

loadMapsJs();