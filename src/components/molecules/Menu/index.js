import React from "react";

const Menu = ({ goToIndex }) => {
  return (
    <div id="menu-especial" className="menu">
      <div onClick={() => goToIndex(1)} className="circle beige">
        <div className="txt">Sacar a flote</div>
      </div>
      <div onClick={() => goToIndex(39)} className="circle green">
        <div className="txt">Voces que irrumpen</div>
      </div>
      <div onClick={() => goToIndex(68)} className="circle orange">
        <div className="txt">Nunca será lo mismo</div>
      </div>
    </div>
  );
};

export default Menu;
