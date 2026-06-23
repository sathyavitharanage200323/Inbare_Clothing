import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Mail, Phone, MapPin, Package, ClipboardList, CreditCard, LogOut } from 'lucide-react'
import './Profile.css'

function Profile() {
  const navigate = useNavigate()

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
  }

  return (
    <div className="profile-page">
      <button className="profile-back" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </button>

      <div className="profile-card">
        <div className="profile-avatar">
          <User size={36} />
        </div>
        <h1 className="profile-name">{user.name}</h1>
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
              <span className="profile-detail-value">{user.phone}</span>
            </div>
          </div>
          <div className="profile-detail-item">
            <MapPin size={18} />
            <div>
              <span className="profile-detail-label">Address</span>
              <span className="profile-detail-value">{user.address}</span>
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
          <button className="profile-link-btn profile-link-danger">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
