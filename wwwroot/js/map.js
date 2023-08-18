var map = L.map('map').setView([0, 0], 2);
var selectedFeature = null; // To store the currently selected feature
// Add the layer checklist using JavaScript
var layerChecklist = document.getElementById('layer-checklist');

// Create a GeoJSON layer using the URL of the GeoServer WMS service
var geojsonLayer = L.geoJSON(null, {
    style: function (feature) {
        return {
            color: '#3388ff', // Default color
            weight: 1
        };
    },
    onEachFeature: function (feature, layer) {
        layer.on('click', function () {
            searchFeatureByName(feature.properties.NAME_1);
        });
    }
});

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

// Search button click event handler
var searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function () {
    var searchInput = document.getElementById('search-input').value;
    searchFeatureByName(searchInput);
});

// Handle the visibility of FRA_adm1 layer based on checkbox
var franceLayerCheckbox = document.getElementById('france-layer');
franceLayerCheckbox.addEventListener('change', function () {
    if (franceLayerCheckbox.checked) {
        map.addLayer(geojsonLayer);
    } else {
        map.removeLayer(geojsonLayer);
    }
});

// Add wmsLayer to the checklist
addLayerToChecklist(wmsLayer, 'ne:world', 'World Boundaries');

// Your addLayerToChecklist function here
function addLayerToChecklist(layer, id, name) {
    var label = document.createElement('label');
    var input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = true;

    input.addEventListener('change', function () {
        if (input.checked) {
            map.addLayer(layer);
        } else {
            map.removeLayer(layer);
        }
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(name));
    popupContent.appendChild(label);
}

// Add the GeoJSON layer to the map
map.addLayer(geojsonLayer);

function searchFeatureByName(name) {
    // Wait for the data to be fetched and added to the geojsonLayer
    fetch('http://localhost:8080/geoserver/ne/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne:FRA_adm1&outputFormat=application%2Fjson')
        .then(response => response.json())
        .then(data => {
            // Add the fetched data to the geojsonLayer
            geojsonLayer.addData(data);

            // Reset the style of the previously highlighted feature
            if (selectedFeature) {
                selectedFeature.setStyle({ color: '#3388ff' }); // Reset previous highlight
            }

            // Find the matching feature by name
            var matchingFeature = null;
            geojsonLayer.eachLayer(function (layer) {
                
                if (layer.feature.properties.NAME_1 === name) {
                    matchingFeature = layer;
                
                    return;
                }
            });
            if (matchingFeature) {
                // Set the selected feature and highlight it
                selectedFeature = matchingFeature;
                selectedFeature.setStyle({ color: 'red' }); // Highlight the selected region

                // Zoom to the selected feature's bounds
                map.flyToBounds(selectedFeature.getBounds());
            }
        })
        .catch(error => {
            console.error('Error fetching or processing data:', error);
        });
}


