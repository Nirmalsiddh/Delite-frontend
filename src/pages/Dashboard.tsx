import { useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import NotesDashboard from '../components/NotesDashboard';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load token from localStorage or URL param
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const newToken = urlParams.get('token');

    if (newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
      window.history.replaceState({}, document.title, '/dashboard');
    } else {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      } else {
        window.location.href = '/';
      }
    }
  }, []);

  // Decode user info when token changes
  useEffect(() => {
    if (token) {
      const decodedUser: any = jwtDecode(token);
      setUser(decodedUser);
    }
  }, [token]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  if (!token || !user) return null;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-title">📒 NoteBoard</h2>
        <div className="user-info" ref={dropdownRef}>
          <span className="user-name">{user.username}</span>
          <div
            className="user-avatar"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {(user?.username?.[0] || 'U').toUpperCase()}
          </div>

          {dropdownOpen && (
            <div className="user-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <NotesDashboard token={token} />
    </div>
  );
};

export default DashboardPage;
