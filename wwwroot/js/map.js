// map.js
var map = L.map('map').setView([0, 0], 2);

var wmsLayer = L.tileLayer.wms('http://localhost:8080/geoserver/ne/wms', {
    layers: 'ne:world',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    attribution: "World boundaries &copy; <a href='http://www.naturalearthdata.com'>Natural Earth</a>"
}).addTo(map);

var infoControl = L.control.wmsFeatureInfo({
    autoActivate: true,
    content: 'Loading...',
    layers: [wmsLayer],
    queryVisible: true,
    infoFormat: 'text/html'
});

map.addControl(infoControl);
