import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="home-footer-background"></div>
      <div className="home-footer-content">
        <div className="home-footer-left">
          <div className="home-footer-logo">
            <img src="/icones/logo-arco-iris.png" alt="Chácara Arco Íris Logo" />
          </div>
          <h2 className="home-footer-title">
            Bem-vindo
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
            <p className="home-footer-phone">(83) 98805-0587</p>
            <p className="home-footer-email">valentnet1990@gmail.com</p>
            <p className="home-footer-address">Sítio Mata D'água, Granja 22 - Alhandra/PB - CEP 58322-000</p>
          </div>
          <div className="home-footer-social">
            <a href="https://www.instagram.com/chacara.arcoiris?igsh=a2ZzM2dieDZsbjk3&utm_source=qr" target="_blank" rel="noopener noreferrer" className="home-footer-social-link">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.facebook.com/share/1aWqvqYRK8/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="home-footer-social-link">
              <FaFacebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


