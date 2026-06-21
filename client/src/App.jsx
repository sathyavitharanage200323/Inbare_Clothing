import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ToteBags from './pages/ToteBags'
import './styles/global.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/tote-bags" element={<ToteBags />} />
    </Routes>
  )
}

export default App
