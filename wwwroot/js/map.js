const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }),
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/ows',
                params: {
                    'LAYERS': 'webgis:ne',
                },
            }),
        }),
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([106.41, 14.23]),
        zoom: 10,
    }),
});
