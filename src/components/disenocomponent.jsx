import React from "react";
import Caja1 from "../Assets/img/modernmoving.jpeg"
import Caja2 from "../Assets/img/movingvan.jpeg"
import en from "../components/translations/en.json";
import es from "../components/translations/es.json";
import { useLanguage } from "./language";




const DisenoExplanation  = () => {
  const { currentLanguage, switchLanguage } = useLanguage();

  const languageData = currentLanguage === 'en' ? en : es;

  const {
    tituloWhite,
    ParrafoWhite,
    parrafoWhite2,
    tituloBodega,
    parrafoBodega,
    parrafoBodega2
  } = languageData;

    return (
        <>
        <section className="section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 me-auto">
            <h2 className="mb-4">{tituloWhite}</h2>
            <p className="mb-4">{ParrafoWhite}</p>
            <p><a href="#contactodisenador" className="btn btn-primary">{parrafoWhite2}</a></p>
          </div>
          <div className="col-md-6" data-aos="fade-left">
            <img src={Caja1} alt="Image" className="img-fluid"/>
          </div>
        </div>
      </div>
    </section>
    <hr></hr>

    <section className="section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 ms-auto order-2">
            <h2 className="mb-4">{tituloBodega}</h2>
            <p className="mb-4"> {parrafoBodega}</p>
            <p><a href="#contactodisenador" className="btn btn-primary">{parrafoBodega2}</a></p>
          </div>
          <div className="col-md-6" data-aos="fade-right">
            <img src={Caja2} alt="Image" className="img-fluid"/>
          </div>
        </div>
      </div>
    </section>
    </>

    )
}

export default DisenoExplanation