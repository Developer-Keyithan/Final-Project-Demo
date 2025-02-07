import React from 'react';
import './About.css';
import Image from 'next/image';
import aboutImage from '../../Assets/About.png';
import { HiCheckBadge } from "react-icons/hi2";

const About: React.FC = () => {
  return (
    <div className='about-container mx-60 p-[20px] rounded-lg' id='about'>
      <div className='bg-white rounded-md py-16'>
        <div><h1 className='about-heading font-semibold'>About Us</h1></div>
        <div className='about-content-container gap-20'>
          <div className="about-content ">
            <p>Our platform <b>bridges the gap between farmers and consumers.</b> by <b>eliminating middlemen</b> like <b>wholesalers</b> and <b>retailers.</b> Our mission is to support farmers by offering them <b>fair prices</b> for their produce while providing <b>fresh, high-quality</b> agricultural products to consumers.</p>

            {/* <div>
              <p><strong>Join us in building a better future for farmers and consumers alike!</strong></p>
            </div> */}

            <div>
              <p>Why You Should Use Our Platform</p>
              <div>
                <div>
                  <span>
                    <i><HiCheckBadge /></i>
                    <p> Get fresh agricultural products at competitive prices, with out middlemen involved.</p>
                  </span>
                  <span>
                    <i><HiCheckBadge /></i>
                    <p> Enjoy high-quality, farm-fresh produce delivered right to your door.</p>
                  </span>
                  <span>
                    <i><HiCheckBadge /></i>
                    <p> Your purchase directly helps farmers earn better profits, empowering the agricultural community.</p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-img">
            <Image src={aboutImage} alt="About Us" layout="responsive" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
