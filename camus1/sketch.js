let particles = [];
let amount = 800;
let noiseScale = 0.005;
let c1, c2;
let layer; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  layer = createGraphics(windowWidth, windowHeight);
  layer.stroke(255); 
  layer.noFill();
  layer.strokeWeight(0.8);

  c1 = color("#f0ae4a");
  c2 = color("#b23d0a");
  drawGradientBackground(); 

  for (let i = 0; i < amount; i++) {
    let pos = createVector(random(width), random(height));
    particles.push({
      pos: pos,
      prev: pos.copy()
    });
  }
}

function draw() {
  image(layer, 0, 0);

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
  return p.x > 0 && p.x < width && p.y > 0 && p.y > 0 && p.y < height;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  let oldLayer = layer;
  layer = createGraphics(windowWidth, windowHeight);
  layer.image(oldLayer, 0, 0);
  layer.stroke(100, 50, 0);
  layer.noFill();
  layer.strokeWeight(0.5);

  drawGradientBackground(); 
}
