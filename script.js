window.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById('particle-canvas');
  let ctx = canvas.getContext('2d');
  let particlesArray;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function init() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      particlesArray.push({ x, y, size: Math.random() * 2 });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(150,150,150,0.5)';
    for (let i = 0; i < particlesArray.length; i++) {
      let p = particlesArray[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  init();
  animate();
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

  let pieces = document.querySelectorAll('.piece');

  pieces.forEach(piece => {
    const photoBlock = piece.querySelector('.photo-block');
    const randomRotation = (Math.random() - 0.5) * 4;
    gsap.set(photoBlock, {
      rotation: randomRotation,
      scale: 1,
    });

    gsap.to(photoBlock, {
      y: "+=5",
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    photoBlock.addEventListener('click', (e) => {
      e.preventDefault();

      gsap.timeline()
        .to(photoBlock, { scale: 1.05, rotation: "+=2", duration: 0.15, ease: "power2.out" })
        .to(photoBlock, { scale: 1, rotation: "-=2", duration: 0.2, ease: "elastic.out(1, 0.3)" });

      const link = piece.getAttribute('data-link');
      setTimeout(() => {
        window.location.href = link;
      }, 600);
    });

    Draggable.create(photoBlock, {
      bounds: "body",
      inertia: true
    });
  });

  const initSVGAnimation = () => {
    const paths = document.querySelectorAll('#map-sketch path');
    console.log('Detected SVG paths:', paths.length);

    if (paths.length === 0) {
      console.error('No SVG paths found! Check your SVG markup');
      return;
    }

    paths.forEach((path, index) => {
      const pathLength = path.getTotalLength();
      console.log(`Path ${index + 1} length:`, pathLength);

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 0
      });

      const masterTL = gsap.timeline({
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.8
      });

      masterTL
        .to(path, {
          opacity: 1,
          duration: 1.2,
          ease: "power3.out"
        })
        .to(path, {
          strokeDashoffset: 0,
          duration: 4,
          ease: "sine.inOut",
          onStart: () => {
            path.style.willChange = 'stroke-dashoffset, opacity';
          }
        }, "<+0.3")
        .to(path, {
          opacity: 0.4,
          duration: 1.5,
          ease: "circ.inOut"
        }, "-=0.5");
    });
  };


  initSVGAnimation();

  const resizeHandler = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    
    document.querySelectorAll('#map-sketch path').forEach(path => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      });
    });
  };

  window.addEventListener('resize', resizeHandler);
});
