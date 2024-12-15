# Spot the Difference Game

A web-based interactive game where players spot differences between pairs of images. Built with HTML, CSS, and JavaScript, the game dynamically calculates scores, tracks time, and offers customization through an external configuration file.

## Features

- **Dynamic Image Pairs**: Add as many image pairs as you want through a JSON configuration.
- **Real-Time Score Calculation**: Automatically updates the score based on all differences found across pairs.
- **Mouse Coordinates Toggle**: A button to enable or disable the display of mouse coordinates dynamically.
- **Responsive Design**: Fully responsive for desktop and mobile devices.
- **Timer Functionality**: A 60-second timer to challenge the players.
- **Visual Highlights**: Highlights differences found by the player with a red marker.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Davidskumar/Spot_The_Difference.git
   cd spot-the-difference
   ```

2. Add your image assets and configure the game in the `gameConfig.json` file.

3. Open the `index.html` file in any modern browser.

## Usage

1. Add pairs of images and their differences to the `gameConfig.json` file:
   ```json
   {
       "gameTitle": "Spot the Difference",
       "differences": [
           {
               "image1": "path/to/image1.jpg",
               "image2": "path/to/image2.jpg",
               "differences": [
                   {"x": 50, "y": 100, "width": 20, "height": 20},
                   {"x": 200, "y": 150, "width": 25, "height": 25}
               ]
           }
       ]
   }
   ```

2. Launch the game in a browser to start playing.

## File Structure

```
├── index.html        # Main HTML file
├── style.css         # Styles for the game
├── script.js         # Game logic and interactivity
├── gameConfig.json   # Configuration file for images and differences
└── assets/           # Folder for image assets
```

## Customization

- **Images**: Add image paths and difference coordinates in the `gameConfig.json` file.
- **Timer**: Adjust the timer duration in the JavaScript code by modifying the `timeLeft` variable.
- **Styles**: Modify styles in the `<style>` section of the `index.html` or in a separate CSS file.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the game.
