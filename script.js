// Fetch JSON configuration
fetch('gameConfig.json')
.then(response => response.json())
.then(data => {
    initGame(data);
})
.catch(error => console.error('Error loading configuration:', error));

let score = 0;
let differencesFound = 0;
let totalDifferences = 0;
let coordinatesEnabled = true; // Track whether coordinates are enabled

function initGame(config) {
document.getElementById('gameTitle').textContent = config.gameTitle;

const gameContainer = document.getElementById('gameContainer');
const differencesList = config.differences;

// Count total differences for score calculation
differencesList.forEach(pair => {
    totalDifferences += pair.differences.length;
});

// Loop through each pair of images
differencesList.forEach(pair => {
    const imagePairWrapper = document.createElement('div');
    imagePairWrapper.classList.add('image-pair-wrapper');
    gameContainer.appendChild(imagePairWrapper);

    const image1Wrapper = document.createElement('div');
    image1Wrapper.classList.add('image-wrapper');
    const image1 = document.createElement('img');
    image1.src = pair.image1;
    image1Wrapper.appendChild(image1);

    const image2Wrapper = document.createElement('div');
    image2Wrapper.classList.add('image-wrapper');
    const image2 = document.createElement('img');
    image2.src = pair.image2;
    image2Wrapper.appendChild(image2);

    imagePairWrapper.appendChild(image1Wrapper);
    imagePairWrapper.appendChild(image2Wrapper);

    // Add click handlers for each image pair
    [image1Wrapper, image2Wrapper].forEach((wrapper) => {
        wrapper.addEventListener('click', event => {
            toggleBorder(wrapper);

            const rect = wrapper.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const foundDifference = pair.differences.some((diff, i) => {
                if (
                    x >= diff.x &&
                    x <= diff.x + diff.width &&
                    y >= diff.y &&
                    y <= diff.y + diff.height
                ) {
                    highlightDifference(wrapper, diff);
                    pair.differences.splice(i, 1); // Remove the found difference
                    differencesFound++;
                    updateScore();
                    return true;
                }
                return false;
            });

            if (foundDifference && differencesFound === totalDifferences) {
                displayMessage('Congratulations! You found all the differences!');
                clearInterval(timerInterval);
            }
        });

        // Display mouse coordinates on hover over the image if enabled
        wrapper.addEventListener('mousemove', event => {
            if (coordinatesEnabled) {
                const rect = wrapper.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                // Only show coordinates if mouse is inside the image
                if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
                    showCoordinates(wrapper, x, y);
                }
            }
        });

        wrapper.addEventListener('mouseleave', () => {
            hideCoordinates();
        });
    });
});

// Start timer
let timeLeft = 60;
const timer = document.getElementById('timer');
timer.textContent = timeLeft;

const timerInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        displayMessage('Time is up! Try again.');
    }
}, 1000);
}

function toggleBorder(wrapper) {
wrapper.classList.toggle('clicked-border');
}

function highlightDifference(wrapper, diff) {
const redDot = document.createElement('div');
redDot.style.position = 'absolute';
redDot.style.backgroundColor = 'red';
redDot.style.borderRadius = '50%';
redDot.style.width = `${diff.width}px`;
redDot.style.height = `${diff.height}px`;
redDot.style.left = `${diff.x}px`;
redDot.style.top = `${diff.y}px`;
redDot.style.pointerEvents = 'none';
wrapper.appendChild(redDot);
}

function showCoordinates(wrapper, x, y) {
let coordinatesDisplay = document.getElementById('coordinates');
if (!coordinatesDisplay) {
    coordinatesDisplay = document.createElement('p');
    coordinatesDisplay.id = 'coordinates';
    wrapper.appendChild(coordinatesDisplay);
}
coordinatesDisplay.textContent = `x: ${x.toFixed(2)}, y: ${y.toFixed(2)}`;
coordinatesDisplay.style.left = `${x + 10}px`;
coordinatesDisplay.style.top = `${y + 10}px`;
}

function hideCoordinates() {
const coordinatesDisplay = document.getElementById('coordinates');
if (coordinatesDisplay) {
    coordinatesDisplay.textContent = '';
}
}

function updateScore() {
// Score is simply the number of differences found
score = differencesFound;
document.getElementById('score').textContent = score;
}

function displayMessage(message) {
document.getElementById('message').textContent = message;
}

// Toggle mouse coordinates visibility on button click
document.getElementById('toggleCoordinatesBtn').addEventListener('click', () => {
coordinatesEnabled = !coordinatesEnabled;
const button = document.getElementById('toggleCoordinatesBtn');
if (coordinatesEnabled) {
    button.textContent = 'Hide Coordinates';
    button.classList.add('active');
} else {
    button.textContent = 'Show Coordinates';
    button.classList.remove('active');
}
});