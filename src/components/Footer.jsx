import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="home-footer-background"></div>
      <div className="home-footer-content">
        <div className="home-footer-left">
          <div className="home-footer-logo">
            <img src="/icones/logo boa.png" alt="Brisa Azul Logo" />
          </div>
          <h2 className="home-footer-title">
            Bem-vindo<br />
            ao<br />
            Brisa Azul
          </h2>
        </div>

        <div className="home-footer-center">
          <nav className="home-footer-nav">
            <Link to="/" className="home-footer-nav-link">Inicio</Link>
            <Link to="/quartos" className="home-footer-nav-link">Quartos</Link>
            <Link to="/galeria" className="home-footer-nav-link">Galeria</Link>
            <Link to="/sobre" className="home-footer-nav-link">sobre</Link>
            <Link to="/contato" className="home-footer-nav-link">contato</Link>
          </nav>
        </div>

        <div className="home-footer-right">
          <div className="home-footer-contact">
            <p className="home-footer-phone">(11) 99000-0000</p>
            <p className="home-footer-email">seu@email.com</p>
          </div>
          <button className="home-footer-button">Fazer reserva</button>
        </div>
      </div>
    </footer>
  )
}

export default Footer


