import React, { Component } from "react";
import Page from "./components/organisms/Page.js";
import Template from "./components/templates/DynamicStyle.js";
import "./App.css";

import Ramas from "./components/atoms/Ramas/index.js"; // Importa el componente de ramas

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
        <Ramas />
        <Template />
        <Page />
      </div>
    );
  }
}

export default App;
