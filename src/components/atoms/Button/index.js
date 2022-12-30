import React from 'react';

const Button = ({
  text = '',
  onClick = null,
  customClass = '',
  customStyle = {},
  children = null,
}) => {
  return (
    <button
      style={customStyle}
      className={customClass}
      onClick={onClick}
      onKeyDown={onClick}
    >
      {text || children}
    </button>
  );
};

export default Button;
