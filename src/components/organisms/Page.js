import React from "react";
import axios from "axios";
import parse, { Element } from "html-react-parser";
import Lightbox from "./Lightbox";

// Core modules imports are same as usual
import { Parallax, Pagination } from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

// Swiper
import "./Swiper/swiper.css"; // core Swiper
import "./Swiper/pagination/pagination.min.css"; // Pagination module

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
  componentDidMount() {
    axios.get(url + "/" + pagina).then((response) => {
      const blocks = parser(response.data.content.rendered);
      const title = parser(response.data.title.rendered);
      const type = response.data.type;

      this.setState({ blocks, title, type });
      //console.log(blocks[26].props.className);
      console.log(blocks[8]);
      //console.log(parsear(response.data.content.rendered));
    });

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <>
        <div className="container">
          <Swiper
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
            onSlideChange={(swiper) =>
              console.log("bloque: " + swiper.realIndex)
            }
            //onSwiper={(swiper) => console.log(swiper)}
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
              <>
                {block.props.className ===
                "wp-block-gallery columns-3 is-cropped imagen-modal" ? (
                  <SwiperSlide key={block.key}>
                    <img
                      width="100%"
                      height="auto"
                      src={
                        block.props.children.props.children[0].props.children
                          .props.children[0].props["data-full-url"]
                      }
                    />{" "}
                    <Lightbox />
                  </SwiperSlide>
                ) : (
                  <SwiperSlide key={block.key}>
                    <div className="block-container mt-50">{block}</div>
                  </SwiperSlide>
                )}
              </>
            ))}
          </Swiper>
        </div>
      </>
    );
  }
}
export default Page;
