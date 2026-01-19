import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setUsuarioLogado } from '../../utils/storage'
import PixelCursorTrail from '../../components/PixelCursorTrail'
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: '',
    email: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setUsuarioLogado(formData)
    navigate('/admin')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="login-page">
      <PixelCursorTrail />
      <div className="login-logo-corner">
        <img src="/icones/logo boa.png" className="login-logo-corner-icon" alt="Chácara Arco Íris Logo" />
      </div>
      <div className="login-container">
        <div className="login-logo">
          <div className="login-logo-icon"></div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-form-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-info">
            <p>Este sistema funcional possui login e senha reais, disponíveis apenas para pessoas autorizadas.</p>
          </div>
          <button type="submit" className="login-button">
            Fazer login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login


