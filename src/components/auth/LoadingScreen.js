import React from 'react';
import Loader from '../assets/animation.gif'

const LoadingScreen = () => {
  return (
    <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
    }}>
      <img src={Loader} alt="Chargement..." style={{
        width: "100px", /* Ajuste la taille si nécessaire */
        height: "auto",
      }} />
    </div>
  );
};

export default LoadingScreen;