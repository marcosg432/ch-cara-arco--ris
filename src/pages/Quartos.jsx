import { Link } from 'react-router-dom'
import { FaTv } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Quartos.css'

const Quartos = () => {
  return (
    <div className="quartos-page">
      {/* Hero Section */}
      <section className="quartos-hero">
        <div className="quartos-hero-background">
          <video 
            className="quartos-hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            webkit-playsinline="true"
          >
            <source src="/video/video-banner-quartos.mp4" type="video/mp4" />
          </video>
        </div>
        <Header />
        <div className="quartos-hero-content">
          <h1 className="quartos-hero-title">Chácara Arco Íris</h1>
          <p className="quartos-hero-subtitle">CHÁCARA & HOSPEDAGEM</p>
        </div>
      </section>

      {/* Text Section */}
      <section className="quartos-text-section">
        <p className="quartos-text">
          A Chácara Arco Íris conta com um total de 68 acomodações, sem contar os espaços para armadores de rede e o nosso auditório, que também pode ser adaptado como dormitório para até 50 pessoas.
        </p>
        <p className="quartos-text">
          Nossas opções de hospedagem foram planejadas para receber desde pequenos grupos até grandes eventos, garantindo conforto, tranquilidade e uma estadia inesquecível.
        </p>
      </section>

      {/* Quartos Cards */}
      <section className="quartos-cards-section">
        <div className="quartos-cards-container">
          <div className="quartos-page-card">
            <div className="quartos-page-card-image imperial"></div>
            <div className="quartos-page-card-icon"><FaTv /></div>
            <h3 className="quartos-page-card-title">Chále 03</h3>
            <div className="quartos-page-card-price">R$ 249 / Noite</div>
            <Link to="/suite-imperial" className="quartos-page-card-button">saiba mais</Link>
          </div>
          <div className="quartos-page-card">
            <div className="quartos-page-card-image luxo"></div>
            <div className="quartos-page-card-icon"><FaTv /></div>
            <h3 className="quartos-page-card-title">Chále 04</h3>
            <div className="quartos-page-card-price">R$ 350 / Noite</div>
            <Link to="/suite-luxo" className="quartos-page-card-button">saiba mais</Link>
          </div>
          <div className="quartos-page-card">
            <div className="quartos-page-card-image premium"></div>
            <div className="quartos-page-card-icon"><FaTv /></div>
            <h3 className="quartos-page-card-title">Chále 06</h3>
            <div className="quartos-page-card-price">R$ 450 / Noite</div>
            <Link to="/suite-premium" className="quartos-page-card-button">saiba mais</Link>
          </div>
          <div className="quartos-page-card">
            <div className="quartos-page-card-image exclusiva"></div>
            <div className="quartos-page-card-icon"><FaTv /></div>
            <h3 className="quartos-page-card-title">Chále 07</h3>
            <div className="quartos-page-card-price">R$ 550 / Noite</div>
            <Link to="/suite-exclusiva" className="quartos-page-card-button">saiba mais</Link>
          </div>
          <div className="quartos-page-card">
            <div className="quartos-page-card-image chale05"></div>
            <div className="quartos-page-card-icon"><FaTv /></div>
            <h3 className="quartos-page-card-title">Dormitório 08 feminino</h3>
            <div className="quartos-page-card-price">R$ 400 / Noite</div>
            <Link to="/suite-chale05" className="quartos-page-card-button">saiba mais</Link>
          </div>
          <div className="quartos-page-card">
            <div className="quartos-page-card-image chale08"></div>
            <div className="quartos-page-card-icon"><FaTv /></div>
            <h3 className="quartos-page-card-title">Dormitório 09 masculino</h3>
            <div className="quartos-page-card-price">R$ 600 / Noite</div>
            <Link to="/suite-chale08" className="quartos-page-card-button">saiba mais</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Quartos

