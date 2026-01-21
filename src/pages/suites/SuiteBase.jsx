import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import PrivateHeader from '../../components/PrivateHeader'
import Footer from '../../components/Footer'
import Calendar from '../../components/Calendar'
import { format } from 'date-fns'
import { saveCarrinho, formatarMoeda } from '../../utils/storage'
import './SuiteBase.css'

const SuiteBase = ({ suiteData }) => {
  const navigate = useNavigate()
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showCalendar, setShowCalendar] = useState({ checkIn: false, checkOut: false })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Imagens do carrossel - mapeadas por quarto
  const getSuiteImages = () => {
    const imageMap = {
      'imperial': ['/imagem/quartos/Chale-03.jpeg'],
      'luxo': ['/imagem/quartos/Chale-04.jpeg'],
      'chale05': ['/imagem/quartos/dormitorio-feminino-08.jpeg'],
      'premium': ['/imagem/quartos/Chale-06.jpeg'],
      'exclusiva': ['/imagem/quartos/Chale-07.jpeg'],
      'chale08': ['/imagem/quartos/dormitorio-masculino-09.jpeg']
    }
    return imageMap[suiteData.id] || ['/imagem/quartos/Chale-03.jpeg']
  }
  
  const suiteImages = getSuiteImages()

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    pessoas: 0,
    temCriancas: false,
    quantidadeCriancas: 0,
    idades: [],
    checkIn: null,
    checkOut: null
  })

  const handleDateSelect = (checkIn, checkOut) => {
    setFormData({
      ...formData,
      checkIn,
      checkOut
    })
    setShowCalendar({ checkIn: false, checkOut: false })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleCriancasChange = (e) => {
    const temCriancas = e.target.checked
    setFormData({
      ...formData,
      temCriancas,
      quantidadeCriancas: temCriancas ? 1 : 0,
      idades: temCriancas ? [0] : []
    })
  }

  const handleQuantidadeCriancas = (e) => {
    const quantidade = parseInt(e.target.value) || 0
    const maxCriancas = Math.min(quantidade, 4)
    setFormData({
      ...formData,
      quantidadeCriancas: maxCriancas,
      idades: Array(maxCriancas).fill(0).map((_, i) => formData.idades[i] || 0)
    })
  }

  const handleIdadeChange = (index, value) => {
    const novasIdades = [...formData.idades]
    novasIdades[index] = parseInt(value) || 0
    setFormData({
      ...formData,
      idades: novasIdades
    })
  }

  const calcularTotal = () => {
    if (!formData.checkIn || !formData.checkOut) return 0
    const diffTime = Math.abs(formData.checkOut - formData.checkIn)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays * suiteData.preco
  }

  const calcularNoites = () => {
    if (!formData.checkIn || !formData.checkOut) return 0
    const diffTime = Math.abs(formData.checkOut - formData.checkIn)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Autoplay do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % suiteImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [suiteImages.length])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % suiteImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + suiteImages.length) % suiteImages.length)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.checkIn || !formData.checkOut) {
      alert('Por favor, selecione as datas de check-in e check-out')
      return
    }

    const carrinho = {
      ...formData,
      quartoId: suiteData.id,
      quartoNome: suiteData.nome,
      preco: suiteData.preco,
      total: calcularTotal(),
      noites: calcularNoites()
    }

    saveCarrinho(carrinho)
    navigate('/carrinho')
  }

  return (
    <div className="suite-page">
      <PrivateHeader />
      
      <div className="suite-container">
        <div className="suite-left">
          <div className="suite-image-carousel">
            <div 
              className="suite-carousel-image"
              style={{ backgroundImage: `url(${suiteImages[currentImageIndex]})` }}
            >
              <button 
                className="suite-carousel-button suite-carousel-button-prev"
                onClick={prevImage}
                aria-label="Imagem anterior"
              >
                <FaChevronLeft />
              </button>
              <button 
                className="suite-carousel-button suite-carousel-button-next"
                onClick={nextImage}
                aria-label="Próxima imagem"
              >
                <FaChevronRight />
              </button>
              <div className="suite-carousel-dots">
                {suiteImages.map((_, index) => (
                  <button
                    key={index}
                    className={`suite-carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Ir para imagem ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="suite-description">
            <h2 className="suite-title">{suiteData.nome}</h2>
            <div className="suite-capacity-info">
              {suiteData.id === 'chale05' ? (
                <>
                  <p className="suite-capacity-text">
                    <strong>Capacidade:</strong> 14 acomodações
                  </p>
                  <p className="suite-capacity-text">
                    <strong>Contendo:</strong> 6 beliches e 2 camas de casal
                  </p>
                </>
              ) : suiteData.id === 'chale08' ? (
                <>
                  <p className="suite-capacity-text">
                    <strong>Capacidade:</strong> 12 acomodações
                  </p>
                  <p className="suite-capacity-text">
                    <strong>Contendo:</strong> 5 beliches e 2 camas solteiro
                  </p>
                </>
              ) : (
                <>
                  <p className="suite-capacity-text">
                    <strong>Capacidade:</strong> 6 pessoas
                  </p>
                  <p className="suite-capacity-text">
                    <strong>Contendo:</strong> 1 cama de casal e 2 beliches
                  </p>
                </>
              )}
            </div>
          </div>


          <div className="suite-rules-policies">
            <h4 className="suite-rules-title">Regras e Políticas</h4>
            <p className="suite-rules-details">Check-in: 12h | Check-out: 12h | Aceita pets | Estacionamento gratuito</p>
          </div>

          {!showBookingForm && (
            <button 
              className="suite-initial-reserve-button"
              onClick={() => setShowBookingForm(true)}
            >
              Fazer reserva
            </button>
          )}
        </div>

        {showBookingForm && (
          <div className="suite-booking-below">
          <div className="suite-booking">
            <h3 className="suite-booking-title">{suiteData.nome}</h3>
            
            <div className="suite-booking-info">
              <div className="booking-info-item">
                <label>Horário de check-in</label>
                <p>check-in a partir das 12:00</p>
                <p>check-out ate as 10:00</p>
              </div>
              <div className="booking-info-item">
                <label>Capacidade de pessoas</label>
                <p>Máximo {suiteData.id === 'chale05' ? '14' : suiteData.id === 'chale08' ? '12' : '6'} pessoas</p>
              </div>
              <div className="booking-info-item">
                <label>Valor da diaria</label>
                <p className="booking-price">R$ {formatarMoeda(suiteData.preco)} / Noite</p>
              </div>
            </div>

            <form className="suite-form" onSubmit={handleSubmit}>
              <div className="form-dates">
                <div className="form-date-group">
                  <label>Check-in</label>
                  <input
                    type="text"
                    value={formData.checkIn ? format(formData.checkIn, 'dd/MM/yyyy') : ''}
                    onClick={() => setShowCalendar({ checkIn: true, checkOut: false })}
                    readOnly
                    placeholder="Selecione a data"
                  />
                  {showCalendar.checkIn && (
                    <div className="calendar-popup">
                      <Calendar
                        quartoId={suiteData.id}
                        checkIn={formData.checkIn}
                        checkOut={formData.checkOut}
                        onDateSelect={handleDateSelect}
                        selectingCheckIn={true}
                      />
                    </div>
                  )}
                </div>
                <div className="form-date-group">
                  <label>Check-out</label>
                  <input
                    type="text"
                    value={formData.checkOut ? format(formData.checkOut, 'dd/MM/yyyy') : ''}
                    onClick={() => setShowCalendar({ checkIn: false, checkOut: true })}
                    readOnly
                    placeholder="Selecione a data"
                  />
                  {showCalendar.checkOut && (
                    <div className="calendar-popup">
                      <Calendar
                        quartoId={suiteData.id}
                        checkIn={formData.checkIn}
                        checkOut={formData.checkOut}
                        onDateSelect={handleDateSelect}
                        selectingCheckIn={false}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nome completo*</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Telefone*</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>E-mail*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Pessoas*</label>
                  <input
                    type="number"
                    name="pessoas"
                    value={formData.pessoas}
                    onChange={handleChange}
                    min="1"
                    max={suiteData.id === 'chale05' ? '14' : suiteData.id === 'chale08' ? '12' : '6'}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>nome da suite</label>
                <input
                  type="text"
                  value={suiteData.nome}
                  readOnly
                />
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  name="temCriancas"
                  checked={formData.temCriancas}
                  onChange={handleCriancasChange}
                />
                <label>Há crianças?</label>
              </div>

              {formData.temCriancas && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Quantas*</label>
                      <input
                        type="number"
                        value={formData.quantidadeCriancas}
                        onChange={handleQuantidadeCriancas}
                        min="1"
                        max="4"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Idades*</label>
                      <select
                        value={formData.idades[0] || 0}
                        onChange={(e) => handleIdadeChange(0, e.target.value)}
                        required
                      >
                        {Array.from({ length: 17 }, (_, i) => i + 1).map(idade => (
                          <option key={idade} value={idade}>{idade} anos</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {formData.quantidadeCriancas > 1 && (
                    <div className="form-group">
                      <label>Idades das outras crianças*</label>
                      {Array.from({ length: formData.quantidadeCriancas - 1 }, (_, i) => (
                        <select
                          key={i}
                          value={formData.idades[i + 1] || 0}
                          onChange={(e) => handleIdadeChange(i + 1, e.target.value)}
                          required
                          style={{ marginBottom: '10px' }}
                        >
                          {Array.from({ length: 17 }, (_, j) => j + 1).map(idade => (
                            <option key={idade} value={idade}>{idade} anos</option>
                          ))}
                        </select>
                      ))}
                    </div>
                  )}
                </>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>R$ {formatarMoeda(suiteData.preco)} / Noite</label>
                </div>
                <div className="form-group">
                  <label>Total de Noite</label>
                  <input
                    type="text"
                    value={calcularNoites()}
                    readOnly
                  />
                </div>
              </div>

              <div className="form-total">
                <label>Total / R$ {formatarMoeda(calcularTotal())}</label>
              </div>

              <button type="submit" className="form-submit-button">
                Fazer reserva
              </button>
            </form>
          </div>
        </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default SuiteBase

