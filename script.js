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
  
    // SVG 动画
    const paths = document.querySelectorAll('#map-sketch path');

    paths.forEach(path => {
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;

        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "easeInOut",
            repeat: -1,
            yoyo: true,
            onComplete: () => {
                path.style.strokeDasharray = "none";
                path.style.strokeDashoffset = 0;
            }
        });
    });
});