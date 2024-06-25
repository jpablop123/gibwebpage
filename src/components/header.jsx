import React, { useState, useEffect } from 'react';
import { handleNavbarScroll, handleHeaderScroll, handleBackToTopToggle, toggleMobileNavbar, scrollToSection } from './dropdown';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from "../Assets/img/gib logo-veed-remove-background.png";
import ColFlag from "../Assets/img/Flag_of_Colombia.svg.png";
import UsFlag from "../Assets/img/usaflag.png";
import { useLanguage } from './language';
import en from "../components/translations/en.json";
import es from "../components/translations/es.json";

const Header = () => {
  const { currentLanguage, switchLanguage } = useLanguage();
  const location = useLocation();
  const [isCotizaPath, setIsCotizaPath] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [openDropdown, setOpenDropdown] = useState(null);

  const navigate = useNavigate();

  const language = currentLanguage === 'es' ? es : en;

  const handleHomeClick = () => {
    if (location.pathname.startsWith('/cotiza')) {
      navigate("/");
    }
    setActiveLink('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMobileNavbar();
  };

  const closeMobileNavbar = () => {
    const navbar = document.querySelector('.navbar-mobile');
    if (navbar) {
      navbar.classList.remove('navbar-mobile');
      const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
      if (mobileNavToggle) {
        mobileNavToggle.classList.remove('bi-x');
        mobileNavToggle.classList.add('bi-list');
      }
    }
  };

  const {
    home,
    designers,
    quote,
    services,
    register,
    locker
  } = language;

  useEffect(() => {
    const pathname = location.pathname;
    if (
      pathname === '/cotiza' ||
      pathname === '/cotiza/calculadorapaquetes' ||
      pathname === '/cotiza/calculadoracarga' ||
      pathname === '/cotiza/calculadoraimportaciones'
    ) {
      setActiveLink('cotiza');
    } else if (pathname === '/disenadores') {
      setActiveLink('disenadores');
    } else if (pathname === '/') {
      setActiveLink('home');
    } else {
      setActiveLink('');
    }
  }, [location]);

  useEffect(() => {
    setIsCotizaPath(
      location.pathname === '/cotiza' ||
      location.pathname === '/cotiza/calculadorapaquetes' ||
      location.pathname === '/cotiza/calculadoracarga' ||
      location.pathname === '/cotiza/calculadoraimportaciones' ||
      location.pathname === '/registrate'
    );
  }, [location]);

  useEffect(() => {
    window.addEventListener('scroll', handleNavbarScroll);
    window.addEventListener('scroll', handleHeaderScroll);
    window.addEventListener('scroll', handleBackToTopToggle);

    return () => {
      window.removeEventListener('scroll', handleNavbarScroll);
      window.removeEventListener('scroll', handleHeaderScroll);
      window.removeEventListener('scroll', handleBackToTopToggle);
    };
  }, []);

  const handleOutsideClick = (e) => {
    const dropdownMenu = document.querySelector('.dropdown-menu.show');
    const dropdownToggle = document.querySelector('.dropdown-toggle.show');
    if (dropdownMenu && !dropdownMenu.contains(e.target) && dropdownToggle && !dropdownToggle.contains(e.target)) {
      if (dropdownToggle) {
        dropdownToggle.classList.remove('show');
        dropdownToggle.setAttribute('aria-expanded', 'false');
        dropdownToggle.setAttribute('aria-haspopup', 'false');
        dropdownToggle.setAttribute('data-bs-toggle', null);
      }
      if (dropdownMenu) {
        dropdownMenu.classList.remove('show');
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = (dropdown, e) => {
    e.preventDefault();
    const currentDropdown = document.querySelector('.dropdown-menu.show');
    const currentToggle = document.querySelector('.dropdown-toggle.show');
    if (currentDropdown && currentToggle) {
      currentToggle.classList.remove('show');
      currentDropdown.classList.remove('show');
      currentToggle.setAttribute('aria-expanded', 'false');
      currentToggle.setAttribute('aria-haspopup', 'false');
      currentToggle.setAttribute('data-bs-toggle', null);
    }

    if (openDropdown !== dropdown) {
      const dropdownMenu = document.querySelector(`.${dropdown}-menu`);
      const dropdownToggle = document.getElementById(`${dropdown}Dropdown`);
      if (dropdownToggle && dropdownMenu) {
        dropdownToggle.classList.toggle('show');
        dropdownMenu.classList.toggle('show');
        const isOpen = dropdownToggle.classList.contains('show');
        dropdownToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        dropdownToggle.setAttribute('aria-haspopup', isOpen ? 'true' : 'false');
        dropdownToggle.setAttribute('data-bs-toggle', isOpen ? 'dropdown' : null);
        setOpenDropdown(dropdown);
      }
    } else {
      setOpenDropdown(null);
    }
  };

  const handleLinkClick = () => {
    const dropdownMenu = document.querySelector('.dropdown-menu.show');
    const dropdownToggle = document.querySelector('.dropdown-toggle.show');
    if (dropdownToggle && dropdownMenu) {
      dropdownToggle.classList.remove('show');
      dropdownMenu.classList.remove('show');
      dropdownToggle.setAttribute('aria-expanded', 'false');
      dropdownToggle.setAttribute('aria-haspopup', 'false');
      dropdownToggle.setAttribute('data-bs-toggle', null);
    }
    closeMobileNavbar(); // Close mobile navbar after link click
  };

  const handleLanguageChange = (selectedLanguage, e) => {
    e.preventDefault();
    switchLanguage(selectedLanguage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleLinkClick(); // Close the language dropdown after selection
  };

  return (
    <header id="header" className={`fixed-top ${isCotizaPath ? 'cotiza-bg' : ''}`}>
      <div className="container d-flex align-items-center">
        <h1 className="logo me-auto">
          <Link to="/" className="d-flex align-items-center" onClick={handleHomeClick}>
            <img src={Logo} alt="Gib Traders Corp" />
            <span className="logo-text">Gib Traders Corp</span>
          </Link>
        </h1>

        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <Link
                to="/"
                className={`nav-link scrollto ${activeLink === 'home' ? 'active' : ''}`}
                onClick={handleHomeClick}
              >
                {home}
              </Link>
            </li>
            <li>
              <Link to="/disenadores" className={`nav-link ${activeLink === 'disenadores' ? 'active' : ''}`} onClick={handleLinkClick}>
                {designers}
              </Link>
            </li>
            <li>
              <Link to="/cotiza" className={`nav-link ${activeLink === 'cotiza' ? 'active' : ''}`} onClick={handleLinkClick}>
                {quote}
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                onClick={(e) => toggleDropdown('navbar', e)}
              >
                {services}
              </a>
              <div className="dropdown-menu navbar-menu" aria-labelledby="navbarDropdown" style={{ backgroundColor: 'rgb(63, 69, 67)' }}>
                <Link className="dropdown-item nav-link scrollto" to="https://globuscargo.us/#/sign-up?a=90408c7a-fb1e-4b68-b000-8b02fe47ddf9" onClick={handleLinkClick}>
                  {register}
                </Link>
                <Link className="dropdown-item nav-link scrollto" to="https://globuscargo.us/#/sign-in" onClick={handleLinkClick}>
                  {locker}
                </Link>
              </div>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle" onClick={toggleMobileNavbar}></i>
        </nav>
        <div className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="languageDropdown"
            role="button"
            onClick={(e) => toggleDropdown('language', e)}
          >
            {currentLanguage === 'en' ? 'English' : 'Español'}
          </a>
          <div className="dropdown-menu language-menu" aria-labelledby="languageDropdown">
            <a className="dropdown-item nav-link scrollto colores" href="#" onClick={(e) => handleLanguageChange('en', e)}>
              <img src={UsFlag} alt="English" />
              English
            </a>
            <a className="dropdown-item nav-link scrollto" href="#" onClick={(e) => handleLanguageChange('es', e)}>
              <img src={ColFlag} alt="Español" />
              Español
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
