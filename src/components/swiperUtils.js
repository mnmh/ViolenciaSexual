export const handlerSlideChange = (swiper, currentIndex) => {
  switch (currentIndex) {
    case 0:
      document.body.classList.remove("beige");
      document.body.classList.remove("verde");
      document.body.classList.remove("naranja");
      document.body.classList.add("lila");
      break;
    case 1:
      swiper.slideToLoop(1);
      document.body.classList.remove("lila");
      document.body.classList.remove("lila");
      document.body.classList.remove("verde");
      document.body.classList.remove("naranja");
      document.body.classList.add("beige");
      break;
    case 39: // segundo eje
      swiper.slideToLoop(39);
      document.body.classList.remove("beige");
      document.body.classList.remove("lila");
      document.body.classList.remove("naranja");
      document.body.classList.add("verde");

      break;
    case 68: // tercer eje
      swiper.slideToLoop(68);
      document.body.classList.remove("beige");
      document.body.classList.remove("verde");
      document.body.classList.remove("lila");
      document.body.classList.add("naranja");
      break;
  }
};
