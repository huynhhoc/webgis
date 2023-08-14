var map = L.map('map').setView([0, 0], 2);
// Add the layer checklist using JavaScript
var layerChecklist = document.getElementById('layer-checklist');
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

// Search button click event handler
var searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function () {
    var searchInput = document.getElementById('search-input').value;
    searchFeatureByName(searchInput);
});

// Function to search for features by name_1
function searchFeatureByName(name) {
    // ... Your search logic using Leaflet's features and GeoServer's API ...

    // Display the search result in the HTML
    var searchResultContainer = document.getElementById('search-result');
    searchResultContainer.innerHTML = `<p>Search result: ${name}</p>`;

    // ... Update the map's view and display the selected feature ...

    // Example: Zoom to the selected feature
    if (selectedFeature) {
        map.flyTo(selectedFeature.getBounds().getCenter(), 10);
    }
}

