import { useEffect } from 'react'
import Header from '../components/Header'
import { ImageGallery } from '../components/ImageGallery'
import Footer from '../components/Footer'
import './Galeria.css'

const Galeria = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="galeria-page">
      <section className="galeria-hero">
        <div className="galeria-hero-background"></div>
        <Header />
        <div className="galeria-hero-content">
          <h1 className="galeria-hero-title">Brisa Azul</h1>
          <p className="galeria-hero-subtitle">RESORT & SPA HOTEL</p>
        </div>
      </section>

      <section className="galeria-content">
        <ImageGallery />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Galeria

