import React from 'react';
import ReactDOM from 'react-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from "./components/HeaderComponent";
import ListAppointment from "./ListAppointment";
import Listdateday from "./dateday";

ReactDOM.render(
  <React.StrictMode>
    <HeaderComponent></HeaderComponent> 
    <ListAppointment></ListAppointment>
    <Listdateday></Listdateday>
    <FooterComponent></FooterComponent> 
  </React.StrictMode>,
  document.getElementById('root')
);