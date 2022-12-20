import React from 'react';
import axios from 'axios';
import parse, { Element } from 'html-react-parser';
import { Modal } from '../molecules/Modal';

const queryParams = new URLSearchParams(window.location.search);
const page = queryParams.get('page');

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

const parsear = (input) =>
  parse(input, {
    trim: true,
  });

class Page extends React.Component {
  state = {
    blocks: [],
    title: '',
    type: '',
  };
  componentDidMount() {
    axios.get(url + '/' + page).then((response) => {
      const blocks = parser(response.data.content.rendered);
      const title = parser(response.data.title.rendered);
      const type = response.data.type;

      this.setState({ blocks, title, type });
      console.log(blocks[26].props.className);
      console.log(type);
      console.log(parsear(response.data.content.rendered));
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
        {this.state.blocks.map((block, i) => {
          let type = block.type;
          switch (type) {
            case undefined:
              return '';
            case 'figure':
              return (
                <div className='bloque' key={i}>
                  <code className={'bloque: ' + i}>bloque:{i}</code>
                  {block}
                </div>
              );
            default:
              return (
                <code className={'bloque: ' + i} key={i}>
                  bloque:{i}
                </code>
              );
          }
        })}
        <code>React Modal</code>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Modal</p>
        </Modal>
        <button type='button' onClick={this.showModal}>
          Open
        </button>
      </>
    );
  }
}
export default Page;
