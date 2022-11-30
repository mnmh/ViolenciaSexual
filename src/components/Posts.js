import React from "react";
import axios from "axios";
import parse from 'html-react-parser';

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
          <hr></hr>
          {this.state.posts.map(post => (
            <section key={post.id}>
              <h1>{post.id}</h1>
                {parse(post.content.rendered)}
            </section>
          ))}
      </>   
    );    
  }
}
export default App;