// LandingPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Custom CSS for styling
import Slider from 'react-slick';
const LandingPage = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section text-center">
        <Slider {...sliderSettings} className="hero-slider">
          <div className="slider-image">
            <img src="/farming-hero.avif" alt="Tractor" />
          </div>
          <div className="slider-image">
            <img src="/farming-hero.avif" alt="Harvester" />
          </div>
          <div className="slider-image">
            <img src="/farming-hero.avif" alt="Planting Equipment" />
          </div>
        </Slider>
        
        <div className="container slider-overlay">
          <h1 className="display-4">Welcome to AgriGo</h1>
          <p className="lead">
            Rent farming equipment easily and affordably, or list your unused equipment to help fellow farmers.
          </p>
          <Link to="/auth" className="btn btn-success btn-lg mx-2">
            Get Started
          </Link>
          <Link to="/home" className="btn btn-explore btn-outline-light btn-lg mx-2">
            Explore Equipment
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <div className="feature-box">
                <i className="fas fa-tractor fa-3x mb-3 text-success"></i>
                <h3>Wide Range of Equipment</h3>
                <p>
                  Choose from a variety of farming equipment available for rent. From tractors to seeders, we have it all.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box">
                <i className="fas fa-hand-holding-usd fa-3x mb-3 text-success"></i>
                <h3>Affordable Pricing</h3>
                <p>
                  Transparent and reasonable rental prices. Pay only for what you need, when you need it.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box">
                <i className="fas fa-users fa-3x mb-3 text-success"></i>
                <h3>Community-Driven</h3>
                <p>
                  Connect with other farmers and share resources to help each other grow and prosper.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">How It Works</h2>
          <div className="row text-center">
            <div className="col-md-3">
              <div className="step-box">
                <div className="step-number">1</div>
                <h4>Create an Account</h4>
                <p>Sign up and set up your profile to get started.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="step-box">
                <div className="step-number">2</div>
                <h4>Browse Equipment</h4>
                <p>Search for the equipment you need and check availability.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="step-box">
                <div className="step-number">3</div>
                <h4>Rent or List</h4>
                <p>Rent equipment instantly or list your own items for other farmers to use.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="step-box">
                <div className="step-number">4</div>
                <h4>Grow Together</h4>
                <p>Get the equipment you need and help others by sharing your resources.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section text-center py-5">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join our community of farmers and start renting or lending equipment today!</p>
          <Link to="/auth" className="btn btn-primary btn-lg mx-2">
            Join Now
          </Link>
          <Link to="/auth" className="btn btn-outline-light btn-lg mx-2">
            Log In
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
