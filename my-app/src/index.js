import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import reportWebVitals from './reportWebVitals';


// React BootStrap Configuration
import 'bootstrap/dist/css/bootstrap.min.css';
// import "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.css";

import NavbarComponent from './component/navbar';
import PredictComponent from './component/predict';
import AboutComponent from './component/about'
import FooterComponent from './component/footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavbarComponent />
    <PredictComponent />
    <AboutComponent />
    <FooterComponent />

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
