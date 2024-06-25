import React from "react";
import { LanguageProvider, useLanguage } from './language';
import en from "../components/translations/en.json";
import es from "../components/translations/es.json";

const Rastrea = () => {
    const { currentLanguage, switchLanguage } = useLanguage();
    const languageData = currentLanguage === 'en' ? en : es;
    const {
        trackyourshipment,
        trackbutton,
        trackingnumber
    } = languageData;

    return (
        <div className="container-Rastrea">
            <div className="rastrea-content-wrapper">
                <div className="rastrea-content">
                    <h1 className="rastrea-title">{trackyourshipment}</h1>
                    <div className="input-group">
                        <input className="input-field" placeholder={trackingnumber} /> </div>
                        <div className="input-group2">
                        <button className="rastrea-button">{trackbutton}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rastrea;
