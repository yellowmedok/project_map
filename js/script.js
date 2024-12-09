// Дані про вершини
const peaks = [
  { id: 'hoverla', name: 'Говерла', lat: 48.1603, lon: 24.4999, visited: false },
  { id: 'petros', name: 'Петрос', lat: 48.1593, lon: 24.5109, visited: false },
];

// Налаштування карти
const svgWidth = 3507;  // Ширина SVG
const svgHeight = 2480; // Висота SVG

const minLatitude = 47.349780124;  // Мінімальна широта
const maxLatitude = 50.361837269;  // Максимальна широта
const minLongitude = 21.990640982; // Мінімальна довгота
const maxLongitude = 26.485850317; // Максимальна довгота

// Функція для конвертації географічних координат у SVG
function toSVGCoordinates(lat, lon) {
  const x = ((lon - minLongitude) / (maxLongitude - minLongitude)) * svgWidth;
  const y = ((lat - maxLatitude) / (minLatitude - maxLatitude)) * svgHeight;
  return { x, y };
}

// Завантаження SVG карти
const svgUrl = 'resources/karpaty_test.svg'; // Вкажіть шлях до вашого SVG
const mapContainer = document.getElementById('mapContainer');

fetch(svgUrl)
  .then((response) => response.text())
  .then((svgText) => {
    mapContainer.innerHTML = svgText; // Вставляємо SVG у контейнер
    const svgElement = mapContainer.querySelector('svg'); // Знаходимо SVG елемент

    // Додавання вершин на карту
    peaks.forEach((peak) => {
      const { x, y } = toSVGCoordinates(peak.lat, peak.lon);
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('id', peak.id);
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', 8);
      circle.setAttribute('fill', 'blue');
      svgElement.appendChild(circle);
    });

    // Ініціалізація Panzoom
    const panzoom = Panzoom(svgElement, {
      maxScale: 10,
      minScale: 0.5,
      contain: 'outside',
      step: 0.1,
    });
    mapContainer.addEventListener('wheel', panzoom.zoomWithWheel);

    // Синхронізація меню з вершинами
    const peakSelector = document.getElementById('peakSelector');
    peaks.forEach((peak) => {
      const option = document.createElement('option');
      option.value = peak.id;
      option.textContent = peak.name;
      peakSelector.appendChild(option);
    });

    // Обробка події натискання кнопки
    document.getElementById('markVisited').addEventListener('click', () => {
      const selectedPeak = peakSelector.value;
      const peak = peaks.find((p) => p.id === selectedPeak);
      if (peak && !peak.visited) {
        peak.visited = true;
        document.getElementById(selectedPeak).setAttribute('fill', 'green'); // Змінюємо колір
      }
    });
  })
  .catch((error) => console.error('Помилка завантаження SVG:', error));
