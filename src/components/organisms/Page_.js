import React from 'react';
import parse from 'html-react-parser';
import useApiWPRequest from '../apis/Wordpress';

const url = 'https://museodememoria.gov.co/wp-json/wp/v2/pages';
const page = '14856';

const { loadApiWPRequest } = useApiWPRequest();

class Page extends React.Component {
  state = {
    blocks: [],
    title: '',
    isLoad: false,
  };

  //{console.log('console loging before mounting component');}
  componentDidMount() {
    const isLoad = parse(loadApiWPRequest(url, page).load);
    this.setState({ isLoad });
    console.log(isLoad);
    /*
    console.log('console loging after mounting component');
    const blocks = parse(useApiWPRequest(url, page).data.content.rendered);
    const title = parse(useApiWPRequest(url, page).data.title.rendered);
    this.setState({ blocks, title });
    */
    /*
    axios.get(url + '/' + page).then((response) => {
      const blocks = parse(response.data.content.rendered);
      const title = parse(response.data.title.rendered);
      this.setState({ blocks, title });
      console.log(title, blocks);
    });*/
  }
  render() {
    return (
      <>
        <h1>{this.state.title}</h1>
        {this.state.blocks.map((block, i) => (
          <div className='bloque' key={i}>
            <code className='id'>{i}</code>
            {block}
          </div>
        ))}
      </>
    );
  }
}
export default Page;
