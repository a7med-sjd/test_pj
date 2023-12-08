const leftCanvas = document.getElementById('leftCanvas');
const rightCanvas = document.getElementById('rightCanvas');
const gameCanvas = document.getElementById('gameCanvas');
const leftText = document.getElementById('leftText');
const rightText = document.getElementById('rightText');
const ctxLeft = leftCanvas.getContext('2d');
const ctxRight = rightCanvas.getContext('2d');
const ctxGame = gameCanvas.getContext('2d');

const wavesLeft = [
  {
    layers: [
      { amplitude: 20, frequency: 0.02, phase: 0, waveLength: 150, speed: 0.1 },
      { amplitude: 15, frequency: 0.03, phase: 0, waveLength: 100, speed: 0.08 },
      { amplitude: 10, frequency: 0.04, phase: 0, waveLength: 80, speed: 0.12 },
    ],
    seaLevel: { left: 0, right: 0 },
  },
  // Add more waves if needed
];

const wavesRight = [
  {
    layers: [
      { amplitude: 20, frequency: 0.02, phase: 0, waveLength: 150, speed: 0.1 },
      { amplitude: 15, frequency: 0.03, phase: 0, waveLength: 100, speed: 0.08 },
      { amplitude: 10, frequency: 0.04, phase: 0, waveLength: 80, speed: 0.12 },
    ],
    seaLevel: { left: 0, right: 0 },
  },
  // Add more waves if needed
];

function drawWave(ctx, seaLevel, canvasWidth, canvasHeight, layers) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let j = 0; j < layers.length; j++) {
    const layer = layers[j];
    const gradient = ctx.createLinearGradient(0, seaLevel, 0, canvasHeight);

    gradient.addColorStop(0, 'rgba(0, 80, 150, 0.7)');
    gradient.addColorStop(1, 'rgba(0, 80, 150, 0.7)');

    ctx.fillStyle = gradient;

    ctx.beginPath();
    for (let x = 0; x <= canvasWidth; x += 5) {
      const y = seaLevel + layer.amplitude * Math.sin(2 * Math.PI * x / layer.waveLength + layer.frequency * x + layer.phase);
      ctx.lineTo(x, y);
      
    }

    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.lineTo(0, canvasHeight);
    ctx.closePath();

    ctx.fill();
  }
}

function drawGame() {
  ctxGame.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  // Add your game drawing logic here
}

function animateSeaLevels() {
  requestAnimationFrame(animateSeaLevels);

  // Update and draw waves on the left side
  for (let i = 0; i < wavesLeft.length; i++) {
    const wave = wavesLeft[i];
    const seaLevel = wave.seaLevel;

    for (let j = 0; j < wave.layers.length; j++) {
      const layer = wave.layers[j];

      wave.layers[j].phase += 0.8 * layer.speed; // Adjust the speed of the layer
      seaLevel.left += 0.8* layer.speed; // Adjust the speed of the left sea level rise
      seaLevel.right += 0.8 * layer.speed; // Adjust the speed of the right sea level rise

      const canvasWidth = leftCanvas.width;
      const canvasHeight = leftCanvas.height;

      if (i === 0) {
        drawWave(ctxLeft, canvasHeight - seaLevel.left, canvasWidth, canvasHeight, wave.layers);
      }
    }
  }

  // Update and draw waves on the right side
  for (let i = 0; i < wavesRight.length; i++) {
    const wave = wavesRight[i];
    const seaLevel = wave.seaLevel;

    for (let j = 0; j < wave.layers.length; j++) {
      const layer = wave.layers[j];

      wave.layers[j].phase += 0.8 * layer.speed; // Adjust the speed of the layer
      seaLevel.left += 0.4* layer.speed; // Adjust the speed of the left sea level rise
      seaLevel.right += 0.4 * layer.speed; // Adjust the speed of the right sea level rise

      const canvasWidth = rightCanvas.width;
      const canvasHeight = rightCanvas.height;

      if (i === 0) {
        drawWave(ctxRight, canvasHeight - seaLevel.right, canvasWidth, canvasHeight, wave.layers);
      }
    }
  }

  drawGame();
}

function init() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // leftCanvas.height = screenHeight;
  // rightCanvas.height = screenHeight;
  // gameCanvas.height = screenHeight;
  leftCanvas.height = screenHeight *0.7;
  rightCanvas.height = screenHeight *0.7;
  gameCanvas.height = screenHeight ;

  leftCanvas.width = screenWidth * 0.35;
  rightCanvas.width = screenWidth * 0.35;
  gameCanvas.width = screenWidth * 0.3;

  animateSeaLevels();
}

window.addEventListener('resize', init);

init();