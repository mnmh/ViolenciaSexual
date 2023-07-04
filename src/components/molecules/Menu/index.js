import React from "react";

const Menu = ({ goToIndex }) => {
  return (
    <div id="menu-especial" className="menu hide">
      <div onClick={() => goToIndex(1)} className="eje1">
        click
      </div>
      <button onClick={() => goToIndex(1)}>Index 1</button>
      <button onClick={() => goToIndex(45)}>Index 45</button>
      <button onClick={() => goToIndex(77)}>Index 77</button>
    </div>
  );
};

export default Menu;
