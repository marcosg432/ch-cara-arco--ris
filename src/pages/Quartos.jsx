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
        <div className="quartos-hero-background"></div>
        <Header />
        <div className="quartos-hero-content">
          <h1 className="quartos-hero-title">Brisa Azul</h1>
          <p className="quartos-hero-subtitle">RESORT & SPA HOTEL</p>
        </div>
      </section>

      {/* Text Section */}
      <section className="quartos-text-section">
        <p className="quartos-text">
          CONHEÇA TODOS OS NOSSOS QUARTOS E ESCOLHA A OPÇÃO IDEAL PARA A SUA ESTADIA.
          NO BRISA IMPÉRIO, CADA SUÍTE OFERECE CONFORTO, TRANQUILIDADE E O AMBIENTE
          PERFEITO PARA VOCÊ RELAXAR E APROVEITAR MOMENTOS INESQUECÍVEIS.
        </p>
      </section>

      {/* Quartos Cards */}
      <section className="quartos-cards-section">
        <div className="quartos-cards-container">
          <div className="quartos-page-card">
            <div className="quartos-page-card-image imperial"></div>
            <div className="quartos-page-card-icon"><FaTv /></div>
            <h3 className="quartos-page-card-title">Suíte Brisa Premium</h3>
            <p className="quartos-page-card-description">
              A Suíte Brisa Premium é a escolha perfeita para quem deseja uma experiência exclusiva. Conta com acabamento refinado e um ambiente amplo, pensado para momentos especiais e inesquecíveis.
            </p>
            <div className="quartos-page-card-price">R$ 450 / Noite</div>
            <Link to="/suite-premium" className="quartos-page-card-button">saiba mais</Link>
          </div>
          <div className="quartos-page-card">
            <div className="quartos-page-card-image exclusiva"></div>
            <div className="quartos-page-card-icon"><FaTv /></div>
            <h3 className="quartos-page-card-title">Suíte Brisa Exclusiva (novo quarto)</h3>
            <p className="quartos-page-card-description">
              A Suíte Brisa Exclusiva combina elegância, conforto e privacidade em um só espaço. Ideal para quem busca uma estadia diferenciada, com mais tranquilidade e uma experiência única no Brisa Império.
            </p>
            <div className="quartos-page-card-price">R$ 550 / Noite</div>
            <Link to="/suite-exclusiva" className="quartos-page-card-button">saiba mais</Link>
          </div>
          <div className="quartos-page-card">
            <div className="quartos-page-card-image suite3"></div>
            <div className="quartos-page-card-icon"><FaTv /></div>
            <h3 className="quartos-page-card-title">Suíte Brisa Deluxe</h3>
            <p className="quartos-page-card-description">
              A Suíte Brisa Deluxe oferece um ambiente sofisticado com vista privilegiada e todos os detalhes para tornar sua estadia inesquecível. Perfeita para casais em busca de romance e tranquilidade.
            </p>
            <div className="quartos-page-card-price">R$ 400 / Noite</div>
            <Link to="/suite-deluxe" className="quartos-page-card-button">saiba mais</Link>
          </div>
          <div className="quartos-page-card">
            <div className="quartos-page-card-image suite4"></div>
            <div className="quartos-page-card-icon"><FaTv /></div>
            <h3 className="quartos-page-card-title">Suíte Brisa Master</h3>
            <p className="quartos-page-card-description">
              A Suíte Brisa Master é nosso espaço mais amplo e luxuoso, projetado para proporcionar máxima privacidade e conforto. Inclui área de estar exclusiva e todos os mimos para uma experiência premium.
            </p>
            <div className="quartos-page-card-price">R$ 500 / Noite</div>
            <Link to="/suite-master" className="quartos-page-card-button">saiba mais</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Quartos

