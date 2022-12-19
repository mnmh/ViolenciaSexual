import React, { Component } from 'react';
import Page from './components/organisms/Page';
import { Modal } from './components/molecules/Modal';
import ViolenciaSexual from './components/templates/ViolenciaSexual';

class App extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
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
      <div className='App'>
        <ViolenciaSexual />
        <Page />
        <code>React Modal</code>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Modal</p>
        </Modal>
        <button type='button' onClick={this.showModal}>
          Open
        </button>
      </div>
    );
  }
}

export default App;
