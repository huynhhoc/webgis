var map = L.map('map').setView([0, 0], 2);

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
    attribution: "World boundaries &copy; <a href='http://www.naturalearthdata.com'>Natural Earth</a>",
    style: function (feature) {
        var name = feature.properties.name_1;
        // Define a color palette based on name_1 attribute
        var color = getColorBasedOnName(name);
        return {
            fillColor: color,
            color: '#5733FF',
            weight: 1,
            fillOpacity: 0.7
        };
    }
}).addTo(map);
function getColorBasedOnName(name) {
    console.log("Checking name:", name);
    var colorPalette = {
        "Alsace": "#FF5733",
        "Aquitaine": "#33FF57",
        "Auvergne": "#5733FF"
    };

    var defaultColor = "#999999"; // Default color if name is not found
    return colorPalette[name] || defaultColor;
}
