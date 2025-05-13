let balls = [];
let colors = ["#313715", "#939F5C", "#BBCE8A", "#E2F9B8"];

class Ball {
    constructor(p, v, a, r) {
        this.p = p;
        this.v = v;
        this.a = a;
        this.r = r;
        this.color = random(colors);
        this.rotateFactor = random(-PI, PI);
    }

    update() {
        this.p.add(this.v);
        this.v.add(this.a);
        this.r *= 0.96;
        this.v.mult(0.99);

        this.v.x = map(random(-1, 1), 0, 1, -1, 1);
        this.v.y = map(random(-1, 1), 0, 1, -1, 1);

        this.v.rotate(this.rotateFactor);
    }

    draw() {
        fill(this.color);
        noStroke();
        circle(this.p.x, this.p.y, this.r);
        circle(this.p.x, this.p.y + random(10) * this.r, this.r);
    }
}

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('container'); // Make the canvas inside the container.
    background("#697F41");

    for (let x = 0; x < width; x += 50) {
        for (let y = 0; y < height; y += 50) {
            let newBall = new Ball(
                createVector(x, y),
                createVector(3, 0).rotate(PI),
                createVector(0, 0),
                6
            );
            balls.push(newBall);
        }
    }
}

function draw() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].draw();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function enterSite() {
    const intro = document.getElementById('intro-screen');
    intro.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = "second.html"; // 可替换为内部锚点或内容切换
    }, 1000); // 与 CSS 动画时间一致
  }