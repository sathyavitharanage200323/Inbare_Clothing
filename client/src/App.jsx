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
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'
import StoreLayout from './components/StoreLayout'

import AdminLayout from './admin/AdminLayout'
import AdminRoute from './admin/AdminRoute'
import Dashboard from './admin/pages/Dashboard'
import Products from './admin/pages/Products'
import Categories from './admin/pages/Categories'
import Orders from './admin/pages/Orders'
import Users from './admin/pages/Users'
import Reviews from './admin/pages/Reviews'
import Wishlists from './admin/pages/Wishlists'

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
        {/* Store routes */}
        <Route element={<StoreLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/tote-bags" element={<ToteBags />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="wishlists" element={<Wishlists />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
