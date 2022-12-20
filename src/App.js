import React, { Component } from 'react';
import Page from './components/organisms/Page';
import ViolenciaSexual from './components/templates/ViolenciaSexual';
import './App.css';

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
      </div>
    );
  }
}

export default App;
