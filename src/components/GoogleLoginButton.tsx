import { useState } from 'react';
import '../styles/GoogleLoginButton.css';
import googleIcon from '../assets/google-icon.png';

const GoogleLoginButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    try {
      window.location.assign(process.env.REACT_APP_BACKEND_URL + '/api/auth/google');
    } catch (error) {
      console.error(error);
      alert('Failed to redirect to Google login');
      setLoading(false);
    }
  };

  return (
    <button
      type='button'
      onClick={handleLogin}
      disabled={loading}
      className="google-login-button"
    >
      <img src={googleIcon} alt="Google" className="google-icon" />
      {loading ? 'Redirecting...' : 'Continue with Google'}
    </button>
  );
};

export default GoogleLoginButton;
