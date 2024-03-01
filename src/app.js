document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map
    var map = L.map('map-container').setView([0, 0], 2);

    // Add the image overlay
    L.imageOverlay('images/gondwa.png', [[-90, -180], [90, 180]]).addTo(map);

    // Set the bounds of the map
    map.setMaxBounds([[-90, -180], [90, 180]]);
});