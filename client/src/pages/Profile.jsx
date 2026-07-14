import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Mail, Phone, MapPin, Package, ClipboardList, CreditCard, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Profile.css'

function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="profile-page">
        <button className="profile-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>
        <div className="profile-card">
          <p>You are not signed in. <a href="/signin">Sign In</a></p>
        </div>
      </div>
    )
  }

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  const address = user.address
    ? [user.address.street, user.address.city, user.address.state, user.address.country].filter(Boolean).join(', ')
    : 'No address set'

  return (
    <div className="profile-page">
      <button className="profile-back" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </button>

      <div className="profile-card">
        <div className="profile-avatar">
          <User size={36} />
        </div>
        <h1 className="profile-name">{user.firstName} {user.lastName}</h1>
        <p className="profile-email">{user.email}</p>
      </div>

      <div className="profile-section">
        <h2 className="profile-section-title">Account Details</h2>
        <div className="profile-details">
          <div className="profile-detail-item">
            <Mail size={18} />
            <div>
              <span className="profile-detail-label">Email</span>
              <span className="profile-detail-value">{user.email}</span>
            </div>
          </div>
          <div className="profile-detail-item">
            <Phone size={18} />
            <div>
              <span className="profile-detail-label">Phone</span>
              <span className="profile-detail-value">{user.phone || 'Not set'}</span>
            </div>
          </div>
          <div className="profile-detail-item">
            <MapPin size={18} />
            <div>
              <span className="profile-detail-label">Address</span>
              <span className="profile-detail-value">{address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h2 className="profile-section-title">Quick Links</h2>
        <div className="profile-links">
          <button className="profile-link-btn" onClick={() => navigate('/orders')}>
            <ClipboardList size={20} />
            Order History
          </button>
          <button className="profile-link-btn">
            <Package size={20} />
            Track Order
          </button>
          <button className="profile-link-btn">
            <CreditCard size={20} />
            Payment Methods
          </button>
          <button className="profile-link-btn profile-link-danger" onClick={handleLogout}>
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
