import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Homepage from './pages/Homepage';
import './App.css'
import About from './pages/About'; // Ensure this import is correct
import Contact from './pages/Contact'; // Ensure this import is correct
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
//import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import EquipmentList from './components/EquipmentList';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const [user,setUser] = useState(null);

  
  useEffect(() => {
    const fetchUser = () => {
      setUser(JSON.parse( localStorage.getItem('user')));
      // console.log(user);
    }
    fetchUser();
  }, [])
  
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage  />} />
        <Route path="/auth" element={<Auth  />} />
        <Route path="/about" element={<About />} /> {/* About route */}
        <Route path="/contact" element={<Contact />} /> {/* Contact route */}
        <Route path="/auth/login" element={<Login  />} />
        <Route path="/auth/register" element={<Register  />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {/*<Footer/>*/}
    </Router>
    </>
  );
}
export default App;
