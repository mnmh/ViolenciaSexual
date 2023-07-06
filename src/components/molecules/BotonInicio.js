import React from "react";

const BotonInicio = ({ goToIndex }) => {
  return (
    <div className="mariposa-inicio">
      <button onClick={() => goToIndex(1)}>Index 1</button>
    </div>
  );
};

export default BotonInicio;
