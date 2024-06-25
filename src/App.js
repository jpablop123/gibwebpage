import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header";
import Footer from "./components/footer";
import HeroSection from "./components/hero";
import MainComponent from "./components/main";
import CotizaMain from "./components/cotizamain";
import CotizadorImportacions from "./components/cotizadorimportacions";
import CargoCalculator from "./components/calculadoraCarga";
import ShippingCalculator from "./components/cotiza";
import Disenadores from "./components/disenadoresmain";
import LoadingScreen from "./loadingScreen"; // Import the loading screen component
import AOS from "aos";
import { LanguageProvider } from "./components/language";
import 'aos/dist/aos.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 400,
      easing: 'ease',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });

    // Simulate a loading delay (you can remove this if you load real data)
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <LanguageProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cotiza" element={<Cotiza />} />
          <Route path="/cotiza/calculadoracarga" element={<CalculadoraCarga />} />
          <Route path="/cotiza/calculadorapaquetes" element={<CalculadoraPaquetes />} />
          <Route path="/cotiza/calculadoraimportaciones" element={<CalculadoraImportaciones />} />
          <Route path="/disenadores" element={<Designer />} />
        </Routes>
        <Footer />
      </Router>
    </LanguageProvider>
  );
}

function Home() {
  return (
    <>
      <HeroSection />
      <MainComponent />
    </>
  );
}

function Cotiza() {
  return <CotizaMain />;
}

function CalculadoraCarga() {
  return <CargoCalculator />;
}

function CalculadoraPaquetes() {
  return <ShippingCalculator />;
}

function CalculadoraImportaciones() {
  return <CotizadorImportacions />;
}

function Designer() {
  return <Disenadores />;
}

export default App;
