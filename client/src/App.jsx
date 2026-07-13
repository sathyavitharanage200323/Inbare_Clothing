import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ToteBags from './pages/ToteBags'
import Checkout from './pages/Checkout'
import SearchResults from './pages/SearchResults'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import ScrollToTop from './components/ScrollToTop'
import './styles/global.css'

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/tote-bags" element={<ToteBags />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </>  
  )
}

export default App
