import React from "react";
import axios from "axios";
import parse, { Element } from "html-react-parser";
import ImageLightbox from "./ImageLightbox.js";

// Swiper
import { Parallax, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Swiper/swiper.css"; // core Swiper
import "./Swiper/pagination/pagination.min.css"; // Pagination module
import { handlerSlideChange } from "../swiperUtils.js";

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
        return domNode; // Devuelve el nodo original en lugar de un fragmento vacío
      }
    },
  });
class Page extends React.Component {
  state = {
    blocks: [],
    title: "",
    type: "",
    lightboxImages: [], // Agrega un estado para almacenar las imágenes de la galería
    isOpen: false, // Agrega un estado para indicar si la galería está abierta o no
  };

  componentDidMount() {
    axios.get(url + "/" + pagina).then((response) => {
      const blocks = parser(response.data.content.rendered);
      const title = parser(response.data.title.rendered);
      const type = response.data.type;

      this.setState({
        blocks,
        title,
        type,
      });
    });
  }

  goToIndex = (index) => {
    const { swiper } = this.state;
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  render() {
    const { visible, blocks, title, type, lightboxImages, isOpen } = this.state;

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
              if (
                block.props &&
                block.props.className &&
                block.props.className.includes(
                  "wp-block-gallery has-nested-images"
                )
              ) {
                console.log("include wp-block-gallery has-nested-images");

                // Extraer los atributos src de cada imagen del objeto block
                const lightboxImages = blocks.reduce((acc, block) => {
                  if (
                    block.props &&
                    block.props.className &&
                    block.props.className.includes(
                      "wp-block-gallery has-nested-images"
                    )
                  ) {
                    console.log("include wp-block-gallery has-nested-images");

                    // Check that block.props.children is an array before calling filter
                    if (Array.isArray(block.props.children)) {
                      const imgs = block.props.children.filter(
                        (child) => child.type === "img"
                      );
                      const srcs = imgs.map((img) => img.props.src);
                      return [...acc, ...srcs];
                    }
                  }
                  return acc;
                }, []);

                return (
                  <SwiperSlide key={`has-nested-images-${block.key}`}>
                    <button
                      type="button"
                      onClick={() => this.setState({ isOpen: true })}
                    >
                      Open Lightbox
                    </button>

                    <ImageLightbox
                      images={lightboxImages}
                      isOpen={this.state.isOpen}
                      onClose={() => this.setState({ isOpen: false })}
                    />

                    {/* {block}*/}
                  </SwiperSlide>
                );
              } else {
                return <SwiperSlide key={block.key}>{block}</SwiperSlide>;
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
