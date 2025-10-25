import React, { useEffect, useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { useNavigate } from 'react-router-dom';
// import './Auth.css';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      navigate('/home');
    }
  }, [navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mt-5">
      <div className="card w-50 mx-auto">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                className={`nav-link nav-link-auth ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => handleTabClick('login')}
              >
                Login
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link   ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => handleTabClick('register')}
              >
                Register
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {activeTab === 'login' ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
