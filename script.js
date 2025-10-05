// Theme toggle
const btn = document.getElementById('toggle-theme');
btn.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  btn.textContent = document.body.classList.contains('dark-mode') ? '☀' : '🌙';
});

// Show current datetime
function updateDatetime() {
  const dtBox = document.getElementById('datetime');
  const now = new Date();
  dtBox.textContent = now.toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}
updateDatetime();
setInterval(updateDatetime, 30000);

// Leaflet Map Setup
const map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India example

// Better, colourful tile layer (CartoDB/Voyager for bright, English)
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  {
    attribution: '© OpenStreetMap contributors & CartoDB',
    maxZoom: 18
  }
).addTo(map);

// Add geocoder (search in English)
L.Control.geocoder({
  defaultMarkGeocode: true,
  placeholder: "Search places in English..."
}).addTo(map);

// Add some example markers with English names
const blooms = [
  { name: "Tulip Gardens", coords: [34.0745, 74.8095] },
  { name: "Cherry Blossoms", coords: [35.6895, 139.6917] },
  { name: "Rose Show", coords: [22.7196, 75.8577] },
  { name: "Magnolia Park", coords: [37.7749, -122.4194] }
];

blooms.forEach(bloom => {
  L.marker(bloom.coords)
    .addTo(map)
    .bindPopup(<b>${bloom.name}</b>);
});

// Loading indicator simulation for weather data
const loading = document.getElementById('loading');
loading.classList.remove('hidden');
setTimeout(() => loading.classList.add('hidden'), 1800);