import React from 'react';
import Hero from './components/Hero';
import PromoGuide from './components/PromoGuide';
import AboutFooter from './components/AboutFooter';
import './components.css';
import logo from './assets/logo.png';

function App() {
  return (
    <>
      <div className="card-container">
        <div className="main-card">
          <div className="card-header">
            <img src={logo} alt="Company Logo" className="logo" />
            <h2 className="expo-subtitle">18<sup>th</sup> PHILSME BUSINESS EXPO 2026</h2>
          </div>

          <div className="card-body">
            <hr className="divider" />
            <Hero />
            <hr className="divider" />
            <PromoGuide />
            <hr className="divider" />
            <AboutFooter />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
