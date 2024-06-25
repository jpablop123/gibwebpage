import React, { useRef, useState } from "react";
import axios from "axios";
import { useLanguage } from './language';
import en from "../components/translations/en.json";
import es from "../components/translations/es.json";

const ContactFormDiseno = () => {
  const { currentLanguage, switchLanguage } = useLanguage();
  const languageData = currentLanguage === 'es' ? es : en;

  const {
    contact,
    contactDescription,
    location,
    call,
    name,
    email,
    whyContact,
    message,
    cargando,
    sentMessage: sentMessageText,
    sendMessage,
    errorMessage: errorMessageText,
  } = languageData;

  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const formData = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      user_contactas: form.current.subject.value,
      user_message: form.current.message.value,
    };

    try {
      const response = await axios.post('/contact-diseno', formData);
      setSuccessMessage(sentMessageText);
      form.current.reset();
      setLoading(false);
      setIsFormDisabled(true);
    } catch (error) {
      setError(errorMessageText);
      setLoading(false);
    }
  };

  return (
    <section id="contactodisenador" className="contact">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>{contact}</h2>
          <p>{contactDescription}</p>
        </div>
        <div className="row gx-lg-0 gy-4">
          <div className="col-lg-4">
            <div className="info-container d-flex flex-column align-items-center justify-content-center">
              <div className="info-item d-flex">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h4>{location}</h4>
                  <p>2120 NW 96th Ave, Doral FL 33172</p>
                </div>
              </div>
              <div className="info-item d-flex">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h4>{email}</h4>
                  <p>Felipe.pinto@gibtraders.com</p>
                </div>
              </div>
              <div className="info-item d-flex">
                <i className="bi bi-phone flex-shrink-0"></i>
                <div>
                  <h4>{call}</h4>
                  <p>+1 786-474-2836</p>
                </div>
              </div>
              <div className="info-item d-flex">
                <i className="bi bi-clock flex-shrink-0"></i>
                <div>
                  <h4>Horarios de atención:</h4>
                  <p>Lunes a Viernes: 9AM - 5PM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8" id="Contactodiseno">
            <form ref={form} onSubmit={sendEmail} className="php-email-form">
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="text" name="user_name" className="form-control" id="user_name" placeholder={name} required disabled={isFormDisabled} />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" className="form-control" name="user_email" id="user_email" placeholder={email} required disabled={isFormDisabled} />
                </div>
              </div>
              <div className="form-group mt-3">
                <input type="text" className="form-control" name="subject" id="subject" placeholder={whyContact} required disabled={isFormDisabled} />
              </div>
              <div className="form-group mt-3">
                <textarea className="form-control" name="message" id="message" rows="7" placeholder={message} required disabled={isFormDisabled}></textarea>
              </div>
              <div className="my-3">
                {loading && <div className="loading">{cargando}</div>}
                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="sent-message">{successMessage}</div>}
              </div>
              <div className="text-center">
                <button type="submit" value="send" disabled={isFormDisabled}>{sendMessage}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormDiseno;
