import React, { useEffect, useState } from "react";
import { getCompanies } from "../../shared/services/companyApi.js";
import { NavLink } from "react-router-dom";
import CEOGalleyComponent from "./AdsGalleyComponent.jsx";
import AdsGalleyComponent from "./AdsGalleyComponent.jsx";

function CompanyScreen() {
  const [companiesData, setCompaniesData] = useState([]);
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanies();
        setCompaniesData(data);
      } catch (error) {
        console.error("Error al obtener datos de la empresa:", error);
      }
    };
    fetchData();
  }, []);

  const toggleCEOGallery = (index) => {
    if (openCardIndex === index) {
      setIsOpen(!isOpen); // Cambia el estado isOpen si se hace clic en el mismo botón
    } else {
      setIsOpen(true); // Abre el componente si se hace clic en un nuevo botón
    }
    setOpenCardIndex(index);
  };
console.log(companiesData);
  return (
    <div className="companies-box">
      {companiesData.length === 0 ? (
        <>
          <div className="mainLoader"></div>
          <div className="mainLoader2"></div>
        </>
      ) : (
        <ul className="companies-box-ul">
          {companiesData.map((company, index) => (
            <section className="companies-box-ul-section" key={index}>
              <div className="card company-card">
                <h2 className="card-title">{company.name}</h2>
                <section className="d-flex">
                  <div>
                    <img src={company.logo} className="card-img-top" alt={company.name}/>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{company.business_name}</h5>
                    <p className="card-text">{company.country}</p>
                    <p className="card-text">{company.direcction}</p>
                  </div>
                </section>
                <li className="list-group-item">
                  Número de empleados actuales {company.numberEmployes}
                </li>
                <div className="card-body">
                  <NavLink href="#" className="card-link">
                    Solicitar servicios{" "}
                  </NavLink>
                  <NavLink href="#" className="card-link">
                    Buscar trabajo{" "}
                  </NavLink>
                  <button className="btn-ceo" onClick={() => toggleCEOGallery(index)}>
                    {isOpen && openCardIndex === index ? "Cerrar" : "Ver C.E.O"}
                  </button>
                  {isOpen && openCardIndex === index && (
                    <CEOGalleyComponent ceoData={company.id_user} companyName={company.name}/>
                  )}
                </div>
              </div>
                    
                    <AdsGalleyComponent addData={company.id_advertisement} />
            </section>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompanyScreen;
