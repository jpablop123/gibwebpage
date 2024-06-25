import React, { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLanguage } from './language';
import translations from "../components/translations/translations.Cotiszador.json";

const CotizadorImportacions = () => {
  const { currentLanguage } = useLanguage();
  const content = currentLanguage === 'en' ? translations.en : translations.es;

  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const sendForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const formData3 = {
      full_name: form.current.full_name.value,
      phone_number: form.current.phone_number.value,
      email: form.current.email.value,
      select_options: form.current.select_options.value,
      informacion: form.current.informacion.value,
    };

    try {
      const response = await axios.post('/cotizador-importacions', formData3);
      if (response.status === 200) {
        setSuccessMessage(content.thankYouMessage);
        form.current.reset();
        setIsFormDisabled(true);
        setIsFormSubmitted(true);
      } else {
        setError(content.errorMessageText);
      }
    } catch (error) {
      setError(content.errorMessageText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='calculadora-container'>
      <div className='container'>
        <div className="form-holder">
          {isFormSubmitted ? (
            <div className="thank-you-message">
              <h4>{content.thankYouMessage}</h4>
   
              <p>{content.registerMessage}</p>
           
              <a href="https://globuscargo.us/#/sign-up?a=90408c7a-fb1e-4b68-b000-8b02fe47ddf9" className="btn btn-primary">{content.register}</a>
            </div>
          ) : (
            <>
              <div className='elBotondecalcuadora'>
                <button className='button-on-top'>{content.serviceButton}</button>
              </div>
              <div className="form-content">
                <div className="overlay1"></div>
                <div className="card4">
                  <div className="content">
                    <h2>{content.title}</h2>
                    <p>{content.description}</p>
                    <form ref={form} onSubmit={sendForm} className="php-email-form">
                      <div className="form schedule-assessment">
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label htmlFor="full_name" className="sr-only">Full Name:</label>
                            <input name="full_name" id="full_name" placeholder={content.fullNamePlaceholder} type="text" required="required" data-error="Please enter your full name." />
                            <div className="help-block with-errors"></div>
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="phone_number" className="sr-only">Phone Number:</label>
                            <input name="phone_number" id="phone_number" placeholder={content.phoneNumberPlaceholder} type="text" required="required" data-error="Please enter your phone number" />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="form-group col-md-6">
                            <label htmlFor="email" className="sr-only">Email Address:</label>
                            <input name="email" id="email" placeholder={content.emailPlaceholder} type="email" required="required" data-error="Please enter a valid email." />
                            <div className="help-block with-errors"></div>
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="select_options" className="sr-only">What service are you interested in?</label>
                            <select name="select_options" required="required" data-error="Please select one option.">
                              <option value="">{content.selectServicePlaceholder}</option>
                              {content.selectOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                              ))}
                            </select>
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="form-group col-md-12">
                            <label htmlFor="informacion" className="sr-only">Tell us more</label>
                            <textarea name="informacion" id="informacion" placeholder={content.textareaPlaceholder} rows="5" required="required" data-error="Please enter your information."></textarea>
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        
                        <div className="form-group text-center">
                          <Link to="/cotiza" className="btn btn-primary" style={{ marginRight: '10px' }}>{content.backButton}</Link>
                          <input className="submit center-block btn btn-primary" value={content.submitButton} type="submit" disabled={isFormDisabled} />
                        </div>
                        <div className="my-3">
                          {loading && <div className="loading">{content.cargando}</div>}
                          {error && <div className="error-message">{error}</div>}
                          {successMessage && <div className="sent-message">{successMessage}</div>}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CotizadorImportacions;
