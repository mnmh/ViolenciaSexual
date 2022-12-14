import React from 'react';
import axios from 'axios';
import parse from 'html-react-parser';

const url = 'https://museodememoria.gov.co/wp-json/wp/v2/pages';
const page = '14856';

class Page extends React.Component {
  state = {
    blocks: [],
    title: '',
    classValue: '',
  };
  componentDidMount() {
    axios.get(url + '/' + page).then((response) => {
      const blocks = parse(response.data.content.rendered);
      const title = parse(response.data.title.rendered);
      this.setState({ blocks, title });
      console.log(title, blocks);
    });
  }

  render() {
    return (
      <>
        <h1>{this.state.title}</h1>
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
      </>
    );
  }
}
export default Page;
