import React from "react";
import { useLanguage } from './language';
import contenido from "./contenidocard"; // Import the content from your file

const ServiciosCards = ({ openModal }) => {
  const { currentLanguage } = useLanguage();
  const content = contenido;

  const handleClickCard = (cardContent) => {
    openModal(cardContent);
  };

  return (
    <section id="services" className="services section-bg">
      <div className="container h-100">
        <div className="row align-middle">
          <div className="containerunderline">
            <h1>{currentLanguage === 'en' ? 'Our Logistics Solutions' : 'Nuestras Soluciones Logísticas'}</h1>
          </div>
          {content.map((item, index) => (
            <div key={index} className="col-md-3 col-lg-3 column">
              <div className={`card ${item.es.class}`} onClick={() => handleClickCard(item)}>
                <div className="txt">
                  <h1>{currentLanguage === 'en' ? item.en.titulo : item.es.titulo}</h1>
                </div>
                <div className="ico-card"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <hr />
    </section>
  );
};

export default ServiciosCards;
