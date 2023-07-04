export const handlerSlideChange = (
  swiper,
  currentIndex,
  totalSlides,
  handleAction
) => {
  switch (currentIndex) {
    case 0:
      document.body.style.backgroundColor = "#7a157d";
      break;
    case 1:
      document.body.style.backgroundColor = "#d8b69d";
      break;
    case 51: // segundo eje
      console.log("cambiar a horizontal");
      swiper.changeDirection("horizontal");
      handleAction();
      setTimeout(() => {
        swiper.slideToLoop(51, 1, false);
        console.log("new index: " + currentIndex);
      }, 500);
      swiper.update();
      break;
    case 84: // tercer eje
      console.log("cambiar a vertical");
      swiper.changeDirection("vertical");
      handleAction();
      setTimeout(() => {
        swiper.slideToLoop(84, 1, false);
        console.log("new index: " + currentIndex);
      }, 500);
      swiper.update();
      break;
    case totalSlides: // última diapo
      console.log("cambiar a vertical");
      swiper.changeDirection("vertical");
      handleAction();
      setTimeout(() => {
        window.location.reload();
        console.log("new index: " + currentIndex);
      }, 500);
      swiper.update();
      break;
  }
};
