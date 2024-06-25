import React, { createContext, useState, useEffect, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLanguage = navigator.language || navigator.userLanguage;
      if (browserLanguage.startsWith('es')) {
        setCurrentLanguage('es');
      } else {
        setCurrentLanguage('en');
      }
    }
  }, []);

  const switchLanguage = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
