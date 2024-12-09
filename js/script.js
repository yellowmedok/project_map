// Дані про вершини
const peaks = {
  'peak1': { visited: false },
  'peak2': { visited: false }
};

/*
const svgWidth = 800;  // Ширина SVG
const svgHeight = 600; // Висота SVG

// Межі карти
const minLatitude = 47.349780124;  // Мінімальна широта
const maxLatitude = 50.361837269;  // Максимальна широта
const minLongitude = 21.990640982; // Мінімальна довгота
const maxLongitude = 26.485850317; // Максимальна довгота

// count x and y using real coordinates
x = ((longitude - minLongitude) / (maxLongitude - minLongitude)) * svgWidth
y = ((latitude - maxLatitude) / (minLatitude - maxLatitude)) * svgHeight

const hoverla = { lat: 48.1603, lon: 24.4999 };

*/


// Ініціалізація Panzoom
const svgElement = document.querySelector('#map');
const panzoom = Panzoom(svgElement, {
  maxScale: 100, // Максимальне масштабування
  minScale: 0.5, // Мінімальне масштабування
  contain: 'outside', // Дозволяє вихід за межі контейнера
  step: 0.1, // smooth behavior
});
// Обробка події натискання кнопки
document.getElementById('markVisited').addEventListener('click', () => {
  const selectedPeak = document.getElementById('peakSelector').value;
  if (peaks[selectedPeak]) {
    peaks[selectedPeak].visited = true;
    document.getElementById(selectedPeak).setAttribute('fill', 'green'); // Змінюємо колір
  }
});
// Додавання зуму на карту
document.getElementById('container').addEventListener('wheel', panzoom.zoomWithWheel);

