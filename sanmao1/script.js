// scrollLogic.js or your script.js file

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

    // Ensure fixed images don't get this transform if their speed is 0
    if (speed !== 0) {
        image.style.transform = `translateX(-50%) translateY(${-scrollAmount * speed}px)`;
    } else {
        // For fixed images, ensure they are correctly positioned if needed
        // Or that their initial CSS positioning is sufficient.
        // If they are meant to be truly fixed relative to the viewport while scrolling,
        // their transform should not be updated based on scroll.
        // The 'fixed-image' class itself in CSS doesn't make it viewport-fixed,
        // it just negates the parallax scroll effect.
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
      const fadeOutStart = sectionTop + 0.3 * sectionHeight; // quote 开始向上消失的位置
      const fadeOutEnd = sectionTop + 0.5 * sectionHeight;   // quote 向上消失结束的位置

      // MODIFIED TIMING FOR FIRST SECTION TEXT:
      const textFadeInStart = sectionTop + 0.4 * sectionHeight; // Text starts appearing sooner
      const textFadeInEnd = sectionTop + 0.5 * sectionHeight;   // Text fully visible sooner
      const textOutStart = sectionTop + 0.8 * sectionHeight;  // Adjusted to match earlier appearance
      const textOutEnd = sectionTop + 0.95 * sectionHeight; // Adjusted to match earlier appearance


      // quote 动画
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
        quote.style.transform = `translateY(${-50 * p}px)`; // 向上移动
      } else {
        quote.style.opacity = 0;
        quote.style.transform = 'translateY(-50px)';
      }

      // text-content 动画
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

      // 顶部硬性复位
      if (scrollTop < 30) { // You might want to adjust this threshold based on the new timings
        // Ensure initial state for quote is correct based on its own animation logic
        // For example, if quoteInStart is very low.
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
        // If quote is meant to be visible from the very top (scrollTop < quoteInStart condition is met)
        // quote.style.opacity = 1; 
        // quote.style.transform = 'translateY(0)';

        text.style.opacity = 0;
        text.style.transform = 'translateY(40px)';
        // ⚠️ The return below is important; let's ensure it's still needed
        // or if the general text animation logic should also apply after this initial reset.
        // Given the original code, this return prevents the general text logic from running for index 0
        // if scrollTop < 30. This should be fine.
        return;
      }
      return; // This return prevents the generic text animation logic from running for section 0
    }

    else {
      textInStart = sectionTop + 0.6 * sectionHeight;
      textStickStart = sectionTop + 0.7 * sectionHeight;
      textStickEnd = sectionTop + 0.9 * sectionHeight;
      textOutEnd = sectionTop + 1.0 * sectionHeight;
    
      // quote 动画控制（去除等待上一段文字消失的限制）
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
    
    // text 动画通用 (Generic text animation for sections other than index 0, or if the return for index 0 is removed)
    // This block is currently NOT reached by index === 0 due to the 'return;' statement above.
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

  // Consider making autoplay contingent on user interaction if strict autoplay policies are an issue
  bgm.muted = true; // Start muted
  bgm.play().catch(err => {
    console.warn("Autoplay was prevented:", err);
    // You might want to show a play button or prompt the user to enable sound.
  });

  toggle.addEventListener("click", () => {
    bgm.muted = !bgm.muted;
    iconMuted.style.display = bgm.muted ? "block" : "none";
    iconUnmuted.style.display = bgm.muted ? "none" : "block";
    if (!bgm.muted && bgm.paused) { // If unmuting and was paused (e.g., due to autoplay restriction)
        bgm.play().catch(err => console.warn("Play after unmute failed:", err));
    }
  });

  // Initialize icons based on muted state
  iconMuted.style.display = bgm.muted ? "block" : "none";
  iconUnmuted.style.display = bgm.muted ? "none" : "block";

  // Initial call to set positions if needed, though scroll usually handles it
  handleScroll(); 
});

// 返回顶部按钮 (Back to top button)
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) { // Check if the button exists
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