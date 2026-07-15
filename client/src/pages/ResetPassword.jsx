import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. The link may have expired.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="auth-page">
        <button className="auth-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>
        <div className="auth-card">
          <div className="auth-success-icon">
            <CheckCircle size={48} strokeWidth={1.5} />
          </div>
          <h1 className="auth-title">Password Reset</h1>
          <p className="auth-subtitle">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
          <button className="auth-btn" onClick={() => navigate('/signin')}>
            Sign In
          </button>
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
        <h1 className="auth-title">Reset Password</h1>
        <p className="auth-subtitle">Enter your new password below.</p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="rp-password">New Password</label>
            <div className="auth-input-wrap">
              <Lock size={18} className="auth-input-icon" />
              <input
                id="rp-password"
                type={showPwd ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="auth-pwd-toggle"
                onClick={() => setShowPwd((p) => !p)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="rp-confirm">Confirm Password</label>
            <div className="auth-input-wrap">
              <Lock size={18} className="auth-input-icon" />
              <input
                id="rp-confirm"
                type={showPwd ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <p className="auth-footer">
          <Link to="/signin">Back to Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
