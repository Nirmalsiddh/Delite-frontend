import { useState } from 'react';
import axios from 'axios';
import '../styles/AuthForms.css';

type Props = {
  onOTPSent: (email: string) => void;
  setShowSignIn: (value: boolean) => void;
  switchToSignIn: () => void;
};

const SignupForm = ({ onOTPSent, setShowSignIn, switchToSignIn }: Props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignup = async () => {
    if (!email || !username) {
      alert('Please enter both username and email.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        username,
      }, { withCredentials: true });

      alert('OTP sent to your email');
      setOtpSent(true);
      onOTPSent(email);
    } catch (err: any) {
      const message = err.response?.data?.message;
      if (message === 'User already exists with this email') {
        alert('You already have an account — please sign in.');
        setShowSignIn(true);
      } else {
        alert(message || 'Signup failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      alert('Please enter the OTP.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email,
        otp,
      });

      const token = res.data.token;
      alert('Signup successful!');
      localStorage.setItem('token', token);
      window.location.href = '/dashboard';
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Invalid OTP or signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    handleSignup();
  };

  return (
    <div className="signup-container">
      <h3>Sign up</h3>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        disabled={otpSent}
        className="signup-input"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        disabled={otpSent}
        className="signup-input"
      />

      {!otpSent ? (
        <button onClick={handleSignup} disabled={loading} className="signup-button">
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      ) : (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="signup-input"
          />
          <button onClick={handleVerifyOTP} disabled={loading} className="signup-button">
            {loading ? 'Verifying...' : 'Verify OTP & Signup'}
          </button>
          <button onClick={handleResendOTP} disabled={loading} className="resend-button">
            Resend OTP
          </button>
        </>
      )}

      <p>
        Already have an account?{' '}
        <span className="link-text" onClick={switchToSignIn}>
          Sign In
        </span>
      </p>
    </div>
  );
};

export default SignupForm;
