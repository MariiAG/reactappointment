import React from 'react';
import logo from './image/logo.png';

const HeaderComponent = () => {

    return (
      <div>
          <img className="materialboxed" width="650" src={logo}></img>
      </div> 
    );
}

export default HeaderComponent;