import { useEffect, useState } from 'react';
import SignupForm from '../components/SignupForm';
import VerifyOTPForm from '../components/VerifyOTPForm';
import GoogleLoginButton from '../components/GoogleLoginButton';
import SignInForm from '../components/SignInForm';
import '../styles/HomePage.css';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const switchToSignIn = () => {
    setShowSignIn(true);
    setShowOTP(false);
  };

  const switchToSignUp = () => {
    setShowSignIn(false);
    setShowOTP(false);
  };

  // Optionally: auto-redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/dashboard';
    }
  }, []);

  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <h1>NoteBoard</h1>
        <p>Manage your personal notes securely & easily</p>
      </div>

      <div className="form-card">
        {!showOTP && !showSignIn && (
          <SignupForm
            onOTPSent={(emailValue) => {
              setEmail(emailValue);
              setShowOTP(true);
            }}
            setShowSignIn={setShowSignIn}
            switchToSignIn={switchToSignIn}
          />
        )}

        {showOTP && (
          <VerifyOTPForm
            email={email}
            onLoginSuccess={(token) => {
              localStorage.setItem('token', token);
              window.location.href = '/dashboard';
            }}
          />
        )}

        {showSignIn && (
          <SignInForm switchToSignUp={switchToSignUp} />
        )}

        <div className="or-divider">or</div>

        <GoogleLoginButton />
      </div>

      <footer className="homepage-footer">
        <p>Made by Nirmal Siddh — 2025! </p>
      </footer>
    </div>
  );
};

export default HomePage;
