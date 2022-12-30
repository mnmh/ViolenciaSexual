import React from 'react';
//import parse from 'html-react-parser';
import useApiWPRequest from '../apis/Wordpress';
//import Button from './atoms/Button';

const url = 'https://museodememoria.gov.co/wp-json/wp/v2/posts';
const page = '';

const Posts = () => {
  return (
    <>
      <h1>Posts recientes</h1>
      {/* <Button customClass={'large'} text={'Hola'} /> */}
      {useApiWPRequest(url, page).data.map((block) => (
        <section key={block.id}>
          <div className='post'>
            {block.id} - {block.title.rendered}
          </div>
        </section>
      ))}
    </>
  );
};
export default Posts;
