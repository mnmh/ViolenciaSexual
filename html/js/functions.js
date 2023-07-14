let butterfly = document.querySelector("#butterfly");
let play = document.querySelector(".btn-reproducir");

let animateWing = function () {
  if (butterfly.classList.contains("animation")) {
    butterfly.classList.remove("animation");
    butterfly.classList.add("no-animation");
  } else if (butterfly.classList.contains("no-animation")) {
    butterfly.classList.add("animation");
    butterfly.classList.remove("no-animation");
  }
};

play.addEventListener("click", animateWing);

let mask = document.querySelector(".mask");

let openMask = function () {
  mask.classList.add("mask-open");
};

mask.addEventListener("click", openMask);

/***IMAGES ZOOM****/

// use your mousewheel to zoom in 🔍

console.clear();

const image = document.querySelectorAll(".image")[0];
const zoom = document.querySelectorAll(".zoom")[0];
const zoomImage = document.querySelectorAll(".zoom-image")[0];

let clearSrc;
let zoomLevel = 1;

const images = [
  {
    thumb: "../img/cartografia-8-thumb.jpg",
    hires: "../img/cartografia-8.jpg",
  },
  {
    thumb: "../img/cartografia-8-thumb.jpg",
    hires: "../img/cartografia-8.jpg",
  },
  {
    thumb: "../img/cartografia-8-thumb.jpg",
    hires: "../img/cartografia-8.jpg",
  },
  {
    thumb: "../img/cartografia-8-thumb.jpg",
    hires: "../img/cartografia-8.jpg",
  },
  {
    thumb: "../img/cartografia-8-thumb.jpg",
    hires: "../img/cartografia-8.jpg",
  },
];

// set to random image
let img = images[Math.floor(Math.random() * images.length)];

image.getElementsByTagName("a")[0].setAttribute("href", img.hires);
image.getElementsByTagName("img")[0].setAttribute("src", img.thumb);

const preloadImage = (url) => {
  let img = new Image();
  img.src = url;
};

preloadImage(img.hires);

const enterImage = function (e) {
  zoom.classList.add("show", "loading");
  clearTimeout(clearSrc);

  let posX,
    posY,
    touch = false;

  if (e.touches) {
    posX = e.touches[0].clientX;
    posY = e.touches[0].clientY;
    touch = true;
  } else {
    posX = e.clientX;
    posY = e.clientY;
  }

  touch
    ? (zoom.style.top = `${posY - zoom.offsetHeight / 1.25}px`)
    : (zoom.style.top = `${posY - zoom.offsetHeight / 2}px`);
  zoom.style.left = `${posX - zoom.offsetWidth / 2}px`;

  let originalImage = this.getElementsByTagName("a")[0].getAttribute("href");

  zoomImage.setAttribute("src", originalImage);

  // remove the loading class
  zoomImage.onload = function () {
    console.log("hires image loaded!");
    setTimeout(() => {
      zoom.classList.remove("loading");
    }, 500);
  };
};

const leaveImage = function () {
  // remove scaling to prevent non-transition
  zoom.style.transform = null;
  zoomLevel = 1;
  zoom.classList.remove("show");
  clearSrc = setTimeout(() => {
    zoomImage.setAttribute("src", "");
  }, 250);
};

const move = function (e) {
  e.preventDefault();

  let posX,
    posY,
    touch = false;

  if (e.touches) {
    posX = e.touches[0].clientX;
    posY = e.touches[0].clientY;
    touch = true;
  } else {
    posX = e.clientX;
    posY = e.clientY;
  }

  // move the zoom a little bit up on mobile (because of your fat fingers :<)
  touch
    ? (zoom.style.top = `${posY - zoom.offsetHeight / 1.25}px`)
    : (zoom.style.top = `${posY - zoom.offsetHeight / 2}px`);
  zoom.style.left = `${posX - zoom.offsetWidth / 2}px`;

  let percX = (posX - this.offsetLeft) / this.offsetWidth,
    percY = (posY - this.offsetTop) / this.offsetHeight;

  let zoomLeft = -percX * zoomImage.offsetWidth + zoom.offsetWidth / 2,
    zoomTop = -percY * zoomImage.offsetHeight + zoom.offsetHeight / 2;

  zoomImage.style.left = `${zoomLeft}px`;
  zoomImage.style.top = `${zoomTop}px`;
};

image.addEventListener("mouseover", enterImage);
image.addEventListener("touchstart", enterImage);

image.addEventListener("mouseout", leaveImage);
image.addEventListener("touchend", leaveImage);

image.addEventListener("mousemove", move);
image.addEventListener("touchmove", move);

image.addEventListener("wheel", (e) => {
  e.preventDefault();
  e.deltaY > 0 ? zoomLevel-- : zoomLevel++;

  if (zoomLevel < 1) zoomLevel = 1;
  if (zoomLevel > 5) zoomLevel = 5;

  console.log(`zoom level: ${zoomLevel}`);
  zoom.style.transform = `scale(${zoomLevel})`;
});
