let config;
let found = 0;
let startTime;
let timerInterval;

fetch("config.json")
    .then((res) => res.json())
    .then((data) => {
        config = data;
        document.title = config.gameTitle;
        document.getElementById("title").textContent = config.gameTitle;
        loadImages();
        startTimer();
    });

function loadImages() {
    const img1Container = document.getElementById("img1Container");
    const img2Container = document.getElementById("img2Container");

    const img1 = new Image();
    const img2 = new Image();
    img1.src = config.images.image1;
    img2.src = config.images.image2;

    img1.className = "game-image";
    img2.className = "game-image";

    img1.onload = () => {
        img1Container.appendChild(img1);
        createHotspots(img1, img1Container, false); // No click event for the first image
    };

    img2.onload = () => {
        img2Container.appendChild(img2);
        createHotspots(img2, img2Container, true); // Enable click event for the second image
    };
}

function createHotspots(image, container, isSecondImage) {
    const originalWidth = 640;  // Original image dimensions
    const originalHeight = 480;

    const scaleX = image.width / originalWidth;
    const scaleY = image.height / originalHeight;

    config.differences.forEach((diff) => {
        const hotspot = document.createElement("div");
        hotspot.className = "hotspot";
        hotspot.style.left = `${diff.x * scaleX}px`;
        hotspot.style.top = `${diff.y * scaleY}px`;
        hotspot.style.width = `${diff.width * scaleX}px`;
        hotspot.style.height = `${diff.height * scaleY}px`;
        hotspot.dataset.clicked = "false";

        if (isSecondImage) {
            hotspot.addEventListener("click", (e) => {
                e.stopPropagation(); // prevent click from propagating to the image container
                if (hotspot.dataset.clicked === "false") {
                    hotspot.dataset.clicked = "true";
                    hotspot.style.border = "3px solid red";
                    hotspot.style.borderRadius = "50%";
                    found++;
                    document.getElementById("score").textContent = `Score: ${found}`;

                    if (found === config.differences.length) {
                        stopTimer();
                        document.getElementById("message").textContent =
                            "🎉 You found all the differences!";
                    }
                }
            });
        }

        container.appendChild(hotspot);
    });
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById("timer").textContent = `⏱ Time: ${elapsed}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}
