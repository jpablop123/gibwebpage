import React from "react";
import "../Assets/vendor/aos/aos.css";
import "../Assets/vendor/bootstrap/css/bootstrap.min.css";
import "../Assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../Assets/vendor/boxicons/css/boxicons.min.css";
import "../Assets/vendor/glightbox/css/glightbox.min.css";
import "../Assets/vendor/remixicon/remixicon.css";
import "../Assets/vendor/swiper/swiper-bundle.min.css";
import "../Assets/css/style.css";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { useLanguage } from './language';
import en from "../components/translations/en.json";
import es from "../components/translations/es.json";
import logoGib from "../Assets/img/repartocaja.jpg"



function Footer() {
  const { currentLanguage, switchLanguage } = useLanguage();
  const languageData = currentLanguage === 'es' ? es : en;


  const {
  phone,
  followus,
  joinus,
  chatMessage,
  placeholder
  } = languageData;
  return (
    <footer id="footer">
    
      <div className="footer-top">

        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 footer-contact">
              <h3>Gib Traders Corp</h3>
              <p>
                2120 Nw 96th ave, Doral, Fl , 33172<br />
                United States <br /><br />
                <strong>{phone}</strong> +1 786-474-2836<br />
                <strong>Email:</strong> Felipe.pinto@gibtraders.com<br />
              </p>
            </div>

            <div className="col-lg-6 col-md-6 footer-links">
              <h4>{followus}</h4>
              <p>
                {joinus}
              </p>
              <div className="social-links mt-3">
                <a href="#" className="facebook">
                  <i className="bx bxl-facebook"></i>
                </a>
                <a href="https://www.instagram.com/gibtraders?igsh=OW1rNGt3enMycHgw&utm_source=qr" className="instagram">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/company/gib-traders-corp/" className="linkedin">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom clearfix">
        <div className="copyright">
          &copy; Copyright <strong><span>Gib Traders Corp</span></strong>. All
          Rights Reserved
        </div>
        <div className="credits">
          {/* All the links in the footer should remain intact. */}
          {/* You can delete the links only if you purchased the pro version. */}
          {/* Licensing information: https://bootstrapmade.com/license/ */}
          {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/ */}
          Designed by <a href="">Gib Traders Corp</a>
        </div>
      </div>

      {/* Floating WhatsApp Logo */}
      <FloatingWhatsApp
  phoneNumber="7868991636"
  accountName="Gib Traders"
  chatMessage={chatMessage}
  placeholder={placeholder}
  darkMode={true}
  avatar={logoGib}
  notificationLoop={1}
/>
    </footer>
  );
}

export default Footer;
