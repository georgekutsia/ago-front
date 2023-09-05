import React from "react";
import Swiper from "swiper";
import "swiper/css";


function AdsGalleyComponent({ addData }) {
  console.log("adddata",addData);
  
  return (
    <div className="adsGalleyComponent">
      {addData.id_advertisement.map((ad, index) => (
        <div key={index} className="advertisement">
          <h5>Se busca {ad?.title}</h5>
          <p>Descripción: {ad?.description}</p>
          <p>Salario: {ad?.salary}</p>
        <button>Añadir a favoritos</button>
        </div>
      ))}
    </div>
    
  );
}

export default AdsGalleyComponent;
