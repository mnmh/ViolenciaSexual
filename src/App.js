import React, { Component } from "react";
import Page from "./components/organisms/Page";
import Template from "./components/templates/DynamicStyle";
//import Borrame from "./components/Borrame";
import "./App.css";

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
      <div className="App">
        {/* <Borrame /> */}
        <Template />
        <Page />
      </div>
    );
  }
}

export default App;
