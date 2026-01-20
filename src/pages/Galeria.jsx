import { useEffect, useRef } from 'react'
import Header from '../components/Header'
import { ImageGallery } from '../components/ImageGallery'
import Footer from '../components/Footer'
import './Galeria.css'

const Galeria = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Garantir qualidade máxima do vídeo
    if (videoRef.current) {
      const video = videoRef.current
      video.muted = true
      video.autoplay = true
      video.loop = true
      video.playsInline = true
    }
  }, [])

  return (
    <div className="galeria-page">
      <section className="galeria-hero">
        <div className="galeria-hero-background">
          <video 
            ref={videoRef}
            className="galeria-hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            webkit-playsinline="true"
          >
            <source src="/video/video-banner-galeria.mp4" type="video/mp4" />
          </video>
        </div>
        <Header />
        <div className="galeria-hero-content">
          <h1 className="galeria-hero-title">Chácara Arco Íris</h1>
          <p className="galeria-hero-subtitle">CHÁCARA & HOSPEDAGEM</p>
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

