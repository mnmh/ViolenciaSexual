export const handlerSlideChange = (swiper, currentIndex, totalSlides) => {
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
    case 41: // segundo eje
      swiper.slideToLoop(41);
      document.body.classList.remove("beige");
      document.body.classList.remove("lila");
      document.body.classList.remove("naranja");
      document.body.classList.add("verde");

      break;
    case 75: // tercer eje
      swiper.slideToLoop(75);
      document.body.classList.remove("beige");
      document.body.classList.remove("verde");
      document.body.classList.remove("lila");
      document.body.classList.add("naranja");
      break;
    case totalSlides: // última diapo
      window.location.reload();
      break;
  }
};
