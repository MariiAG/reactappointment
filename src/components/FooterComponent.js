import React from 'react';
import ambulancia from './image/ambulancia.jpg';
import virus from './image/virus.jpg';
import medicos from './image/medicos.jpg';
import principal from './image/principal.jpg';

const FooterComponent = () => {
    return (
        <div>                 
            <footer className="page-footer indigo lighten-5">
                <br/>
                <strong className="col s4 black-text text-darken-2">
                    © 2020 Maria Elena Arango Gaviria  CESDE - Nuevas tecnologias - Momento 3
                </strong>
                <br/><br/>
            </footer>

        <img width="400" height="230" src={principal}></img>
        <img width="400" height="230" src={virus}></img>
        <img width="370" height="230" src={medicos}></img>
        <img width="178" height="230" src={ambulancia}></img>
        </div>
    );
}

export default FooterComponent;