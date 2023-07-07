import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import parse, { Element } from "html-react-parser";

// Swiper
import { Parallax, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Swiper/swiper.css"; // core Swiper
import "./Swiper/pagination/pagination.min.css"; // Pagination module
import { handlerSlideChange } from "../swiperUtils.js";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import Menu from "../molecules/Menu/index.js"; // Importa el componente de menú

import Mariposa from "../molecules/Mariposa.js";

import Mariposasdecolor from "../atoms/Mariposasdecolor.js";

const queryParams = new URLSearchParams(window.location.search);
const pagina = queryParams.get("pagina");

const url = "https://museodememoria.gov.co/wp-json/wp/v2/pages";

const parser = (input) =>
  parse(input, {
    trim: true,
    replace: (domNode) => {
      if (
        domNode instanceof Element &&
        domNode.attribs.class === "block-container"
      ) {
        return <></>;
      }
    },
  });

class ImageLightbox extends React.Component {
  state = {
    isOpen: false,
    shouldZoomIn: false,
  };

  openLightbox = () => {
    this.setState({ isOpen: true, shouldZoomIn: true });
  };

  closeLightbox = () => {
    this.setState({ isOpen: false });
  };

  handleAfterOpen = () => {
    if (this.state.shouldZoomIn) {
      const zoomInButton = document.querySelector(".ril-zoom-in-button");
      if (zoomInButton) {
        zoomInButton.click();
      }
      this.setState({ shouldZoomIn: false });
    }
  };

  render() {
    const { src } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        <div onClick={this.openLightbox}>
          <img className="imagen-zoomeable" src={src} alt="Imagen" />
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={src}
            onCloseRequest={this.closeLightbox}
            enableZoom={true}
            defaultZoomStep={2} // Establecer el zoom inicial en 200% (valor de escala 2)
            onAfterOpen={this.handleAfterOpen}
          />
        )}
      </>
    );
  }
}

class Page extends React.Component {
  state = {
    blocks: [],
    title: "",
    type: "",
  };

  toggleVisibility = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible,
    }));
  };

  componentDidMount() {
    axios.get(url + "/" + pagina).then((response) => {
      const blocks = parser(response.data.content.rendered);
      const title = parser(response.data.title.rendered);
      const type = response.data.type;

      this.setState({ blocks, title, type });
    });
  }

  goToIndex = (index) => {
    const { swiper } = this.state;
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  render() {
    const { visible } = this.state;

    const data = [
      // El arreglo de objetos proporcionado
      // ...
    ];

    const srcValues = data.reduce((accumulator, block) => {
      if (block.props && block.props.children) {
        block.props.children.forEach((child) => {
          if (child.props && child.props.src) {
            accumulator.push(child.props.src);
          }
        });
      }
      return accumulator;
    }, []);

    return (
      <>
        <div id="progress-bar"></div>
        {/* <MenuLineas /> */}
        <div className="container">
          <Swiper
            centeredSlides={true}
            observer={true}
            keyboard={true}
            direction={"vertical"}
            loop={false}
            spaceBetween={0}
            slidesPerView={1}
            cssMode={true}
            parallax={true}
            modules={[Parallax, Pagination]}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 5,
              type: "bullets",
            }}
            onSlideChange={(swiper) => {
              this.setState({ swiper }); // Almacenar la instancia del swiper en el estado
              const currentIndex = swiper.realIndex;
              const totalSlides = swiper.slides.length - 1;

              handlerSlideChange(
                swiper,
                currentIndex,
                totalSlides,
                this.handleAction
              );
              console.log(currentIndex);
              document.querySelectorAll("audio").forEach((el) => el.pause());
              document.querySelectorAll("video").forEach((el) => el.pause());
            }}
          >
            <Mariposasdecolor visible={visible} />
            <div
              slot="container-start"
              className="parallax-bg cuerpo1"
              data-swiper-parallax="-200%"
            ></div>
            <div
              slot="container-start"
              className="parallax-bg cuerpo2"
              data-swiper-parallax="-200%"
            ></div>
            <div
              slot="container-start"
              className="parallax-bg cuerpo3"
              data-swiper-parallax="-200%"
            ></div>
            {this.state.blocks.map((block) => {
              if (block.type === "figure") {
                const srcValues = [];
                const traverseChildren = (children) => {
                  if (children) {
                    React.Children.toArray(children).forEach((child) => {
                      if (child.props && child.props.src) {
                        srcValues.push(child.props.src);
                      }
                      traverseChildren(child.props && child.props.children);
                    });
                  }
                };
                traverseChildren(block.props && block.props.children);

                return (
                  <SwiperSlide key={block.key}>
                    {srcValues.map((src, index) => (
                      <div key={index}>
                        {block}
                        <ImageLightbox src={src} />
                      </div>
                    ))}
                  </SwiperSlide>
                );
              } else {
                return (
                  <SwiperSlide key={block.key}>
                    <div className="block-container mt-50">{block}</div>
                  </SwiperSlide>
                );
              }
            })}

            <Mariposa />
          </Swiper>
        </div>

        <Menu goToIndex={this.goToIndex} />
      </>
    );
  }
}

export default Page;
