export const handlerSlideChange = (
  swiper,
  currentIndex,
  totalSlides,
  handleAction
) => {
  switch (currentIndex) {
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
