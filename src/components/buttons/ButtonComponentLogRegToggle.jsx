import React from 'react'

function ButtonComponentLogRegToggle({ toggle, logReg }) {
  return (
    <div className="buttonToggleLogReg">
      <button className="button-89 " onClick={() => toggle()}>
        {logReg ? "Ya tengo cuenta" : "Quiero registarme"}
      </button>
    </div>
  );
}

export default ButtonComponentLogRegToggle