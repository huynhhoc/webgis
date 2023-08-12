console.log("Before map initialization");
const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }),
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/ne/wms',
                params: {
                    'LAYERS': 'ne:world',
                },
            }),
            // No need to set the projection here, it's automatically determined
        }),
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([0, 0]), // Center around 0, 0
        zoom: 2, // Adjust the initial zoom level as needed
    }),
});
console.log("After map initialization");