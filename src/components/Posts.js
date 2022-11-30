import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    posts: []
  };
  componentDidMount() {
    axios.get("https://museodememoria.gov.co/wp-json/wp/v2/posts").then(response => {
      const posts = response.data;
      this.setState({ posts });
      //debugger;
    });
  }
  render() {
    
    return (
      <>
        <ul>
          {this.state.posts.map(post => (
            <li key={post.id}>{post.title.rendered}</li>
          ))}
        </ul>
      </>   
    );    
  }
}
export default App;