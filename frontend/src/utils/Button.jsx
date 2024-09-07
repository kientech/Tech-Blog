import React from 'react';

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="">
      {children}
    </button>
  );
}

export default Button;
