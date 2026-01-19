import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import './ArcGalleryHero.css'

const ArcGalleryHero = ({ 
  images, 
  startAngle = 20, 
  endAngle = 160,
  radiusLg = 480,
  radiusMd = 360,
  radiusSm = 260,
  cardSizeLg = 120,
  cardSizeMd = 100,
  cardSizeSm = 80,
  className = ''
}) => {
  const [dimensions, setDimensions] = useState({
    radius: radiusLg,
    cardSize: cardSizeLg,
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [clickedCard, setClickedCard] = useState(null)
  const cardRefs = useRef({})
  const modalRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm })
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd })
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm])

  const count = Math.max(images.length, 2)
  const step = (endAngle - startAngle) / (count - 1)

  // Calcular posições X de todas as imagens para ordenar da esquerda para direita
  const sortedImages = useMemo(() => {
    const imagePositions = images.map((src, i) => {
      const angle = startAngle + step * i
      const angleRad = (angle * Math.PI) / 180
      const x = Math.cos(angleRad) * dimensions.radius
      return { index: i, x, src }
    })
    // Ordenar por posição X (da esquerda para direita)
    return [...imagePositions].sort((a, b) => a.x - b.x)
  }, [images, startAngle, endAngle, step, dimensions.radius])

  const handleImageClick = (index, src, event) => {
    const cardElement = cardRefs.current[index]
    if (!cardElement) return

    const rect = cardElement.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    setClickedCard({ index, centerX, centerY, width: rect.width, height: rect.height })
    setSelectedImage(src)
    
    // Pequeno delay para capturar a posição antes da animação
    setTimeout(() => {
      document.body.style.overflow = 'hidden'
    }, 100)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
    setTimeout(() => {
      setClickedCard(null)
      document.body.style.overflow = ''
    }, 300)
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedImage) {
        handleCloseModal()
      }
    }

    if (selectedImage) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [selectedImage])

  return (
    <section className={`arc-gallery-hero ${className}`}>
      <div 
        className="arc-gallery-hero-container"
        style={{
          width: '100%',
          height: dimensions.radius * 0.9,
        }}
      >
        <div className="arc-gallery-hero-center">
          {images.map((src, i) => {
            const angle = startAngle + step * i
            const angleRad = (angle * Math.PI) / 180
            
            const x = Math.cos(angleRad) * dimensions.radius
            const y = Math.sin(angleRad) * dimensions.radius
            
            // Encontrar a posição na ordem da esquerda para direita
            const sortedIndex = sortedImages.findIndex(item => item.index === i)
            const animationDelay = sortedIndex * 300 // 300ms entre cada imagem (mais lento)
            
            return (
              <div
                key={i}
                ref={el => cardRefs.current[i] = el}
                className="arc-gallery-hero-card"
                style={{
                  width: dimensions.cardSize,
                  height: dimensions.cardSize,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translate(-50%, 50%)`,
                  animationDelay: `${animationDelay}ms`,
                  zIndex: 100 + (count - i),
                  '--rotation': `${angle / 4}deg`,
                }}
              >
                <div 
                  className="arc-gallery-hero-card-inner"
                  style={{ 
                    transform: `rotate(${angle / 4}deg)`,
                    '--rotation': `${angle / 4}deg`
                  }}
                  onClick={(e) => handleImageClick(i, src, e)}
                >
                  <img
                    src={src}
                    alt={`Imagem ${i + 1}`}
                    className="arc-gallery-hero-image"
                    draggable={false}
                    onError={(e) => {
                      e.target.src = `https://placehold.co/400x400/334155/e2e8f0?text=Memoria`
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="arc-gallery-hero-content">
        <div className="arc-gallery-hero-text">
          <h1 className="arc-gallery-hero-title">
            <span className="title-line-1">Chácara</span>
            <span className="title-line-2">Arco-Íris</span>
          </h1>
          <p className="arc-gallery-hero-subtitle">
            Aluguel de chácara para lazer, descanso e momentos especiais
          </p>
          <div className="arc-gallery-hero-buttons">
            <Link to="/quartos" className="arc-gallery-hero-button-primary">
              Ver Nossos Quartos
            </Link>
            <Link to="/sobre" className="arc-gallery-hero-button-secondary">
              Conheça Nossa História
            </Link>
          </div>
        </div>
      </div>

      {/* Modal para imagem em tela cheia */}
      {selectedImage && clickedCard && (
        <div 
          className="arc-gallery-modal-overlay"
          onClick={handleCloseModal}
        >
          <div 
            ref={modalRef}
            className="arc-gallery-modal arc-gallery-modal-opening"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="arc-gallery-modal-close"
              onClick={handleCloseModal}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
            <img
              src={selectedImage}
              alt="Imagem em tela cheia"
              className="arc-gallery-modal-image"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default ArcGalleryHero

