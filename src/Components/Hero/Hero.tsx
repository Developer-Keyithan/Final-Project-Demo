"use client";

import React from 'react';
import './Hero.css';
import { useRouter } from 'next/navigation';

const Hero: React.FC = () => {
  const router = useRouter();

  const handleSignup = () => {
    router.push('/signup');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="hero-container">
      <div className="hero-image">
        <div className="image-gradient"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-heading">Pure Agriculture <br /> Products</h1>
        <p className="hero-subheading">
          Welcome to <strong>Fermire</strong>. We believe in better agriculture for a better future.
        </p>
        <div className="hero-btn">
          <button onClick={handleSignup} className="btn-primary">Sign Up</button>
          <button onClick={handleLogin} className="btn-secondary">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;