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
                <img src="/icones/logo-arco-iris.png" className="contato-logo-icon" alt="Chácara Arco Íris Logo" />
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
              src="https://www.google.com/maps?q=Sítio+Mata+D'água,+Granja+22,+Alhandra,+PB,+58322-000&output=embed"
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

