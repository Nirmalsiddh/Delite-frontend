import { useState } from 'react';
import axios from 'axios';
import '../styles/AuthForms.css';

type Props = {
  email: string;
  onLoginSuccess: (token: string) => void;
};

const VerifyOTPForm = ({ email, onLoginSuccess }: Props) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) {
      alert('Please enter the OTP');
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      alert('OTP must be a 6-digit number.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email,
        otp,
      });

      const token = res.data.token;
      alert('OTP verified successfully!');
      onLoginSuccess(token);

    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Invalid OTP or something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <div className="signup-container">
      <h3>Enter OTP sent to <span style={{ color: 'var(--primary-color)' }}>{email}</span></h3>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="6-digit OTP"
        maxLength={6}
        className="signup-input"
        disabled={loading}
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="signup-button"
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
    </div>
  );
};

export default VerifyOTPForm;
