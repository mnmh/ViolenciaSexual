import React from 'react';
import axios from 'axios';
import parse, { Element } from 'html-react-parser';
import { Modal } from '../molecules/Modal';

import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import './Swiper/styles.css';

const queryParams = new URLSearchParams(window.location.search);
const pagina = queryParams.get('pagina');

const url = 'https://museodememoria.gov.co/wp-json/wp/v2/pages';

const parser = (input) =>
  parse(input, {
    trim: true,
    replace: (domNode) => {
      if (
        domNode instanceof Element &&
        domNode.attribs.class === 'imagen-modal'
      ) {
        return <></>;
      }
    },
  });

class Page extends React.Component {
  state = {
    blocks: [],
    title: '',
    type: '',
  };
  componentDidMount() {
    axios.get(url + '/' + pagina).then((response) => {
      const blocks = parser(response.data.content.rendered);
      const title = parser(response.data.title.rendered);
      const type = response.data.type;

      this.setState({ blocks, title, type });
      //console.log(blocks[26].props.className);
      console.log(blocks);
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
        <div className='container'>
          {this.state.blocks.map((block, i) => {
            let id = block.props.id;
            //let className = block.props.className;
            if (!id) {
              return (
                <div className='bloque noid' key={i}>
                  <code className='id'>posición:{i}</code>
                  {block}
                </div>
              );
            } else {
              switch (id) {
                case 'slider-intro':
                  return (
                    <>
                      {/* <!-- Slider main container --> */}

                      <Swiper
                        className={'intro'}
                        direction={'vertical'}
                        loop={false}
                        pagination={{
                          clickable: false,
                        }}
                        spaceBetween={0}
                        slidesPerView={1}
                        modules={[Pagination]}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                      >
                        <SwiperSlide>{block}</SwiperSlide>
                        <div className='bgAnimated'>
                          <img
                            alt='bg'
                            src='https://museodememoria.gov.co/wp-content/uploads/2022/12/path-8332.png'
                          />
                        </div>
                      </Swiper>
                    </>
                  );
                default:
                  return (
                    <div className='bloque default' key={i}>
                      <code className='id'>posición:{i}</code>
                      {block}
                    </div>
                  );
              }
            }
          })}
          <code>React Modal</code>
          <Modal show={this.state.show} handleClose={this.hideModal}>
            <p>Modal</p>
          </Modal>
          <button type='button' onClick={this.showModal}>
            Open
          </button>
        </div>
      </>
    );
  }
}
export default Page;
