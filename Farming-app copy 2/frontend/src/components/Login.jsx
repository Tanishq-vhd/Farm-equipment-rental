// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from '../url/baseUrl';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Custom CSS file for styles

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseUrl}/api/auth/login`, { email, password });
      console.log(data);

      localStorage.setItem('user', JSON.stringify(data));

      alert('Login successful');
      navigate('/home');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container shadow-lg">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
        <div className="login-footer">
          <p>Don't have an account? <a href="/auth/register">Register here</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
