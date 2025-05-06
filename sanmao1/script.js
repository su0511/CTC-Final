let sections = [];
let parallaxImages = document.querySelectorAll('.parallax-image');
let ticking = false;

function linearFade(position, start, end) {
  let range = end - start;
  let progress = (position - start) / range;
  return Math.min(Math.max(progress, 0), 1);
}

function handleScroll() {
  let scrollTop = window.scrollY;
  let windowHeight = window.innerHeight;

  parallaxImages.forEach(image => {
    let speed = parseFloat(image.dataset.speed) || 0.5;
    let container = image.closest('.parallax-container');
    if (!container) return;
    let containerTop = container.offsetTop;
    let containerHeight = container.offsetHeight;
    let containerCenter = containerTop + containerHeight / 2;
    let scrollAmount = scrollTop + windowHeight / 2 - containerCenter;

    image.style.transform = `translateX(-50%) translateY(${-scrollAmount * speed}px)`;
  });

  sections.forEach((section, index) => {
    let sectionTop = section.offsetTop;
    let sectionHeight = section.offsetHeight;
    let centerY = scrollTop + windowHeight / 2;

    let quote = section.querySelector('.quote-title');
    let text = section.querySelector('.text-content');

    let quoteInStart = sectionTop + 0.05 * sectionHeight;
    let quoteStickStart = sectionTop + 0.15 * sectionHeight;
    let quoteStickEnd = sectionTop + 0.35 * sectionHeight;
    let quoteOutEnd = sectionTop + 0.45 * sectionHeight;

    let textInStart = sectionTop + 0.45 * sectionHeight;
    let textStickStart = sectionTop + 0.5 * sectionHeight;
    let textStickEnd = sectionTop + 0.7 * sectionHeight;
    let textOutEnd = sectionTop + 1.0 * sectionHeight;

    if (index === 0) {
        textOutEnd = sectionTop + 1.45 * sectionHeight; 
    }
    if (centerY < quoteInStart) {
      quote.style.opacity = 0;
      quote.style.transform = 'translateY(40px)';
    } else if (centerY < quoteStickStart) {
      const p = linearFade(centerY, quoteInStart, quoteStickStart);
      quote.style.opacity = p;
      quote.style.transform = `translateY(${40 - 40 * p}px)`;
    } else if (centerY < quoteStickEnd) {
      quote.style.opacity = 1;
      quote.style.transform = 'translateY(0)';
    } else if (centerY < quoteOutEnd) {
      const p = linearFade(centerY, quoteStickEnd, quoteOutEnd);
      quote.style.opacity = 1 - p;
      quote.style.transform = `translateY(${-30 * p}px)`;
    } else {
      quote.style.opacity = 0;
    }

    if (index === 0 && scrollTop < 30) {
      quote.style.opacity = 1;
      quote.style.transform = 'translateY(0)';
      text.style.opacity = 0;
      text.style.transform = 'translateY(40px)';
      return;
    }

    if (centerY < textInStart) {
      text.style.opacity = 0;
      text.style.transform = 'translateY(40px)';
    } else if (centerY < textStickStart) {
      const p = linearFade(centerY, textInStart, textStickStart);
      text.style.opacity = p;
      text.style.transform = `translateY(${40 - 40 * p}px)`;
    } else if (centerY < textStickEnd) {
      text.style.opacity = 1;
      text.style.transform = 'translateY(0)';
    } else if (centerY < textOutEnd) {
      const p = linearFade(centerY, textStickEnd, textOutEnd);
      text.style.opacity = 1 - p;
      text.style.transform = `translateY(${-30 * p}px)`;
    } else {
      text.style.opacity = 0;
    }
  });

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(handleScroll);
    ticking = true;
  }
});

document.addEventListener("DOMContentLoaded", () => {
    sections = document.querySelectorAll(".parallax-container");
    const bgm = document.getElementById("bgm");
    const toggle = document.getElementById("muteToggle");
    const iconMuted = document.getElementById("icon-muted");
    const iconUnmuted = document.getElementById("icon-unmuted");
  
    bgm.muted = true;
    bgm.play().catch(err => console.warn("Autoplay blocked:", err));
  
    toggle.addEventListener("click", () => {
      bgm.muted = !bgm.muted;

      iconMuted.style.display = bgm.muted ? "block" : "none";
      iconUnmuted.style.display = bgm.muted ? "none" : "block";
    });
  });
  