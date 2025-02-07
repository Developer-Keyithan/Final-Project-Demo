import React, { useState } from 'react';
import './Login.css';
import { MdOutlineLogin } from "react-icons/md";
import { FaGoogle, FaFacebook, FaApple, FaTiktok } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiUser } from 'react-icons/bi';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Login: React.FC = () => {
    const router = useRouter();

    const [emailOrMobileNumber, setEmailOrMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const isLoading= false

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const errors = [];

        if (!emailOrMobileNumber) errors.push('e-mail or mobile number');
        if (!password) errors.push('password');

        if (errors.length > 0) {
            const errorMessage = errors
                .map((field, index) => {
                    if (index === 0) {
                        return field.charAt(0).toUpperCase() + field.slice(1);
                    } else {
                        return field;
                    }
                })
                .join(', ')
                .replace(/,([^,]*)$/, ' and$1');
            const plural = errors.length > 1 ? 'are' : 'is';
            const lastWord = errors.length > 1 ? 'them' : 'it'

            toast.error(`${errorMessage} ${plural} most important to log in, please fill ${lastWord}.`, {
                style: {
                    width: '700px',
                    display: 'flex',
                    justifyContent: 'center'
                },
            });
            return;
        }

        try {
            const response = await axios.post('/api/user/login', {
                emailOrMobileNumber,
                password,
            });

            if (response.status === 200) {
                const token = response.data.token;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                toast.success(response.data.message, {
                    style: {
                        width: '500px',
                        display: 'flex',
                        justifyContent: 'center'
                    },
                });
                router.push('/dashboard');
            } else {
                toast.error(response.data.error, {
                    style: {
                        width: '500px',
                        display: 'flex',
                        justifyContent: 'center'
                    },
                });
            }
            console.log(response)


        } catch (error) {
            toast.error(
                "Something went wrong. Please try again.",
                {
                    style: {
                        width: '500px',
                        display: 'flex',
                        justifyContent: 'center'
                    },
                }
            );
        }
    };


    return (
        <div className="login-container">
            <Navbar />
            <hr className='stick top-16' />
            <div className="login-content-container mx-60 my-[20px] p-[20px] gap-[20px] rounded-xl">
                <div className="flex flex-col items-center w-1/3 justify-center gap-12 h-[78vh] bg-gray-50 sticky cursor-pointer border-[1px] border-gray-300 p-10 rounded-md hover:bg-gray-100 hover:text-gray-500 transition ease-in-out duration-300 z-0">
                    <BiUser className='text-[15vh] border-[10px] border-gray-700 text-gray-700 rounded-full' />
                    <p className='font-semibold text-xl text-center'>Our Logo</p>
                </div>
                <div className="login-content bg-white rounded-md w-2/3">
                    <h1 className='font-semibold'>Login</h1>
                    <form onSubmit={handleSubmit} method="POST" className="login-form w-full">
                        <div className="number w-full">
                            <label htmlFor="email">E-mail or Mobile Number</label>
                            <input
                                onChange={(e) => setEmailOrMobileNumber(e.target.value)}
                                type="text"
                                name="mobile-number"
                                placeholder="Enter Your E-mail or Mobile Number"
                                className='w-full'
                            />
                        </div>

                        <div className="password w-full">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter Your Password"
                                className='w-full'
                            />
                            <div className="password-options w-full">
                                <div onClick={handleShowPassword} className='show-password'>
                                    <input checked={showPassword} type="checkbox" />
                                    <p>Show Passwords</p>
                                </div>
                                <Link href="/forgot-password">Forgot Password</Link>
                            </div>
                        </div>

                        <button className="login-btn" type="submit" disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Login'} <MdOutlineLogin />
                        </button>

                    </form>

                    <div className="api-btn w-full">
                        <p>or login with</p>
                        <div className="login-api-btn w-full">
                            <button className="login-api"><FaGoogle /></button>
                            <button className="login-api"><FaFacebook /></button>
                            <button className="login-api"><FaApple /></button>
                            <button className="login-api"><FaTiktok /></button>
                        </div>
                    </div>
                    <p>Do not have an account? <Link href="/signup">Sign Up</Link></p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;