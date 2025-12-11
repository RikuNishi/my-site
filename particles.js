const PARTICLE_COUNT = 110;
const CONNECTION_DISTANCE = 140;
const MOUSE_INFLUENCE = 120;
let particles = [];

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(0.2, 1.2));
    this.size = random(2, 4);
  }

  update() {
    const mouseVec = createVector(mouseX, mouseY);
    if (mouseIsPressed || (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height)) {
      const dir = p5.Vector.sub(this.pos, mouseVec);
      const distSq = dir.magSq();
      if (distSq < MOUSE_INFLUENCE * MOUSE_INFLUENCE && distSq > 0.0001) {
        dir.setMag(map(distSq, 0, MOUSE_INFLUENCE * MOUSE_INFLUENCE, 2.5, 0));
        this.vel.add(dir);
      }
    }

    this.pos.add(this.vel);
    this.vel.limit(1.6);
    this.wrap();
  }

  wrap() {
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }

  draw() {
    noStroke();
    fill(98, 245, 255, 220);
    square(this.pos.x, this.pos.y, this.size);
  }
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("particle-canvas");
  canvas.style("display", "block");
  resetSketch();
}

function resetSketch() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    particles.push(new Particle());
  }
}

function draw() {
  background(3, 3, 10);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  drawConnections();
  drawMouseRipple();
}

function drawConnections() {
  stroke(243, 255, 98, 70);
  particles.forEach((a, i) => {
    for (let j = i + 1; j < particles.length; j += 1) {
      const b = particles[j];
      const d = dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y);
      if (d < CONNECTION_DISTANCE) {
        const alpha = map(d, 0, CONNECTION_DISTANCE, 150, 0);
        stroke(98, 245, 255, alpha);
        line(a.pos.x, a.pos.y, b.pos.x, b.pos.y);
      }
    }
  });
}

function drawMouseRipple() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
  noFill();
  stroke(243, 255, 98, 120);
  const radius = (sin(frameCount * 0.05) + 1) * 0.5 * MOUSE_INFLUENCE;
  circle(mouseX, mouseY, radius * 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetSketch();
}
