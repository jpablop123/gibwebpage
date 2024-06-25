const baseUrl = window.location.origin;

const contenido = [
  {
    es: {
      titulo: "SERVICIO DE COURIER",
      parrafo: "Proporcionamos servicios de courier para el envío de paquetes con un peso máximo de 110 libras y un valor declarado no superior a 2000 dólares. Si desea obtener una cotización para su envío, por favor, presione 'Cotizar'",
      boton: "Cotizar",
      class: "gr-1",
      url: `${baseUrl}/cotiza/calculadorapaquetes`
    },
    en: {
      titulo: "COURIER SERVICE",
      parrafo: "We provide courier services for shipping packages with a maximum weight of 110 pounds and a declared value not exceeding 2000 dollars. If you want to get a quote for your shipment, please press 'Get Quote'",
      boton: "Get Quote",
      class: "gr-1",
      url: `${baseUrl}/cotiza/calculadorapaquetes`
    }
  },
  {
    es: {
      titulo: "SERVICIO DE WAREHOUSE",
      parrafo: "Ofrecemos almacenamiento seguro y organizado para tus productos. Con instalaciones modernas y un sistema de gestión eficiente, optimizamos tu cadena de suministro y adaptamos soluciones según las necesidades de tu negocio.",
      boton: "Ingresar",
      class: "gr-4",
      url: `${baseUrl}/cotiza`
    },
    en: {
      titulo: "WAREHOUSE SERVICE",
      parrafo: "We offer secure and organized storage for your products. With modern facilities and an efficient management system, we optimize your supply chain and tailor solutions according to your business needs.",
      boton: "Enter",
      class: "gr-4",
      url: `${baseUrl}/cotiza`
    }
  },
  {
    es: {
      titulo: "SERVICIOS LOGISTICOS",
      parrafo: "Tu aliado confiable en exportación e importación. ¿Necesitas asesoramiento para tu importación o deseas traer productos del exterior? ¡Contáctanos para recibir una cotización precisa y personalizada que impulse tus operaciones internacionales!",
      boton: "Cotizar",
      class: "gr-2",
      url: `${baseUrl}/cotiza`
    },
    en: {
      titulo: "LOGISTICS SERVICES",
      parrafo: "Your reliable partner in export and import. Need advice for your import or want to bring products from abroad? Contact us to receive an accurate and personalized quote to boost your international operations!",
      boton: "Get Quote",
      class: "gr-2",
      url: `${baseUrl}/cotiza`
    }
  },
  {
    es: {
      titulo: "WHITE GLOVE",
      parrafo: "¡Descubre nuestro exclusivo servicio White Glove! Si ya posees un casillero, por favor inicia sesión para acceder a todos los beneficios. Si no, te invitamos a registrarte y disfrutar de un servicio de primera clase que garantiza el máximo cuidado de tus productos. ¡Ingresa y conoce más sobre nosotros!",
      boton: "Ingresar",
      class: "gr-3",
      url: `${baseUrl}/disenadores`
    },
    en: {
      titulo: "WHITE GLOVE",
      parrafo: "Discover our exclusive White Glove service! If you already have a locker, please log in to access all the benefits. If not, we invite you to register and enjoy first-class service that ensures the utmost care for your products. Enter now and learn more about us!",
      boton: "Enter",
      class: "gr-3",
      url: `${baseUrl}/disenadores`
    }
  }
];

export default contenido;

  