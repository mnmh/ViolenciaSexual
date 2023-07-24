import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import "swiper/swiper-bundle.css";

import "react-image-lightbox/style.css";
import React from "react";

SwiperCore.use([Navigation, Pagination]);

class ImageLightbox extends React.Component {
  state = {
    activeIndex: 0,
  };

  handleSlideChange = (swiper) => {
    this.setState({ activeIndex: swiper.realIndex });
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { images, isOpen } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className={`image-lightbox ${isOpen ? "open" : ""}`}>
        <div className="image-lightbox__close" onClick={this.handleClose}>
          X
        </div>
        <Swiper
          navigation
          pagination={{ clickable: true }}
          onSlideChange={this.handleSlideChange}
          initialSlide={activeIndex}
        >
          {images.map(
            (src, index) => (
              console.log(src),
              (
                <SwiperSlide key={index}>
                  <img src={src} alt={`Image ${index}`} />
                </SwiperSlide>
              )
            )
          )}
        </Swiper>
      </div>
    );
  }
}

ImageLightbox.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageLightbox;
