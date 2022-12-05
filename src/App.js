import React, { Component } from 'react';
//import Posts from './components/Posts';
import Page from './components/Page';
import P5 from './components/P5.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <P5 />
        <Page />
      </div>
    );
  }
}

export default App;
