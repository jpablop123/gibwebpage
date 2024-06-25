import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useLanguage } from './language';
import en from "../components/translations/en.json";
import es from "../components/translations/es.json";


export const ContactUs = () => {
  const { currentLanguage } = useLanguage();
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
    thankMessage
  } = languageData;

  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const formData1 = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      user_contactas: form.current.user_contactas.value,
      user_message: form.current.user_message.value,
    };

    try {
      const response = await axios.post('/contact-us', formData1);
      if (response.status === 200) {
        setSuccessMessage(sentMessageText);
        form.current.reset();
        setIsFormDisabled(true);
        setIsFormSubmitted(true);
      } else {
        setError(errorMessageText);
      }
    } catch (error) {
      setError(errorMessageText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="contact">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>{contact}</h2>
          <p>{contactDescription}</p>
        </div>
        <div className="row">
          <div className="col-lg-5 d-flex align-items-stretch">
            <div className="info">
              <div className="address">
                <i className="bi bi-geo-alt"></i>
                <h4>{location}</h4>
                <p>2120 Nw 96th ave, Doral, FL, 33172</p>
              </div>
              <div className="email">
                <i className="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p>Felipe.pinto@gibtraders.com</p>
              </div>
              <div className="phone">
                <i className="bi bi-phone"></i>
                <h4>{call}</h4>
                <p>+1 786-474-2836</p>
              </div>
              <div className="map-container" style={{ width: '100%', height: '290px' }}>
                <div className="mapouter" style={{ width: '100%', height: '100%' }}>
                  <div className="gmap_canvas" style={{ width: '100%', height: '100%' }}>
                    <iframe
                      width="100%"
                      height="100%"
                      id="gmap_canvas"
                      src="https://maps.google.com/maps?q=gib+traders+corp&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
            {isFormSubmitted ? (
              <div className="thank-you-message">
                <h4>{thankMessage}</h4>
              </div>
            ) : (
              <form ref={form} onSubmit={sendEmail} className="php-email-form">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label>{name}</label>
                    <input type="text" name="user_name" className="form-control" id="user_name" required disabled={isFormDisabled} />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="email">{email}</label>
                    <input type="text" className="form-control" name="user_email" id="user_email" required disabled={isFormDisabled} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">{whyContact}</label>
                  <input type="text" className="form-control" name="user_contactas" id="user_contactas" required disabled={isFormDisabled} />
                </div>
                <div className="form-group">
                  <label htmlFor="message">{message}</label>
                  <textarea className="form-control" name="user_message" rows="10" required disabled={isFormDisabled}></textarea>
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
