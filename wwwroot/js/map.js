var map = L.map('map').setView([0, 0], 2);

// Define a color palette based on name_1 values for fra_adm1
var colorPalette = {
    "Alsace": "#FF5733",
    "Aquitaine": "#33FF57",
    "Auvergne": "#5733FF"
    // Add more name_1 values and corresponding colors
};

var wmsLayer = L.tileLayer.wms('http://localhost:8080/geoserver/ne/wms', {
    layers: 'ne:world',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    attribution: "World boundaries &copy; <a href='http://www.naturalearthdata.com'>Natural Earth</a>"
}).addTo(map);


var wmsLayerfr = L.tileLayer.wms('http://localhost:8080/geoserver/ne/wms', {
    layers: 'ne:FRA_adm1',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    attribution: "World boundaries &copy; <a href='http://www.naturalearthdata.com'>Natural Earth</a>"
}).addTo(map);

