"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////////////////
// 007 smooth scrolling
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

//////////////////////////////////////////////////////////////////////
//011 event delegation - page navigation

/* document.querySelectorAll('.nav__link').forEach(function(el) {
    el.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.getAttribute('href');
        console.log(id);
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    });
});   -- not effcient way for 1000 or more */

// using delegation
// 1. add event listner to common parent element
// 2. determine what element orginated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////////////////////////////////////////////////
// 013 Tabbed component

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Guard clause - ignore if we click in another area
  if (!clicked) return;

  // Remove active class
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // Activate tab
  clicked.classList.add("operations__tab--active");

  // Activate content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//////////////////////////////////////////////////
// 014 Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

/* nav.addEventListener('mouseover', function(e) {
    handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function(e) {
    handleHover(e, 1);
}); */

// passing "argument" to handler
nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

/////////////////////////////////////////////////
// 015 Sticky navigation
/* const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function() {
    
    if(window.screenY > initialCoords.top) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}) */

// 016 Sticky navigation: Intersection observer API
/* const obsCallback = function(entries, observer) { 
    entries.forEach(entry => {
        console.log(entry);
        
    });
};

const obsOptions = {
    root: null,
    threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1); */

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
////
// 017 Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//////////////////////////////////////////////////
// 018 lazy loading images
// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// 019 Sliders
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector(".slider");
  // slider.style.transform = "scale(0.5)";
  // slider.style.overflow = "visible";

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goTOSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goTOSlide(curSlide); // -100%, 0%, 100%, 200%  curSlide = 1, i = 0
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goTOSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goTOSlide(0); // 0%, 100%, 200%..
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      curSlide = Number(e.target.dataset.slide);
      goTOSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();

///////////////////////////////////////////////////////////////////////////////////////////////
// 005 selecting, creating and deleting

// selecting elements
/*  console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");
const allSection = document.querySelectorAll(".section");
console.log(allSection);

document.getElementById("section--1");
const allBtn = document.getElementsByTagName("button");
console.log(allBtn);

document.getElementsByClassName("btn");

// creating and insering elements
// .insertAdjacentHTML
const msg = document.createElement("div");
msg.classList.add("cookie-message");
msg.textContent = "We use cookied for improved functionality and analytics.";
msg.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(msg);
header.append(msg);
// header.append(msg.cloneNode(true));
header.before(msg);
header.after(msg);

// Delete element
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    msg.remove();
    // msg.parentElement.removeChild(msg);
  });

// 006 styles, attributes and classes

// style
msg.style.backgroundColor = "#37383d";
msg.style.width = "120%";

console.log(msg.style.height);
console.log(msg.style.backgroundColor);
console.log(getComputedStyle(msg).color);
console.log(getComputedStyle(msg).height);

msg.style.height =
  Number.parseFloat(getComputedStyle(msg).height, 10) + 40 + "px";

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className);
logo.alt = "Beautiful minimalist logo";

// not standard property
console.log(logo.designer);
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");

console.log(logo.src);
console.log(logo.getAttribute("src"));

const link = document.querySelector(".nav__link--btn");
console.log(link.href);
console.log(link.getAttribute("href"));

// data attributes

console.log(logo.dataset.versionNumber);

// classes
/* logo.classList.add();
logo.classList.remove();
logo.classList.toggle();
logo.classList.contains(); */

// don't use it coz it override all existing classes
// logo.className = "rutu";

// 007
/* const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function(e) {
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);

    console.log(e.target.getBoundingClientRect());
    
    console.log('Current scroll(X/Y)', window.pageXOffset, pageYOffset);

    console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
    
    scrolling
    window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

    window.scrollTo({
        left: s1coords.left + window.pageXOffset,
        top: s1coords.top + window.pageYOffset,
        behavior: 'smooth',
    });

    section1.scrollIntoView({behavior: 'smooth'});
}); */

// 008 types of events and event handlers

/*  const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("addEventListener: Great! You are reading the heading!");
};

h1.addEventListener("mouseenter", alertH1);
setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000); */

/* h1.addEventListener('mouseenter', function(e) {
    alert('addEventListener: Great! You are reading the heading!');
}); */

// if we use same method like first here then second one override it
/*h1.onmouseenter = function(e) {
    alert('addEventListener: Great! You are reading the heading!');
}; */

// 010 event propagation
/* const randomInt  = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor(0, 255 ));

document.querySelector('.nav__link').addEventListener('click', function(e) {
    this.style.backgroundColor = randomColor();
    console.log('link', e.target, e.currentTarget);
    console.log(e.currentTarget === this);
    // stop propagation
    e.stopPropagation();
    
});

document.querySelector('.nav__links').addEventListener('click', function(e) {
    this.style.backgroundColor = randomColor();
    console.log('container', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function(e) {
    this.style.backgroundColor = randomColor();
    console.log('nav', e.target, e.currentTarget);
},); */

// 012 DOM Traversing
/* const h1 = document.querySelector('h1');

// going downward: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// going upward: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// going sideways: sibilings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); // to know all sibilings
[...h1.parentElement.children].forEach(function(el) {
    if(el !== h1) el.style.transfrom = 'scale(0.5)';
}); */


///////////////////////////////////////
//021 Lifecycle DOM Events
/* document.addEventListener('DOMContentLoaded', function (e) {
    console.log('HTML parsed and DOM tree built!', e);
  });
  
  window.addEventListener('load', function (e) {
    console.log('Page fully loaded', e);
  });
  
  window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    console.log(e);
    e.returnValue = '';
  }); */