import React from "react";
import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";

const MyGallery = () => (
  <Gallery>
    <Item
      original="https://museodememoria.gov.co/wp-content/uploads/2022/12/carta-26-2-700x532.jpg"
      width="700"
      height="532"
    >
      {({ ref, open }) => (
        <img
          ref={ref}
          onClick={open}
          src="https://museodememoria.gov.co/wp-content/uploads/2022/12/carta-26-2-700x532.jpg"
        />
      )}
    </Item>
  </Gallery>
);

export default MyGallery;
