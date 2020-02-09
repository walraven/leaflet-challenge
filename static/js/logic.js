// 1. **Get your data set**

const earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


//Create a map using Leaflet.
function mapCreator(earthquakeLayer) {
    const baseMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

    const myMap = L.map("map", {
        center: [35.4676, -97.5164],
        zoom: 3,
        layers: [baseMap, earthquakeLayer]
    });
}

// 2. **Import & Visualize the Data**
d3.json(earthquakeURL, function(data) {
    //console.log(data.features);

    //plots all of the earthquakes from your data set based on their longitude and latitude
    const earthquakeLayer = L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {radius:feature.properties.mag*6,
                                            fillColor: `#ff${(feature.properties.mag/10*100)-1}00`,
                                            color: "#000",
                                            weight: 0.5,
                                            //opacity: 1,
                                            fillOpacity: 0.6});
            }
        
    }).bindPopup(function (layer) {
        return layer.feature.properties.title;
    });

    mapCreator(earthquakeLayer);
})
//    

//    * Your data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

//    * Include popups that provide additional information about the earthquake when a marker is clicked.

//    * Create a legend that will provide context for your map data.

//    * Your visualization should look something like the map above.

// - - -
