var map = L.map('map', {maxZoom: 17}).setView([0, 0], 14);
/* Instead of a tile layer, use a bitmap image */
var imageUrl = '../img/ClassDiagram.png';
var imageBounds = [[51.490, -0.122], [51.510, -0.028]];
L.imageOverlay(imageUrl, imageBounds).addTo(map);
map.setMaxBounds(imageBounds);