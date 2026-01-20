import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../utils/storage'
import './AdminHeader.css'

const AdminHeader = ({ currentPage }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <header className="admin-header">
      <div className="admin-header-top">
        <Link to="/admin" className="admin-logo">
        </Link>
        <button onClick={handleLogout} className="admin-logout">Sair</button>
      </div>
      <nav className="admin-nav">
        <Link to="/admin/financeiro" className={currentPage === 'financeiro' ? 'active' : ''}>
          Financeiro
        </Link>
        <Link to="/admin/reservas" className={currentPage === 'reservas' ? 'active' : ''}>
          Reservas
        </Link>
        <Link to="/admin/quartos" className={currentPage === 'quartos' ? 'active' : ''}>
          Quartos
        </Link>
        <Link to="/admin/historico" className={currentPage === 'historico' ? 'active' : ''}>
          Histórico
        </Link>
        <Link to="/admin/gerenciamento" className={currentPage === 'gerenciamento' ? 'active' : ''}>
          Gerenciamento
        </Link>
        <Link to="/admin/despesas" className={currentPage === 'despesas' ? 'active' : ''}>
          Gerenciar despesas
        </Link>
      </nav>
    </header>
  )
}

export default AdminHeader


