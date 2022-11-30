import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    page: []
  };
  componentDidMount() {
    axios.get("https://museodememoria.gov.co/wp-json/wp/v2/pages/14856").then(response => {
      const pages = response.data;
      this.setState({ page });
      //debugger;
    });
  }
  render() {
    
    return (
      <>
        <ul>
          {this.state.page.map(post => (
            <li key={page.id}>{page.title.rendered}</li>
          ))}
        </ul>
      </>   
    );    
  }
}
export default App;