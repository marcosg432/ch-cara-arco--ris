import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Quartos from './pages/Quartos'
import Galeria from './pages/Galeria'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import SuiteImperial from './pages/suites/SuiteImperial'
import SuiteLuxo from './pages/suites/SuiteLuxo'
import SuitePremium from './pages/suites/SuitePremium'
import SuiteExclusiva from './pages/suites/SuiteExclusiva'
import SuiteChale05 from './pages/suites/SuiteChale05'
import SuiteChale08 from './pages/suites/SuiteChale08'
import Carrinho from './pages/Carrinho'
import Checkout from './pages/Checkout'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Financeiro from './pages/admin/Financeiro'
import Reservas from './pages/admin/Reservas'
import QuartosAdmin from './pages/admin/Quartos'
import Historico from './pages/admin/Historico'
import Gerenciamento from './pages/admin/Gerenciamento'
import Despesas from './pages/admin/Despesas'
import Planilha from './pages/admin/Planilha'
import VideoPreloader from './components/VideoPreloader'

function App() {
  console.log('App component rendering')
  return (
    <Router>
      <VideoPreloader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quartos" element={<Quartos />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/suite-imperial" element={<SuiteImperial />} />
        <Route path="/suite-luxo" element={<SuiteLuxo />} />
        <Route path="/suite-premium" element={<SuitePremium />} />
        <Route path="/suite-exclusiva" element={<SuiteExclusiva />} />
        <Route path="/suite-chale05" element={<SuiteChale05 />} />
        <Route path="/suite-chale08" element={<SuiteChale08 />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/financeiro" element={<Financeiro />} />
        <Route path="/admin/reservas" element={<Reservas />} />
        <Route path="/admin/quartos" element={<QuartosAdmin />} />
        <Route path="/admin/historico" element={<Historico />} />
        <Route path="/admin/gerenciamento" element={<Gerenciamento />} />
        <Route path="/admin/despesas" element={<Despesas />} />
        <Route path="/admin/planilha" element={<Planilha />} />
      </Routes>
    </Router>
  )
}

export default App

