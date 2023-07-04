export const handlerSlideChange = (
  swiper,
  currentIndex,
  totalSlides,
  handleAction
) => {
  switch (currentIndex) {
    case 0:
      document.body.classList.remove("beige");
      document.body.classList.remove("verde");
      document.body.classList.remove("naranja");
      document.body.classList.add("lila");
      break;
    case 1:
      // Eliminar la clase 'hide' del elemento HTML correspondiente
      const elementToUnhide = document.getElementById("menu-especial");
      if (elementToUnhide) {
        elementToUnhide.classList.remove("hide");
      }
      // console.log("cambiar a vertical");
      swiper.changeDirection("vertical");
      handleAction();
      setTimeout(() => {
        swiper.slideToLoop(1);
        // console.log("new index: " + currentIndex);
      }, 500);
      document.body.classList.remove("lila");
      document.body.classList.remove("lila");
      document.body.classList.remove("verde");
      document.body.classList.remove("naranja");
      document.body.classList.add("beige");
      swiper.update();
      break;
    case 45: // segundo eje
      // console.log("cambiar a horizontal");
      swiper.changeDirection("horizontal");
      handleAction();
      setTimeout(() => {
        swiper.slideToLoop(45);
        // console.log("new index: " + currentIndex);
      }, 500);
      document.body.classList.remove("beige");
      document.body.classList.remove("lila");
      document.body.classList.remove("naranja");
      document.body.classList.add("verde");
      swiper.update();
      break;
    case 77: // tercer eje
      // console.log("cambiar a vertical");
      swiper.changeDirection("vertical");
      handleAction();
      setTimeout(() => {
        swiper.slideToLoop(77);
        // console.log("new index: " + currentIndex);
      }, 500);
      document.body.classList.remove("beige");
      document.body.classList.remove("verde");
      document.body.classList.remove("lila");
      document.body.classList.add("naranja");
      swiper.update();
      break;
    case totalSlides: // última diapo
      // console.log("cambiar a vertical");
      swiper.changeDirection("vertical");
      handleAction();
      setTimeout(() => {
        window.location.reload();
        // console.log("new index: " + currentIndex);
      }, 500);
      swiper.update();
      break;
  }
};
