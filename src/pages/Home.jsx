import { Link } from 'react-router-dom'
import { FaSun, FaWater, FaStar, FaHeart, FaUmbrellaBeach } from 'react-icons/fa'
import Header from '../components/Header'
import { VerticalImageStack } from '../components/VerticalImageStack'
import ArcGalleryHero from '../components/ArcGalleryHero'
import { AnimatedMarqueeHero } from '../components/AnimatedMarqueeHero'
import Footer from '../components/Footer'
import './Home.css'

const Home = () => {
  console.log('Home component rendering')
  return (
    <div className="home">
      <Header />
      
      {/* Arc Gallery Hero Section */}
      <section className="arc-hero-section">
        <ArcGalleryHero
          images={[
            '/imagem/1.jpg',
            '/imagem/2.jpg',
            '/imagem/3.jpg',
            '/imagem/4.jpg',
            '/imagem/5.jpg',
            '/imagem/6.jpg',
            '/imagem/7.jpg',
            '/imagem/8.jpg',
            '/imagem/9.jpg',
            '/imagem/10.jpg',
            '/imagem/11.jpg',
            '/imagem/12.jpg'
          ]}
        />
      </section>

      {/* sobre nós */}
      <section className="sobre-section">
        <div className="sobre-container">
          <div className="sobre-text">
            <h2 className="sobre-title">sobre nós</h2>
            <p className="sobre-paragraph">
              A Chácara Arco-Íris é um espaço pensado para quem busca tranquilidade, conforto e contato direto com a natureza. Um lugar ideal para descanso, lazer e momentos especiais, seja para um fim de semana em família, uma viagem a dois ou para reunir amigos.
            </p>
            <p className="sobre-paragraph">
              Aqui, cada ambiente foi planejado para oferecer uma experiência completa, em um espaço acolhedor, bem cuidado e cercado por verde, onde é possível desacelerar e aproveitar o tempo com mais calma.
            </p>
            <p className="sobre-paragraph">
              Nossa estrutura conta com suítes confortáveis, áreas amplas de convivência e espaços ao ar livre que proporcionam bem-estar, privacidade e liberdade para famílias, casais ou grupos aproveitarem cada momento com tranquilidade.
            </p>
            <p className="sobre-paragraph">
              Além do conforto, prezamos pela segurança, organização e cuidado em cada detalhe, garantindo que sua estadia seja leve, agradável e sem preocupações.
            </p>
            <p className="sobre-paragraph">
              Na Chácara Arco-Íris, natureza, descanso e bons momentos caminham juntos para criar experiências simples, confortáveis e memoráveis.
            </p>
            <button className="sobre-button">saiba mais</button>
          </div>
          <div className="sobre-image">
            <img
              src="/imagem/imagem nova.png"
              alt="Chácara Arco Íris"
              className="sobre-image-foto"
            />
          </div>
        </div>
      </section>

      {/* suite */}
      <section className="quartos-section">
        <div className="quartos-container">
          <div className="quartos-card">
            <div className="quartos-card-image imperial"></div>
            <h3 className="quartos-card-title">Chále 03</h3>
            <div className="quartos-card-price">R$ 249 / Noite</div>
            <Link to="/suite-imperial" className="quartos-card-button">saiba mais</Link>
          </div>
          <div className="quartos-card">
            <div className="quartos-card-image luxo"></div>
            <h3 className="quartos-card-title">Chále 04</h3>
            <div className="quartos-card-price">R$ 350 / Noite</div>
            <Link to="/suite-luxo" className="quartos-card-button">saiba mais</Link>
          </div>
          <div className="quartos-card">
            <div className="quartos-card-image premium"></div>
            <h3 className="quartos-card-title">Chále 06</h3>
            <div className="quartos-card-price">R$ 450 / Noite</div>
            <Link to="/suite-premium" className="quartos-card-button">saiba mais</Link>
          </div>
        </div>
      </section>

      {/* Animated Marquee Hero Section */}
      <AnimatedMarqueeHero
        tagline=""
        title=""
        description=""
        ctaText=""
        images={[
          "/imagem/1.jpg",
          "/imagem/2.jpg",
          "/imagem/3.jpg",
          "/imagem/4.jpg",
          "/imagem/5.jpg",
          "/imagem/6.jpg",
          "/imagem/7.jpg",
          "/imagem/8.jpg"
        ]}
      />

      {/* imagem solo */}
      <section className="imagem-fundo-section"></section>

      {/* azul */}
      <section className="porque-section">
        <h2 className="porque-title">Por que escolher a Chácara Arco Íris?</h2>
        <div className="porque-grid">
          <div className="porque-card">
            <div className="porque-card-header">
              <h3 className="porque-card-title">Localização tranquila e privilegiada</h3>
              <FaSun className="porque-icon sol" />
            </div>
            <p className="porque-card-text">
              A Chácara Arco-Íris está localizada em uma região tranquila, cercada pela natureza, ideal para quem busca sossego, privacidade e fácil acesso. Um ambiente perfeito para descansar, relaxar e aproveitar momentos especiais longe da correria do dia a dia.
            </p>
            <FaWater className="porque-icon onda" />
          </div>
          <div className="porque-card">
            <div className="porque-card-header">
              <FaStar className="porque-icon estrela" />
              <h3 className="porque-card-title">Conforto e estrutura completa</h3>
              <FaStar className="porque-icon estrela" />
            </div>
            <p className="porque-card-text">
              Nossos espaços foram planejados para oferecer conforto, organização e bem-estar. Contamos com suítes aconchegantes, áreas de convivência bem cuidadas e ambientes pensados para receber famílias, casais e grupos com total comodidade.
            </p>
          </div>
          <div className="porque-card">
            <div className="porque-card-header">
              <h3 className="porque-card-title">Atendimento simples e acolhedor</h3>
            </div>
            <p className="porque-card-text">
              Prezamos por um atendimento atencioso e humanizado, garantindo que cada visitante se sinta bem-vindo desde o primeiro contato. Estamos sempre disponíveis para auxiliar no agendamento e tornar sua experiência leve e tranquila.
            </p>
            <FaHeart className="porque-icon coracao" />
          </div>
          <div className="porque-card">
            <div className="porque-card-header">
              <h3 className="porque-card-title">Ideal para descanso e lazer</h3>
            </div>
            <p className="porque-card-text">
              A Chácara Arco-Íris é o lugar ideal para descansar, comemorar ou simplesmente aproveitar bons momentos. Seja para um fim de semana, feriado ou ocasião especial, aqui você encontra tranquilidade, lazer e contato com a natureza em um só lugar.
            </p>
            <FaUmbrellaBeach className="porque-icon praia" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home

