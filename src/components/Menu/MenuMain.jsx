import Button from 'react-bootstrap/Button';
import './MenuMain.css';
import AccordionMain from './Accordion/AccordionMain';
import logo from "../../assets/logo2.png"
function MenuMain() {


  return (
    <div>
      <div className="nav">
        <img src={logo} alt="logo" />
        <h2 className="titles blue">Administrador Smart Tur</h2>
        <Button variant="primary">Salir del Administrador</Button>
      </div>
      <div>
        <AccordionMain />
      </div>
    </div>
  );
}

export default MenuMain;
