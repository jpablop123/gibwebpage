import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faTruck, faPlane, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import DisenoExplanation from "./disenocomponent";

import ContactFormDiseno from "./contactformdiseno";
import { scrollToSection } from "./dropdown";
import { useLanguage } from './language';
import en from "../components/translations/en.json";
import es from "../components/translations/es.json";
import diseno from "../Assets/css/diseno.css"


const ServiceBox = ({ logoIcon, title, description }) => {
  return (
    <div className="serviceBox">
      <FontAwesomeIcon icon={logoIcon} className="icon" />
      <h3>{title}</h3>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>
    </div>
  );
};

const Disenadores = () => {
  const { currentLanguage } = useLanguage();
  const languageData = currentLanguage === 'en' ? en.designersPage : es.designersPage;

  useEffect(() => {
    window.scrollTo(0, 0);
    const firstInputElement = document.querySelector('input');
    if (firstInputElement) {
      firstInputElement.focus();
    }
  }, []);

  return (
    <>
      <section className="slider">
        <div className="container-disenador">
          <div className="row">
            <div className="col-lg-9 col-md-10">
              <div className="block">
                <span className="d-block mb-3 text-white text-capitalize">{languageData.sliderText}</span>
                <h1 className="animated fadeInUp mb-5">{languageData.sliderTitle}</h1>
                <button className="button-59" onClick={(e) => scrollToSection(e, 'contactodisenador')}>
                  <a href="#contactodisenador" target="_blank" className="btn btn-main animated fadeInUp btn-round-full">
                    {languageData.consultationButton}<i className="btn-icon fa fa-angle-right ml-2"></i>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="diseno-contenedor">
        <div id="wrapdiseno" className="wrapdisenadores">
          <div id="ServicioDisenadores" className="titulodisenadores">
            <h1 className="titulodiseno">{languageData.servicesTitle}</h1>
          </div>

          <div id="wrapSERVICESBOXES" className="wrapW">
            <div id="SERVICESBOXES" className="pageW servicesContainer">
              <ServiceBox
                logoIcon={faBoxOpen}
                title={languageData.service1.title}
                description={languageData.service1.description}
              />
              <ServiceBox
                logoIcon={faTruck}
                title={languageData.service2.title}
                description={languageData.service2.description}
              />
              <ServiceBox
                logoIcon={faPlane}
                title={languageData.service3.title}
                description={languageData.service3.description}
              />
              <ServiceBox
                logoIcon={faWarehouse}
                title={languageData.service4.title}
                description={languageData.service4.description}
              />
            </div>
          </div>
        </div>
      </section>

      <DisenoExplanation />
      <hr />
      <ContactFormDiseno />
    </>
  );
};

export default Disenadores;
