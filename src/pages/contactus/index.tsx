import React from 'react';
import './Contact.css';

import { MdOutlineMailOutline } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

const Contact: React.FC = () => {

    return (
        <div>
            <Navbar />
            <hr className='sticky top-16' />
            <div className='contact-container'>
                <div className="contact-content-container">
                    <h1 className="contact-heading text-5xl font-semibold my-12">Contact Us</h1>
                    <p className="contact-description">We're always happy to hear from you! Whether you have a question, need assistance, or just want to share your thoughts, we're here to help.</p>
                    <hr />
                    <div className="contact-content">
                        <div className="contact-detail">
                            <div className="reach-us">
                                <h3 className='text-lg font-semibold'>Reach Us</h3>
                                <div>
                                    <p><MdOutlineMailOutline /> fshop.org@gmail.com</p>
                                    <p><LuPhoneCall /> +94 241 234 567, +94 123 456 789</p>
                                    <p><FaWhatsapp /> +94 123 456 789</p>
                                </div>
                            </div>

                            <div className="office-hours">
                                <h3 className='text-lg font-semibold'>Office Hours</h3>
                                <div>
                                    <p>Monday - Friday: 9:00 AM to 6:00 PM</p>
                                    <p>Saturday: 9:00 AM to 2:00 PM</p>
                                    <p>Sunday: Closed</p>
                                </div>
                            </div>

                            <div className="our-location">
                                <h3 className='text-lg font-semibold'>Our Location</h3>
                                <p><GrLocation /> No: 57, 2nd Cross Street, Vavuniya</p>
                            </div>
                        </div>

                        <form className="contact-form w-1/2">
                            <h3 className='text-xl font-semibold'>Send us a Message</h3>

                            <label htmlFor="name">Full Name:</label>
                            <input
                                className='input-bar'
                                type="text"
                                name='name'
                                placeholder='Enter Your Name'
                                required
                            />

                            <label htmlFor="email">Email Address:</label>
                            <input
                                className='input-bar'
                                type="email"
                                name='email'
                                placeholder='Enter Your Email Address'
                                required
                            />

                            <label htmlFor="number">Mobile Number:</label>
                            <input
                                className='input-bar'
                                type="tel"
                                name='number'
                                placeholder='Enter Your Mobile Number'
                                required
                            />

                            <label htmlFor="contact-method">Preferred Contact Method:</label>
                            <div className="contact-method">
                                <div>
                                    <input
                                        type="radio"
                                        id="email-contact"
                                        name='contact-method'
                                        value="email"
                                        required
                                    />
                                    <label htmlFor="email-contact">E-mail</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="mobile-contact"
                                        name='contact-method'
                                        value="mobile"
                                        required
                                    />
                                    <label htmlFor="mobile-contact">Mobile</label>
                                </div>
                            </div>

                            <label htmlFor="message">Message:</label>
                            <textarea
                                name="message"
                                cols={51}
                                rows={3}
                                placeholder='Enter Your Message'
                                required
                                className='py-2 px-3'
                            ></textarea>

                            <button type='submit'>
                                Send Message <RiSendPlaneFill />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact;
