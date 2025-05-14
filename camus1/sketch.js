let particles = [];
let amount = 800;
let noiseScale = 0.005;
let c1, c2;
let layer;

let quotes = [
  "We must imagine Sisyphus happy.",
  "The struggle itself toward the heights is enough to fill a man’s heart.",
  "There is no fate that cannot be surmounted by scorn.",
  "The absurd man is he who is aware of the conflict but does not give in.",
  "Crushing truths perish from being acknowledged.",
  "At any street corner, the feeling of absurdity can strike any man in the face.",
  "The absurd is born of this confrontation between the human need and the unreasonable silence of the world.",
  "The struggle itself is enough to fill a man’s heart.",
  "Knowing one's destiny and rising above it is the essence of revolt.",
  "A fate is not a punishment; it is a price.",
  "Sisyphus teaches the higher fidelity that negates the gods and raises rocks.",
  "Each atom of that stone, each mineral flake of that night-filled mountain, in itself forms a world.",
  "There is no sun without shadow, and it is essential to know the night.",
];

let currentQuoteIndex = 0;
let lastChangeTime = 0;
let fadeAmount = 0;
let fadeDirection = 1;
let loopCount = 0;
let hasLooped = false;

let ebFont;

function preload() {
  ebFont = loadFont('EBGaramond-VariableFont_wght.ttf'); // 确保路径正确
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(ebFont);
  layer = createGraphics(windowWidth, windowHeight);
  layer.stroke(255);
  layer.noFill();
  layer.strokeWeight(0.8);

  c1 = color("#f0ae4a");
  c2 = color("#b23d0a");
  drawGradientBackground();

  for (let i = 0; i < amount; i++) {
    let pos = createVector(random(width), random(height));
    particles.push({ pos: pos, prev: pos.copy() });
  }

  lastChangeTime = millis();
  fadeAmount = 0;
  fadeDirection = 1;
}

function draw() {
  background(0);
  image(layer, 0, 0);

  let elapsed = millis() - lastChangeTime;
  if (elapsed > 4000 && fadeDirection === 1) {
    fadeDirection = -1;
  }
  if (elapsed > 8000) {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    lastChangeTime = millis();
    fadeDirection = 1;
    fadeAmount = 0;

    if (currentQuoteIndex === 0) {
      loopCount++;
    }

    if (loopCount === 1) {
      hasLooped = true;
    }
  }

  if (fadeDirection === 1) {
    fadeAmount = min(fadeAmount + 3, 255);
  } else {
    fadeAmount = max(fadeAmount - 3, 0);
  }

  fill(255, fadeAmount);
  textAlign(CENTER, CENTER);
  textSize(55);
  textFont(ebFont);
  textWrap(WORD); 

  let quoteBoxWidth = width * 0.6;
  let lineHeight = 45; 
  let words = quotes[currentQuoteIndex].split(" ");
  let estimatedLines = ceil(textWidth(quotes[currentQuoteIndex]) / quoteBoxWidth);
  let quoteBoxHeight = estimatedLines * lineHeight;

  let quoteX = width / 2 - quoteBoxWidth / 2;
  let quoteY = height / 2 - quoteBoxHeight / 2;

text(quotes[currentQuoteIndex], quoteX, quoteY, quoteBoxWidth);
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let prev = p.pos.copy();
    let n = noise(p.pos.x * noiseScale, p.pos.y * noiseScale, frameCount / noiseScale);
    let a = TWO_PI * n;
    p.pos.x += sin(a * random(1, 1.2));
    p.pos.y += cos(a) * map(sin(a / 10), -1, 1, -0.5, 0.5);

    layer.line(prev.x, prev.y, p.pos.x, p.pos.y);
    p.prev = p.pos.copy();

    if (!onScreen(p.pos)) {
      p.pos = createVector(random(width), random(height));
      p.prev = p.pos.copy();
    }
  }
}

function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let n = map(y, 0, height, 0, 1);
    let newc = lerpColor(c1, c2, n);
    stroke(newc);
    line(0, y, width, y);
  }
}

function onScreen(p) {
  return p.x > 0 && p.x < width && p.y > 0 && p.y < height;
}

function windowResized() {
  if (!layer) return; 
  resizeCanvas(windowWidth, windowHeight);
  let oldLayer = layer;
  layer = createGraphics(windowWidth, windowHeight);
  image(oldLayer, 0, 0);
  layer.stroke(255);
  layer.noFill();
  layer.strokeWeight(0.8);
  drawGradientBackground();
}


let instructionTimeout;
let instructionFadeTimeout;
let instructionElement;

function setupInstruction() {
  instructionElement = document.getElementById('instruction');
  instructionElement.style.opacity = '0';
  instructionTimeout = setTimeout(() => {
    fadeInInstruction();
    instructionFadeTimeout = setTimeout(fadeOutInstruction, 5000);
  }, 10000);
}

function fadeInInstruction() {
  let start = null;
  const duration = 1000; 
  
  const animate = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const opacity = Math.min(progress / duration, 1);
    
    instructionElement.style.opacity = opacity;
    if (progress < duration) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
}

function fadeOutInstruction() {
  let start = null;
  const duration = 1000; 
  
  const animate = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const opacity = Math.max(1 - (progress / duration), 0);
    
    instructionElement.style.opacity = opacity;
    
    if (progress < duration) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
}

function init() {
  setupInstruction();
}

function cleanup() {
  clearTimeout(instructionTimeout);
  clearTimeout(instructionFadeTimeout);
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('beforeunload', cleanup);


setTimeout(() => {
  document.getElementById("homeButton").classList.add("visible");
}, 20000);

