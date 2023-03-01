import React from 'react';
import logo from '../../../resources/images/logo.png';

function Home() {

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>TYZEN9-ELECTRON-REACT BOILERPLATE</h2>
      <img src={logo} style={{ 
       display: "block",
       borderRadius: "25px",
       marginLeft: "auto",
       marginRight: "auto",
       height: "200px",
      }}/></div>
  );
}

export default Home;
