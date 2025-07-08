import { useState } from 'react';
import axios from 'axios';
import '../styles/AuthForms.css';

type Props = {
  switchToSignUp: () => void;
};

const SignInForm = ({ switchToSignUp }: Props) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendOTP = async () => {
    if (!email) {
      alert('Please enter your email.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/auth/send-login-otp', {
        email,
      }, { withCredentials: true });

      alert(res.data.message);
      setOtpSent(true);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to send OTP');
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
      const res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/auth/verify-otp', {
        email,
        otp,
      });

      const token = res.data.token;
      alert('Login successful!');
      localStorage.setItem('token', token);
      window.location.href = '/dashboard';
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Invalid OTP or login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    handleSendOTP();
  };

  return (
    <div className="signup-container">
      <h3>Sign in</h3>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        disabled={otpSent}
        className="signup-input"
      />

      {!otpSent ? (
        <button onClick={handleSendOTP} disabled={loading} className="signup-button">
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
            {loading ? 'Verifying...' : 'Verify OTP & Login'}
          </button>
          <button onClick={handleResendOTP} disabled={loading} className="resend-button">
            Resend OTP
          </button>
        </>
      )}

      <p>
        Don't have an account?{' '}
        <span className="link-text" onClick={switchToSignUp}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default SignInForm;
