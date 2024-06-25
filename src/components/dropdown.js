// headerFunctions.js

export const handleNavbarScroll = () => {
    let position = window.scrollY + 200;
    const navbarlinks = document.querySelectorAll('#navbar .scrollto');
  
    navbarlinks.forEach(navbarlink => {
      const sectionId = navbarlink.getAttribute('href').slice(1);
      const section = document.getElementById(sectionId);
  
      if (section && position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  
  export const handleHeaderScroll = () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };
  
  export const handleBackToTopToggle = () => {
    const backtotop = document.querySelector('.back-to-top');
    if (backtotop) { // Ensure back-to-top element exists
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    }
  };
  
  export const toggleMobileNavbar = () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('navbar-mobile');
  
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    mobileNavToggle.classList.toggle('bi-list');
    mobileNavToggle.classList.toggle('bi-x');
  };
  
  export const toggleDropdown = (e) => {
    e.preventDefault();
    const dropdownMenu = e.currentTarget.nextElementSibling;
    dropdownMenu.classList.toggle('dropdown-active');
  };
  
  export const scrollToSection = (e) => {
    if (!e || !e.preventDefault) {
      console.error("Evento inválido:", e);
      return;
    }
  
    e.preventDefault();  // Asegúrate de que e es un evento y tiene el método preventDefault
    
    const href = e.target.getAttribute('href');
    const sectionId = href ? href.substring(1) : null;  // Elimina el símbolo '#'
  
    if (!sectionId) {
      console.error("ID de sección no encontrado");
      return;
    }
  
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      console.error("Sección no encontrada:", sectionId);
    }
  };
  
  
  