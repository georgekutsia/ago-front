import React from 'react'

function ButtonComponentEdit({ setClicking, clicked, btnText }) {
  return (
    <button onClick={() => setClicking(!clicked)} className="btn-update">
      {btnText}
    </button>
  );
}

export default ButtonComponentEdit