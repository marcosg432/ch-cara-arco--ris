import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import './PrivateHeader.css'

const PrivateHeader = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'inicio', path: '/' },
    { name: 'Quartos', path: '/quartos' },
    { name: 'Galeria', path: '/galeria' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Contato', path: '/contato' }
  ]

  useEffect(() => {
    const currentPath = location.pathname
    // Nas páginas privadas (suites), sempre marcar "Quartos" como ativo
    const suitePages = ['/suite-imperial', '/suite-luxo', '/suite-premium', '/suite-exclusiva', '/suite-chale05', '/suite-chale08']
    const isSuitePage = suitePages.some(page => currentPath.startsWith(page))
    
    if (isSuitePage) {
      setActiveTab('Quartos')
      return
    }
    
    const activeItem = navItems.find(item => {
      if (item.path === '/') {
        return currentPath === '/'
      }
      return currentPath.startsWith(item.path)
    })
    setActiveTab(activeItem ? activeItem.name : 'inicio')
  }, [location.pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="private-header">
      <div className="private-header-container">
        <Link to="/" className="private-logo" onClick={closeMenu}>
          <img src="/icones/logo-arco-iris.png" className="private-logo-icon" alt="Chácara Arco Íris Logo" />
        </Link>
        <button className="private-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={`private-nav ${isMenuOpen ? 'private-nav-open' : ''}`}>
          {navItems.map((item) => {
            const isActive = activeTab === item.name
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`private-nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="private-nav-link-text">{item.name}</span>
                {isActive && (
                  <>
                    <motion.div
                      layoutId="lamp-private"
                      className="private-lamp-indicator"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="private-lamp-glow">
                        <div className="private-lamp-glow-inner"></div>
                      </div>
                    </motion.div>
                    <motion.div
                      layoutId="active-bg-private"
                      className="private-active-background"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  </>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default PrivateHeader

