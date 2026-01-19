import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Contato.css'

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Mensagem enviada com sucesso!')
    setFormData({ nome: '', email: '', telefone: '', mensagem: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="contato-page">
      <section className="contato-hero">
        <div className="contato-hero-background"></div>
        <Header />
        <div className="contato-hero-content">
          <h1 className="contato-hero-title">Contato</h1>
        </div>
      </section>

      <section className="contato-content">
        <div className="contato-container">
          <form className="contato-form" onSubmit={handleSubmit}>
            <div className="contato-form-left">
              <div className="contato-form-group">
                <label>Nome completo*</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contato-form-group">
                <label>E-mail*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contato-form-group">
                <label>Telefone*</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contato-form-group">
                <label>Mensagem*</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>
            </div>
            <div className="contato-form-right">
              <div className="contato-logo">
                <img src="/icones/logo boa.png" className="contato-logo-icon" alt="Chácara Arco Íris Logo" />
              </div>
              <div className="contato-info">
                <p><strong>Telefone/WhatsApp:</strong> (83) 98805-0587</p>
                <p><strong>E-mail:</strong> valentnet1990@gmail.com</p>
                <p><strong>Endereço:</strong> Sítio Mata D'água, Granja 22 - Alhandra/PB - CEP 58322-000</p>
              </div>
              <button type="submit" className="contato-submit-button">
                Enviar
              </button>
            </div>
          </form>

          <div className="contato-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3342!2d-34.9068!3d-7.4346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ac8b7c8b8b8b8b8%3A0x8b8b8b8b8b8b8b8b!2sS%C3%ADtio%20Mata%20D%27%C3%A1gua%2C%20Granja%2022%20-%20Alhandra%2FPB!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Contato

