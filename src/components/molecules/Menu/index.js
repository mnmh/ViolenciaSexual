import React from "react";

const Menu = ({ goToIndex }) => {
  return (
    <div id="menu-especial" className="menu hide">
      <div onClick={() => goToIndex(1)} className="eje1">
        click
      </div>
      <button onClick={() => goToIndex(0)}>Index 0</button>
      <button onClick={() => goToIndex(1)}>Index 1</button>
      <button onClick={() => goToIndex(40)}>Index 40</button>
      <button onClick={() => goToIndex(69)}>Index 69</button>
    </div>
  );
};

export default Menu;
