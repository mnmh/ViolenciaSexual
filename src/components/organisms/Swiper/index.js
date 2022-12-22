// Import Swiper React components
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper";

import Button from "../../atoms/Button";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./styles.css";

export default () => {
  const handleButtonClick = (e) => {
    e.preventDefault();
    document.location = "#sacar-a-flote";
  };

  return (
    <>
      <Swiper
        direction={"vertical"}
        loop={false}
        pagination={{
          clickable: true,
        }}
        spaceBetween={0}
        slidesPerView={1}
        modules={[Pagination]}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <p>acá el contenido</p>
          <Button onClick={handleButtonClick} to="#intro" text="Iniciar" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
