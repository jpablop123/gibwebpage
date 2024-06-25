import React from "react";
import "../Assets/vendor/aos/aos.css";
import "../Assets/vendor/bootstrap/css/bootstrap.min.css";
import "../Assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../Assets/vendor/boxicons/css/boxicons.min.css";
import "../Assets/vendor/glightbox/css/glightbox.min.css";
import "../Assets/vendor/remixicon/remixicon.css";
import "../Assets/vendor/swiper/swiper-bundle.min.css";
import "../Assets/css/style.css";
import { useLanguage } from './language';
import en from "../components/translations/en.json";
import es from "../components/translations/es.json";
import { FaWhatsapp } from "react-icons/fa";

function HeroSection() {
  const { currentLanguage } = useLanguage();
  const languageData = currentLanguage === 'en' ? en : es;

  const {
    heroTitle,
    heroService1,
    heroService2,
    heroService3,
    heroService4,
    heroService5,
    heroAddress,
    heroButton1,
    heroButton2
  } = languageData;

  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 d-flex flex-column justify-content-start pt-4 pt-lg-0 order-2 order-lg-1 hero-text-background"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1>{heroTitle}</h1>
            <ul>
              <li><h4>{heroService1}</h4></li>
              <li><h4>{heroService2}</h4></li>
              <li><h4>{heroService3}</h4></li>
              <li><h4>{heroService4}</h4></li>
              <li><h4>{heroService5}</h4></li>
            </ul>
            <h2>
              <i className="fa-solid fa-location-dot"></i> {heroAddress}
            </h2>
            <div className="botonesPagina">
              <a href="https://globuscargo.us/#/sign-up?a=90408c7a-fb1e-4b68-b000-8b02fe47ddf9">
                <button className="button-99" style={{ marginRight: "10px" }}>{heroButton1}</button>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=7868991636&text=asd">
                <button className="button-99">
                  <FaWhatsapp style={{ marginRight: "8px" }} />
                  {heroButton2}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
