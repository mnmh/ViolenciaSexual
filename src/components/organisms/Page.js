import React from "react";
import axios from "axios";
import parse, { Element } from "html-react-parser";

// Swiper
import { Parallax } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Swiper/swiper.css"; // core Swiper
import { handlerSlideChange } from "../swiperUtils.js";

/* 
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery"; */

import Menu from "../molecules/Menu/index.js"; // Importa el componente de menú
import Mariposa from "../molecules/Mariposa.js";

const queryParams = new URLSearchParams(window.location.search);
const pagina = queryParams.get("pagina");

const url = "https://museodememoria.gov.co/wp-json/wp/v2/pages";

const parser = (input) =>
  parse(input, {
    trim: true,
    replace: (domNode) => {
      if (
        domNode instanceof Element &&
        domNode.attribs.class === "imagen-modal"
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
  handleAction = () => {
    this.setState({ isVisible: true });
    setTimeout(() => {
      this.setState({ isVisible: false });
    }, 1500);
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
    } else {
      setTimeout(() => {
        this.goToIndex(index);
      }, 100);
    }
  };

  render() {
    const { isVisible } = this.state;

    return (
      <>
        <div id="progress-bar"></div>
        {/* <MenuLineas /> */}
        <div className="container">
          <Swiper
            observer={true}
            direction={"vertical"}
            loop={false}
            spaceBetween={0}
            slidesPerView={1}
            cssMode={true}
            parallax={true}
            modules={[Parallax]}
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
            <div
              slot="container-start"
              className="parallax-bg"
              style={{
                backgroundImage:
                  "url(https://museodememoria.gov.co/wp-content/uploads/2022/12/cuerpo.png)",
              }}
              data-swiper-parallax="-100%"
            ></div>
            {this.state.blocks.map((block, i) => (
              <SwiperSlide key={`block-${i}`}>
                <div className="block-container">{block}</div>
              </SwiperSlide>
            ))}
            <Mariposa />
          </Swiper>
        </div>
        {isVisible && <div className="cortina backgroundAnimated"></div>}
        <Menu goToIndex={this.goToIndex} />
      </>
    );
  }
}

export default Page;
