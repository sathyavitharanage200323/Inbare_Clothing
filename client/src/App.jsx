import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ToteBags from './pages/ToteBags'
import Checkout from './pages/Checkout'
import SearchResults from './pages/SearchResults'
import './styles/global.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/tote-bags" element={<ToteBags />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  )
}

export default App
