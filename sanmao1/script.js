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

    if (speed !== 0) {
        image.style.transform = `translateX(-50%) translateY(${-scrollAmount * speed}px)`;
    } else {    

    }
  });

  sections.forEach((section, index) => {
    let sectionTop = section.offsetTop;
    let sectionHeight = section.offsetHeight;
    let centerY = scrollTop + windowHeight / 2;

    let quote = section.querySelector('.quote-title');
    let text = section.querySelector('.text-content');
    if (!quote || !text) return;

    let quoteInStart = sectionTop + 0.05 * sectionHeight;
    let quoteStickStart = sectionTop + 0.15 * sectionHeight;
    let quoteStickEnd = sectionTop + 0.35 * sectionHeight;
    let quoteOutEnd = sectionTop + 0.45 * sectionHeight;

    let textInStart, textStickStart, textStickEnd, textOutEnd;

    if (index === 0) {
      const fadeOutStart = sectionTop + 0.3 * sectionHeight; 
      const fadeOutEnd = sectionTop + 0.5 * sectionHeight; 

      const textFadeInStart = sectionTop + 0.4 * sectionHeight; 
      const textFadeInEnd = sectionTop + 0.5 * sectionHeight;
      const textOutStart = sectionTop + 0.8 * sectionHeight; 
      const textOutEnd = sectionTop + 0.95 * sectionHeight; 

      if (scrollTop < quoteInStart) {
        quote.style.opacity = 0;
        quote.style.transform = 'translateY(40px)';
      } else if (scrollTop < quoteStickStart) {
        let p = linearFade(scrollTop, quoteInStart, quoteStickStart);
        quote.style.opacity = p;
        quote.style.transform = `translateY(${40 - 40 * p}px)`;
      } else if (scrollTop < fadeOutStart) {
        quote.style.opacity = 1;
        quote.style.transform = 'translateY(0)';
      } else if (scrollTop < fadeOutEnd) {
        let p = linearFade(scrollTop, fadeOutStart, fadeOutEnd);
        quote.style.opacity = 1 - p;
        quote.style.transform = `translateY(${-50 * p}px)`; 
      } else {
        quote.style.opacity = 0;
        quote.style.transform = 'translateY(-50px)';
      }

      if (scrollTop < textFadeInStart) {
        text.style.opacity = 0;
        text.style.transform = 'translateY(40px)';
      } else if (scrollTop < textFadeInEnd) {
        let p = linearFade(scrollTop, textFadeInStart, textFadeInEnd);
        text.style.opacity = p;
        text.style.transform = `translateY(${40 - 40 * p}px)`;
      } else if (scrollTop < textOutStart) {
        text.style.opacity = 1;
        text.style.transform = 'translateY(0)';
      } else if (scrollTop < textOutEnd) {
        let p = linearFade(scrollTop, textOutStart, textOutEnd);
        text.style.opacity = 1 - p;
        text.style.transform = `translateY(${-30 * p}px)`;
      } else {
        text.style.opacity = 0;
      }

      if (scrollTop < 30) { 
        let pQuoteInitial = linearFade(scrollTop, quoteInStart, quoteStickStart);
         if (scrollTop < quoteInStart) {
            quote.style.opacity = 0;
            quote.style.transform = 'translateY(40px)';
        } else if (scrollTop < quoteStickStart) {
            quote.style.opacity = pQuoteInitial;
            quote.style.transform = `translateY(${40 - 40 * pQuoteInitial}px)`;
        } else {
            quote.style.opacity = 1;
            quote.style.transform = 'translateY(0)';
        }
        
        text.style.opacity = 0;
        text.style.transform = 'translateY(40px)';
        return;
      }
      return;     }

    else {
      textInStart = sectionTop + 0.6 * sectionHeight;
      textStickStart = sectionTop + 0.7 * sectionHeight;
      textStickEnd = sectionTop + 0.9 * sectionHeight;
      textOutEnd = sectionTop + 1.0 * sectionHeight;
    
      if (centerY < quoteInStart) {
        quote.style.opacity = 0;
        quote.style.transform = 'translateY(40px)';
      } else if (centerY < quoteStickStart) {
        let p = linearFade(centerY, quoteInStart, quoteStickStart);
        quote.style.opacity = p;
        quote.style.transform = `translateY(${40 - 40 * p}px)`;
      } else if (centerY < quoteStickEnd) {
        quote.style.opacity = 1;
        quote.style.transform = 'translateY(0)';
      } else if (centerY < quoteOutEnd) {
        let p = linearFade(centerY, quoteStickEnd, quoteOutEnd);
        quote.style.opacity = 1 - p;
        quote.style.transform = `translateY(${-30 * p}px)`;
      } else {
        quote.style.opacity = 0;
      }
    
      let quoteVisible = parseFloat(quote.style.opacity) >= 1;
    
      if (!quoteVisible) {
        text.style.opacity = 0;
        text.style.transform = 'translateY(40px)';
      } else if (centerY < textInStart) {
        text.style.opacity = 0;
        text.style.transform = 'translateY(40px)';
      } else if (centerY < textStickStart) {
        let p = linearFade(centerY, textInStart, textStickStart);
        text.style.opacity = p;
        text.style.transform = `translateY(${40 - 40 * p}px)`;
      } else if (centerY < textStickEnd) {
        text.style.opacity = 1;
        text.style.transform = 'translateY(0)';
      } else if (centerY < textOutEnd) {
        let p = linearFade(centerY, textStickEnd, textOutEnd);
        text.style.opacity = 1 - p;
        text.style.transform = `translateY(${-30 * p}px)`;
      } else {
        text.style.opacity = 0;
      }
    }
    
    if (centerY < textInStart) {
      text.style.opacity = 0;
      text.style.transform = 'translateY(40px)';
    } else if (centerY < textStickStart) {
      let p = linearFade(centerY, textInStart, textStickStart);
      text.style.opacity = p;
      text.style.transform = `translateY(${40 - 40 * p}px)`;
    } else if (centerY < textStickEnd) {
      text.style.opacity = 1;
      text.style.transform = 'translateY(0)';
    } else if (centerY < textOutEnd) {
      let p = linearFade(centerY, textStickEnd, textOutEnd);
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

  let bgm = document.getElementById("bgm");
  let toggle = document.getElementById("muteToggle");
  let iconMuted = document.getElementById("icon-muted");
  let iconUnmuted = document.getElementById("icon-unmuted");

  bgm.muted = true; 
  bgm.play().catch(err => {
    console.warn("Autoplay was prevented:", err);
  });

  toggle.addEventListener("click", () => {
    bgm.muted = !bgm.muted;
    iconMuted.style.display = bgm.muted ? "block" : "none";
    iconUnmuted.style.display = bgm.muted ? "none" : "block";
    if (!bgm.muted && bgm.paused) { 
        bgm.play().catch(err => console.warn("Play after unmute failed:", err));
    }
  });

  iconMuted.style.display = bgm.muted ? "block" : "none";
  iconUnmuted.style.display = bgm.muted ? "none" : "block";

  handleScroll(); 
});

const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) { 
    backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.opacity = 1;
        backToTopBtn.style.pointerEvents = "auto";
    } else {
        backToTopBtn.style.opacity = 0;
        backToTopBtn.style.pointerEvents = "none";
    }
    });
}