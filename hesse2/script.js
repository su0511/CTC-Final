let pages = [
  {
      quote: "But though the paths led away from the ego, in the end they always led back to the ego.",
      content: "Siddhartha forsakes his comfortable Brahmin home in youth and, with his friend Govinda, joins the ascetic Samanas in a quest for enlightenment. In the quiet depths of the forest, he subjects himself to austere rituals—fasting, self-denial, and deep meditation—in an effort to transcend the self. Yet for all his fervent renunciation, Siddhartha finds his journey circling back upon itself – each attempt to annihilate the ego only leads him to confront his self anew."
  },
  {
      quote: "Nonetheless, my love, you have remained a shramana, nonetheless you do not love me, you love no human being.",
      content: "Upon meeting the elegant courtesan Kamala, Siddhartha leaves the forest and steps for the first time into the world of sensual love. In Kamala’s company he indulges in passion and worldly delights, yet a part of him remains detached and observant. Even as he experiences the joys of love, Siddhartha feels like a spectator to his own life – giving himself to pleasure but never truly losing himself in it, his soul still quietly yearning for a deeper fulfillment."
  },
  {
      quote: "He always seems to be playing at business, it never makes much impression on him... He is never worried about a loss.",
      content: "With Kamala’s guidance, Siddhartha apprentices under the wealthy merchant Kamaswami and enters the bustle of commerce. He brings the wisdom of his ascetic years into the marketplace: he can fast when hungry, wait patiently through setbacks, and remains unruffled by success or failure. Amid the clamor of trade, Siddhartha performs the motions of business yet treats it all as a game – wealth and profit never truly claim his heart."
  },
  {
      quote: "Alone he stood there and empty like a castaway on the shore.",
      content: "As years pass, Siddhartha lives a life of extravagant wealth. Yet an increasing emptiness gnaws at him; the lightness of his spirit has been replaced by the heaviness of worldly fatigue. He dreams of a songbird dying in its cage and awakens to realize that his own spirit, is suffocating."
  },
  {
      quote: "Now he, Siddhartha, had also become completely a childlike person... Now he too felt.",
      content: "Sickened by city life, Siddhartha finally leaves it behind and becomes a humble ferryman on a river. Fate then brings him an unexpected charge, his young son is left in Siddhartha’s care. Siddhartha experiences for the first time the anxious, profound love of a father. But young Siddhartha, eventually runs away back to the city. Losing his son plunges Siddhartha into the same anguish that ordinary people suffer – he frantically searches for the boy to no avail, and the ache of love becomes a wound in his soul."
  }
];

let currentPageIndex = 0;
const quoteBox = document.getElementById('quoteBox');
const textContainer = document.getElementById('textContainer');
const prevPageArrow = document.getElementById('prev-page-arrow');
const nextPageArrow = document.getElementById('next-page-arrow');
const finalJumpArrow = document.getElementById('final-jump-arrow');
const body = document.body;
const pageDots = document.getElementById('pageDots');

let timeoutId = null;

let currentPage = 0;
let totalPages = pages.length;
let charIndex = 0;
let typingSpeed = 0.2;
let displayedQuote = "";
let quoteFinished = false;
let contentShown = false;

function setup() {
  noCanvas();
  loadPage(currentPage);
  createPageDots();

  prevPageArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentPage > 0) {
      currentPage--;
      loadPage(currentPage);
    }
  });

  nextPageArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentPage < totalPages - 1) {
      currentPage++;
      loadPage(currentPage);
    }
  });

  finalJumpArrow.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "../hesse3/index.html";
    }, 500);
  });
}

function draw() {
  if (!quoteFinished) {
    let quoteText = pages[currentPage].quote;
    let wave = map(sin(frameCount * 0.15), -1, 1, 2, 7);
    if (frameCount % int(wave) === 0) {
      if (charIndex < quoteText.length) {
        displayedQuote += quoteText[charIndex];
        quoteBox.innerHTML = displayedQuote;
        charIndex++;
      } else {
        quoteFinished = true;
        setTimeout(() => {
          textContainer.innerHTML = pages[currentPage].content;
          textContainer.style.opacity = "1";
          contentShown = true;
          pageDots.classList.add("hidden"); 
        }, 400);
      }
    }
  }
}

function updatePage() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  body.className = `page-${currentPage + 1}`;

  if (currentPage === 0) {
    prevPageArrow.style.display = "none";
    nextPageArrow.style.display = "block";
    finalJumpArrow.style.display = "none";
  } else if (currentPage === totalPages - 1) {
    prevPageArrow.style.display = "block";
    nextPageArrow.style.display = "none";
    finalJumpArrow.style.display = "none";

    timeoutId = setTimeout(() => {
      finalJumpArrow.style.display = "block";
      finalJumpArrow.classList.add("visible");
    }, 10000);
  } else {
    prevPageArrow.style.display = "block";
    nextPageArrow.style.display = "block";
    finalJumpArrow.style.display = "none";
  }
}

function createPageDots() {
  pageDots.innerHTML = "";

  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('page-dot');
    if (i === currentPage) dot.classList.add('active');

    dot.addEventListener('click', () => {
      currentPage = i;
      loadPage(currentPage);
    });

    pageDots.appendChild(dot);
  }
}

function updatePageDots() {
  const dots = document.querySelectorAll('.page-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentPage);
  });
}

function loadPage(index) {
  if (index >= 0 && index < pages.length) {
    currentPage = index;
    let currentPageData = pages[index];

    quoteBox.textContent = currentPageData.quote;
    textContainer.textContent = currentPageData.content;
    body.className = `page-${index + 1}`;
    textContainer.style.opacity = 0;

    quoteBox.classList.add('has-letter-spacing');
    textContainer.classList.add('has-letter-spacing');

    charIndex = 0;
    displayedQuote = "";
    quoteFinished = false;
    contentShown = false;

    quoteBox.innerHTML = "";
    textContainer.innerHTML = "";

    pageDots.classList.remove("hidden");

    updatePage();
    createPageDots();
    updatePageDots();
  }
}
