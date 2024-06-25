import React from 'react';
import Logo from "./Assets/img/gib logo-veed-remove-background.png"; // Adjust the path as needed
import "./Assets/css/loadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img src={Logo} alt="Gib Traders Corp" className="loading-logo" />
      <div className="loading-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;

