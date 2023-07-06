import React from "react";

const Menu = ({ goToIndex }) => {
  return (
    <div id="menu-especial" className="menu hide">
      <div onClick={() => goToIndex(1)} className="eje1">
        click
      </div>
      <button onClick={() => goToIndex(0)}>Index 0</button>
      <button onClick={() => goToIndex(1)}>Index 1</button>
      <button onClick={() => goToIndex(44)}>Index 44</button>
      <button onClick={() => goToIndex(79)}>Index 79</button>
    </div>
  );
};

export default Menu;
