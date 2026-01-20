import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSnowflake, FaLock, FaWifi, FaBriefcase, FaTv } from 'react-icons/fa'
import Header from '../components/Header'
import { getCarrinho, formatarMoeda } from '../utils/storage'
import './Carrinho.css'

// Mapeamento de quartos para imagens
const getQuartoImage = (quartoId) => {
  const imageMap = {
    'imperial': '/imagem/quartos/Chale-03.jpeg',
    'luxo': '/imagem/quartos/Chale-04.jpeg',
    'premium': '/imagem/quartos/Chale-06.jpeg',
    'exclusiva': '/imagem/quartos/Chale-07.jpeg',
    'chale05': '/imagem/quartos/dormitorio-feminino-08.jpeg',
    'chale08': '/imagem/quartos/dormitorio-masculino-09.jpeg'
  }
  return imageMap[quartoId] || '/imagem/quartos/Chale-03.jpeg'
}

const Carrinho = () => {
  const navigate = useNavigate()
  const [carrinho, setCarrinho] = useState(null)

  useEffect(() => {
    const carrinhoData = getCarrinho()
    if (!carrinhoData) {
      navigate('/')
      return
    }
    setCarrinho(carrinhoData)
  }, [navigate])

  if (!carrinho) return null

  return (
    <div className="carrinho-page">
      <Header />
      <div className="carrinho-container">
        <div className="carrinho-left">
          <div className="carrinho-image">
            <div 
              className="carrinho-image-placeholder"
              style={{ backgroundImage: `url(${getQuartoImage(carrinho.quartoId)})` }}
            ></div>
          </div>
          <div className="carrinho-amenities">
            <div className="carrinho-amenity-item">
              <span className="carrinho-amenity-icon"><FaSnowflake /></span>
              <span>Ar condicionado</span>
            </div>
            <div className="carrinho-amenity-item">
              <span className="carrinho-amenity-icon"><FaLock /></span>
              <span>Cofre</span>
            </div>
            <div className="carrinho-amenity-item">
              <span className="carrinho-amenity-icon"><FaWifi /></span>
              <span>Wi-fi</span>
            </div>
            <div className="carrinho-amenity-item">
              <span className="carrinho-amenity-icon"><FaBriefcase /></span>
              <span>Mesa de trabalho</span>
            </div>
            <div className="carrinho-amenity-item">
              <span className="carrinho-amenity-icon"><FaTv /></span>
              <span>Tv Smart</span>
            </div>
          </div>

          <div className="carrinho-rules-policies">
            <h4 className="carrinho-rules-title">Regras e Políticas</h4>
            <p className="carrinho-rules-details">Check-in: 12h | Check-out: 12h | Aceita pets | Estacionamento gratuito</p>
          </div>
        </div>

        <div className="carrinho-right">
          <div className="carrinho-summary">
            <div className="carrinho-header">
              <span className="carrinho-icon">🛒</span>
              <span className="carrinho-header-text">Meu carrinho</span>
              <img src="/icones/logo-arco-iris.png" className="carrinho-logo" alt="Chácara Arco Íris Logo" />
            </div>
            <div className="carrinho-divider"></div>
            
            <div className="carrinho-info">
              <p className="carrinho-hotel">Chácara Arco Íris</p>
              <p className="carrinho-dates">
                {new Date(carrinho.checkIn).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} ➞ {new Date(carrinho.checkOut).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} ({carrinho.noites}) Noites
              </p>
            </div>
            <div className="carrinho-divider"></div>
            
            <div className="carrinho-room">
              <p className="carrinho-room-label">Quarto Selecionado</p>
              <p className="carrinho-room-name">{carrinho.quartoNome}</p>
            </div>
            <div className="carrinho-divider"></div>
            
            <div className="carrinho-price">
              <p className="carrinho-price-label">R$ {formatarMoeda(carrinho.preco)} / Noite</p>
            </div>
            <div className="carrinho-divider"></div>
            
            <div className="carrinho-total">
              <p className="carrinho-total-label">Total</p>
              <p className="carrinho-total-value">{formatarMoeda(carrinho.total)}</p>
            </div>
            
            <button 
              className="carrinho-button"
              onClick={() => navigate('/checkout')}
            >
              Finalizar Reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carrinho

