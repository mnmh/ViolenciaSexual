import React from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import { Modal } from '../molecules/Modal';

const url = 'https://museodememoria.gov.co/wp-json/wp/v2/pages';
const page = '14941';

class Page extends React.Component {
  state = {
    blocks: [],
    title: '',
    classValue: '',
    show: false,
  };
  componentDidMount() {
    axios.get(url + '/' + page).then((response) => {
      const blocks = parse(response.data.content.rendered);
      const title = parse(response.data.title.rendered);
      this.setState({ blocks, title });
    });
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    console.log(this.state);
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
        {this.state.blocks.map((block, i) =>
          !block.type ? (
            ''
          ) : (
            <div className='bloque' key={i}>
              <code className='id'>posición:{i}</code>
              {block}
            </div>
          )
        )}
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
