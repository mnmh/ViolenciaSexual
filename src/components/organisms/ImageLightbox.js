import "react-image-lightbox/style.css";
import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination]);

class ImageLightbox extends React.Component {
  state = {
    images: [],
  };

  handleSlideChange = (swiper) => {
    this.setState({ activeIndex: swiper.realIndex });
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { images, isOpen } = this.props;

    return (
      <div className={`image-lightbox ${isOpen ? "open" : ""}`}>
        <div className="image-lightbox__close" onClick={this.handleClose}>
          X
        </div>
        {/*console.log(images)*/}
        {images.map((src, index) => (
          /* console.log(src), */
          <Lightbox
            index={index}
            images={src}
            isOpen={isOpen}
            onClose={handleClose}
          />
        ))}
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
