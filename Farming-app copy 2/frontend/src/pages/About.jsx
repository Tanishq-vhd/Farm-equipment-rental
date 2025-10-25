import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="hero-content">
          <h1>About AgriGo</h1>
          <p>Empowering farmers with access to equipment</p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="section-content">
          <h2>Our Mission</h2>
          <p>
            At AgriGo, our mission is to provide farmers with easy access to
            high-quality farm equipment rentals, empowering them to increase
            productivity and efficiency while reducing costs. We believe in
            building a sustainable future for agriculture through innovative
            solutions.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="section-content">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card customer">
              <h3>Customer Focus</h3>
              <p>
                We are committed to providing exceptional service and support,
                understanding and exceeding our customers' expectations.
              </p>
            </div>
            <div className="value-card quality">
              <h3>Quality Equipment</h3>
              <p>
                We maintain a fleet of high-quality, well-maintained equipment
                that is safe and reliable for our customers.
              </p>
            </div>
            <div className="value-card sustainability">
              <h3>Sustainability</h3>
              <p>
                We promote sustainable agriculture practices and responsible
                equipment usage for a better future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Section */}
      <section className="future-section">
        <div className="section-content">
          <h2>Looking to the Future</h2>
          <div className="future-content">
            <div className="future-text">
              <p>
                We are committed to being the provider of farm equipment rentals,
                constantly expanding our fleet and services to meet evolving
                farmer needs. By embracing the latest agricultural technologies
                and innovations, we help farmers stay ahead in a changing
                industry.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
