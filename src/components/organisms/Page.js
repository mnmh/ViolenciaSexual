import React from "react";
import axios from "axios";
import parse, { Element } from "html-react-parser";

// Swiper
import { Parallax, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Swiper/swiper.css"; // core Swiper
import "./Swiper/pagination/pagination.min.css"; // Pagination module
import { handlerSlideChange } from "../swiperUtils.js";

/* 
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery"; */

import Menu from "../molecules/Menu/index.js"; // Importa el componente de menú

import Mariposa from "../molecules/Mariposa.js";
import BotonInicio from "../molecules/BotonInicio.js";

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
              className="parallax-bg"
              style={{
                backgroundImage:
                  "url(https://museodememoria.gov.co/wp-content/uploads/2022/12/cuerpo.png)",
              }}
              data-swiper-parallax="-100"
            ></div>
            {this.state.blocks.map((block, i) => (
              <SwiperSlide key={`block-${i}`}>
                <div className="block-container">{block}</div>
              </SwiperSlide>
            ))}
            <Mariposa />
          </Swiper>
        </div>

        <Menu goToIndex={this.goToIndex} />
      </>
    );
  }
}

export default Page;
