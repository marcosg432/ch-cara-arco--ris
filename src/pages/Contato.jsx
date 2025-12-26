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
                <img src="/icones/logo boa.png" className="contato-logo-icon" alt="Brisa Azul Logo" />
              </div>
              <button type="submit" className="contato-submit-button">
                Enviar
              </button>
            </div>
          </form>

          <div className="contato-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197576232123!2d-46.633331!3d-23.5505199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a2b2ed7f3a1%3A0xab35da2f5ca62674!2sS%C3%A3o%20Paulo%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890"
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

