import React from 'react';
import './Footer.css';
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className='footer-container'>
      <div className='footer-top px-60'>
        <div className='content'>
          <div className='footer-section'>
            <h3 className='font-semibold text-xl'>About Us</h3>
            <p>We’re a platform dedicated to directly connecting farmers with consumers, ensuring fresh, high-quality agricultural products reach your doorstep. No middlemen, just pure, farm-fresh goodness.</p>
          </div>

          <div className="footer-section">
            <h3 className='font-semibold text-xl'>Our Mission</h3>
            <p>Connecting farmers and consumers directly for a better and more sustainable future. We empower local farmers while bringing fresh produce to your table.</p>
          </div>
        </div>

        <div className='footer-section'>
          <h3 className='font-semibold text-xl'>Quick Links</h3>
          <a href="/home">Home</a>
          <a href="/shop">Shop</a>
          <a href="/about-us">About Us</a>
          <a href="/contact-us">Contact Us</a>
          <a href="/faqs">FAQs</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-and-conditions">Terms & Conditions</a>
        </div>

        <div className='footer-section'>
          <h3 className='font-semibold text-xl'>Follow Us</h3>
          <p>Stay connected with us for updates, special offers, and more!</p>
          <div className="social-icons">
            <a href="/"><FaFacebookF /></a>
            <a href="/"><FaInstagram /></a>
            <a href="/"><FaXTwitter /></a>
            <a href="/"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className='footer-section'>
          <h3 className='font-semibold text-xl'>Contact Us</h3>
          <p>Phone: +94 76 0202 918</p>
          <p>Email: sathyjaseelankeyithan@gmail.com</p>
          <p>Address: No:52, 2nd Cross Street, Vavuniya</p>
        </div>
      </div>
      <div className='footer-middle px-60'>
        <div className="footer-section news-letter">
          <h3 className='font-semibold text-xl'>Newsletter</h3>
          <div>
            <input type="text" placeholder='Enter Your Email Address' />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; 2024 Fshop. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
