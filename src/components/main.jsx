import React, { useState } from "react";
import "../Assets/vendor/aos/aos.css";
import "../Assets/vendor/bootstrap/css/bootstrap.min.css";
import "../Assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../Assets/vendor/boxicons/css/boxicons.min.css";
import "../Assets/vendor/glightbox/css/glightbox.min.css";
import "../Assets/vendor/remixicon/remixicon.css";
import "../Assets/vendor/swiper/swiper-bundle.min.css";
import "../Assets/css/style.css";
import { Link } from "react-router-dom";
import ServiciosCards from "./serviciosCards";
import contenido from "./contenidocard";
import Rastrea from "./rastea";
import ContactUs from "./contacus";
import { LanguageProvider, useLanguage } from './language';
import en from "../components/translations/en.json";
import es from "../components/translations/es.json";
import Servicecards from "../components/translations/en.json"

const MainComponent = () => {
  const { currentLanguage, switchLanguage } = useLanguage();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const languageData = currentLanguage === 'en' ? en : es;

  const {
    title,
    paragraph1,
    paragraph2,
    paragraph3,
    paragraph4,
    paragraph5,
    paragraph6,
    
  } = languageData;

  const openModal = (cardContent) => {
    setModalContent(cardContent);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const ModalContent = ({ language, modalContent }) => {
    const content = modalContent[language] || {};

    return (
      <>
        <h2>{content.titulo}</h2>
        <hr />
        <p>{content.parrafo}</p>
        <br />
        <Link to={content.url} className='button-88'>
          {content.boton}
        </Link>
      </>
    );
  };

  const Modal = ({ children, onClose }) => (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.content}>
          {children}
          <div style={styles.buttonsContainer}>
            <button style={styles.closeButton} onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modal: {
      backgroundColor: '#f9f9f9',
      padding: '30px',
      borderRadius: '10px',
      width: '80%',
      maxWidth: '600px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      textAlign: 'center'
    },
    content: {
      margin: '0 auto'
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      color: '#333'
    },
    actionButton: {
      background: '#FC8002',
      color: '#fff',
      border: 'none',
      fontSize: '16px',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginLeft: '20px'
    }
  };

  return (
    
      <main id="main">
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>{title}</h2>
            </div>
            <div className="row content">
              <div className="col-lg-6 checklist">
                <p>{paragraph1}</p>
                <ul>
                  <li>{paragraph2}</li>
                  <li>{paragraph3}</li>
                </ul>
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0 checklist">
                <ul>
                  <li>{paragraph4}</li>
                  <li>{paragraph5}</li>
                  <li>{paragraph6}</li>
                </ul>
              </div>
            </div>
          </div>
       
        </section>
        <hr />
        <ServiciosCards openModal={openModal} />
        <br></br>
        <Rastrea />
        <br></br>
        <br></br>
        <hr />
        <ContactUs />
         {isModalOpen && (
        <Modal onClose={closeModal}>
          <ModalContent language={currentLanguage} modalContent={modalContent} />
        </Modal>
      )}
        <hr />
      </main>

  );
};

export default MainComponent;
