const MAP_WIDTH = 500
const MAP_HEIGHT = 500;
const BLOCK_SIZE = 20;
const WIDTH_BLOCKS = MAP_WIDTH / BLOCK_SIZE;
const HEIGHT_BLOCKS = MAP_HEIGHT / BLOCK_SIZE;

const generateId = () => Math.floor(10000 + Math.random() * 90000).toString()
const generateRandomX = () => Math.floor(Math.random() * WIDTH_BLOCKS) * BLOCK_SIZE;
const generateRandomY = () => Math.floor(Math.random() * HEIGHT_BLOCKS) * BLOCK_SIZE;
const generateRandomPositions = () => (generateRandomX(), generateRandomY());
const getRandomColor = () => `rgb({}, {}, {})`.replace(/{}/g, () => Math.floor(Math.random() * 256));

const generateFoodPosition = (player_positions) => {
    const maxAttempts = 150;
    let attempts = 0;
    let foodPosition = {
        x: generateRandomX(),
        y: generateRandomY()
    };

    while (player_positions.some(pos => pos.x === foodPosition.x && pos.y === foodPosition.y)) {
        foodPosition = {
            x: generateRandomX(),
            y: generateRandomY()
        };
        attempts += 1

        if (attempts >= maxAttempts) {
            throw new Error("Couldn't generate food position");
        }
    }

    return foodPosition
}

module.exports = {
    BLOCK_SIZE,
    generateId,
    generateRandomX,
    generateRandomY,
    generateRandomPositions,
    getRandomColor,
    generateFoodPosition
};