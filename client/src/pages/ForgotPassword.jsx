import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="auth-page">
        <button className="auth-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>
        <div className="auth-card">
          <div className="auth-success-icon">
            <CheckCircle size={48} strokeWidth={1.5} />
          </div>
          <h1 className="auth-title">Check Your Email</h1>
          <p className="auth-subtitle">
            We've sent a password reset link to <strong>{email}</strong>.
            Please check your inbox and follow the instructions.
          </p>
          <p className="auth-footer">
            <Link to="/signin">Back to Sign In</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <button className="auth-back" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </button>

      <div className="auth-card">
        <h1 className="auth-title">Forgot Password</h1>
        <p className="auth-subtitle">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="fp-email">Email</label>
            <div className="auth-input-wrap">
              <Mail size={18} className="auth-input-icon" />
              <input
                id="fp-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="auth-footer">
          Remember your password? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
