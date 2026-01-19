import { useState, useEffect, useRef } from 'react'
import './VideoPreloader.css'

const VideoPreloader = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    // Bloquear scroll quando o componente monta
    document.body.style.overflow = 'hidden'

    const video = videoRef.current
    if (!video) return

    // Garantir que o vídeo está muted e autoplay
    video.muted = true
    video.autoplay = true
    video.playsInline = true

    const handleVideoEnd = () => {
      // Iniciar fade out
      setIsFading(true)
      
      // Após o fade out, remover o componente
      setTimeout(() => {
        setIsVisible(false)
        // Liberar scroll
        document.body.style.overflow = ''
      }, 500) // 500ms para o fade out
    }

    video.addEventListener('ended', handleVideoEnd)

    // Tentar reproduzir o vídeo
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Erro ao reproduzir vídeo:', error)
      })
    }

    return () => {
      video.removeEventListener('ended', handleVideoEnd)
      // Garantir que o scroll seja liberado ao desmontar
      document.body.style.overflow = ''
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className={`video-preloader ${isFading ? 'fade-out' : ''}`}>
      <video
        ref={videoRef}
        className="video-preloader-video"
        muted
        autoPlay
        playsInline
      >
        <source src="/video/video 2.mp4" type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>
    </div>
  )
}

export default VideoPreloader

