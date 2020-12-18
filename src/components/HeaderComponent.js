import React from 'react';
import logo from './image/logo.png';
import ambulancia from './image/ambulancia.jpg';
import virus from './image/virus.jpg';
import medicos from './image/medicos.jpg';
import principal from './image/principal.jpg';
import 'materialize-css/dist/css/materialize.min.css';

const HeaderComponent = () => {
  return (
    <div>
      <div>
        <img width="395" height="230" src={principal}></img>
        <img width="400" height="230" src={virus}></img>
        <img width="368" height="230" src={medicos}></img>
        <img width="165" height="230" src={ambulancia}></img>
      </div>
      <div>
          <p className="breadcrumb light-blue darken-4">Somos un hospital público que presta servicios de salud de forma integral y humana, comprometido con el desarrollo del talento humano en salud y la investigación.</p>
      </div>
      <div className="container">
        <img className="materialboxed" width="600" src={logo}></img>
      </div>
    </div>
  );
}

export default HeaderComponent;