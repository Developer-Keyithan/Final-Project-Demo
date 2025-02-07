'use client'

import './style.css'
import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdImage } from 'react-icons/md';
import { BiUser } from 'react-icons/bi';

import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const sellerForm = () => {
    const router = useRouter();

    const [logo, setLogo] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
    const [isIntivitual, setIsIntivitual] = useState(true);
    const [businessRegNum, setBusinessRegNum] = useState('');

    const [businessAddressNo, setBusinessAddressNo] = useState('');
    const [businessAddressStreet, setBusinessAddressStreet] = useState('');
    const [businessAddressTown, setBusinessAddressTown] = useState('');
    const [businessAddressPostalCode, setBusinessAddressPostalCode] = useState('');

    const [pickUpAddressNo, setPickUpAddressNo] = useState('');
    const [pickUpAddressStreet, setPickUpAddressStreet] = useState('');
    const [pickUpAddressTown, setPickUpAddressTown] = useState('');
    const [pickUpAddressPostalCode, setPickUpAddressPostalCode] = useState('');

    const [isSriLankan, setIsSriLankan] = useState(true);
    const [country, setCountry] = useState('Sri Lanka');

    const [bankName, setBankName] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [bankAccountHolderName, setBankAccountHolderName] = useState('');

    const [nicFront, setNICFront] = useState('');
    const [nicBack, setNICBack] = useState('');
    const [passportFront, setPassportFront] = useState('');
    const [passportBack, setPassportBack] = useState('');
    const [businessRegCerFront, setBusinessRegCerFront] = useState('');
    const [businessRegCerBack, setBusinessRegCerBack] = useState('');

    const [isPlatformDelivery, setIsPlatformDelivery] = useState(true);

    const [isAgree, setIsAgree] = useState(true);

    const handleBusinessType = (i: ChangeEvent<HTMLInputElement>): void => {
        setIsIntivitual(i.target.value === 'intivitual')
    }

    const handleCitizenshipChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setIsSriLankan(e.target.value === 'sriLankan');
    };

    const handleIsPlatformDelivery = (j: ChangeEvent<HTMLInputElement>): void => {
        setIsPlatformDelivery(j.target.value === 'platform-delivery');
    };

    const handleIsAgree = (h: ChangeEvent<HTMLInputElement>): void => {
        setIsAgree(h.target.checked);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/seller', {

            });

            if (response.status === 200) {
                toast.success(response.data.message, {
                    style: {
                        width: '500px',
                        display: 'flex',
                        justifyContent: 'center'
                    },
                });
                router.push('/products');
            } else {
                toast.error(response.data.error, {
                    style: {
                        width: '500px',
                        display: 'flex',
                        justifyContent: 'center'
                    },
                });
            }

        } catch (error: any) {
            toast.error(
                error.response?.data?.error || "Something went wrong. Please try again.",
                {
                    style: {
                        width: '500px',
                        display: 'flex',
                        justifyContent: 'center'
                    },
                }
            );
        }
    }

    return (
        <div className='form-bg '>
            <div className='backdrop-blur-3xl'>
                <Navbar />
                <hr className='sticky top-16' />
                <div className='mx-60 my-10 bg-green-800 rounded-[10px] h-[84vh]'>
                    <div className='flex flex-row gap-5 w-full h-full justify-between p-5 max-w-screen-md:p-40'>
                        <div className="flex flex-col items-center w-1/3 justify-center gap-12 h-full bg-gray-50 sticky top-28 cursor-pointer border-[1px] border-gray-300 p-10 rounded-md hover:bg-gray-100 hover:text-gray-500 transition ease-in-out duration-300 z-0">
                            <BiUser className='text-[15vh] border-[10px] border-gray-700 text-gray-700 rounded-full' />
                            <p className='font-semibold text-xl text-center'>Upload your business logo</p>
                        </div>

                        <div className="right-section flex items-center content-between bg-white rounded-[5px] relative w-full overflow-auto">
                            <form onSubmit={handleSubmit} method="POST" className=' w-full absolute top-0 left-0 px-10 py-16'>
                                <h1 className='text-[36px] font-semibold text-center mb-5'>Create Business Account</h1>

                                <fieldset className='p-5 rounded-md border-[1px] border-gray-300'>
                                    <legend className='p-2 font-semibold text-lg'>Business Details</legend>
                                    <div className='flex flex-col'>
                                        <input type="text" onChange={(e) => setBusinessName(e.target.value)}
                                            placeholder='Business Name'
                                            className='border-[2px] border-gray-100 bg-gray-100 py-[5px] px-3 rounded-sm focus:border-green-600 outline-none transition ease-in-out duration-300 placeholder:text-gray-600'
                                        />
                                    </div>

                                    <div className='mt-5 flex flex-col'>
                                        <input type="text" onChange={(e) => setBusinessEmail(e.target.value)}
                                            placeholder='Business E-mail'
                                            className='border-[2px] border-gray-100 bg-gray-100 py-[5px] px-3 rounded-sm focus:border-green-600 outline-none transition ease-in-out duration-300 placeholder:text-gray-600'
                                        />
                                    </div>

                                    <div className='mt-5 flex flex-col'>
                                        <input type="text" onChange={(e) => setBusinessPhoneNumber(e.target.value)}
                                            placeholder='Business Phone Number'
                                            className='border-[2px] border-gray-100 bg-gray-100 py-[5px] px-3 rounded-sm focus:border-green-600 outline-none transition ease-in-out duration-300 placeholder:text-gray-600'
                                        />
                                    </div>

                                    <div className='mt-5'>
                                        <label>Your Business Type</label>
                                        <div className='flex gap-5 mt-1'>
                                            <label htmlFor="intivitual" className='flex gap-2 cursor-pointer'>
                                                <input
                                                    type="radio"
                                                    name='business-type'
                                                    id='intivitual'
                                                    value='intivitual'
                                                    checked={isIntivitual}
                                                    onChange={handleBusinessType}
                                                    className='accent-green-800 cursor-pointer'
                                                />
                                                Intivitual
                                            </label>

                                            <label htmlFor='becomeBusiness' className='flex gap-2 cursor-pointer'>
                                                <input
                                                    type="radio"
                                                    name='business-type'
                                                    id='becomeBusiness'
                                                    value='become-business'
                                                    checked={!isIntivitual}
                                                    onChange={handleBusinessType}
                                                    className='accent-green-800 cursor-pointer'
                                                />
                                                Become Industry
                                            </label>
                                        </div>
                                    </div>

                                    <div className='mt-5 flex flex-col'>
                                        <input type="text" onChange={(e) => setBusinessRegNum(e.target.value)}
                                            placeholder='Business Registration Number'
                                            className='border-[2px] border-gray-100 bg-gray-100 py-[5px] px-3 rounded-sm focus:border-green-600 outline-none transition ease-in-out duration-300 placeholder:text-gray-600'
                                        />
                                    </div>
                                </fieldset>

                                <fieldset className='p-5 rounded-md border-[1px] border-gray-300 mt-5'>
                                    <legend className='p-2 font-semibold text-lg'>Addresses</legend>
                                    <div>
                                        <p>Business Address</p>
                                        <div className='flex flex-row justify-between mt-1 gap-[2px]'>
                                            <input type="text" onChange={(e) => setBusinessAddressNo(e.target.value)} placeholder='No'
                                                className='w-3/12 border-[2px] border-gray-100 bg-gray-100 px-2 py-1 rounded-l-sm outline-none focus:border-green-600 transition ease-in-out duration-300 placeholder:text-gray-600'
                                            />
                                            <input type="text" onChange={(e) => setBusinessAddressStreet(e.target.value)} placeholder='Street'
                                                className='w-6/12 border-[2px] border-gray-100 bg-gray-100 px-2 py-1 outline-none focus:border-green-600 transition ease-in-out duration-300 placeholder:text-gray-600'
                                            />
                                            <input type="text" onChange={(e) => setBusinessAddressTown(e.target.value)} placeholder='Town'
                                                className='w-6/12 border-[2px] border-gray-100 bg-gray-100 px-2 py-1 outline-none focus:border-green-600 transition ease-in-out duration-300 placeholder:text-gray-600'
                                            />
                                            <input type="text" onChange={(e) => setBusinessAddressPostalCode(e.target.value)} placeholder='Postal Code'
                                                className='w-6/12 border-[2px] border-gray-100 bg-gray-100 px-2 py-1 rounded-r-sm outline-none focus:border-green-600 transition ease-in-out duration-300 placeholder:text-gray-600'
                                            />
                                        </div>
                                    </div>

                                    <div className='mt-6'>
                                        <p>Pickup Address</p>
                                        <div className='flex flex-row justify-between mt-1 gap-[2px]'>
                                            <input type="text" onChange={(e) => setPickUpAddressNo(e.target.value)} placeholder='No'
                                                className='w-3/12 border-[2px] border-gray-100 bg-gray-100 px-2 py-1 rounded-l-sm outline-none focus:border-green-600 transition ease-in-out duration-300 placeholder:text-gray-600'
                                            />
                                            <input type="text" onChange={(e) => setPickUpAddressStreet(e.target.value)} placeholder='Street'
                                                className='w-6/12 border-[2px] border-gray-100 bg-gray-100 px-2 py-1 outline-none focus:border-green-600 transition ease-in-out duration-300 placeholder:text-gray-600'
                                            />
                                            <input type="text" onChange={(e) => setPickUpAddressTown(e.target.value)} placeholder='Town'
                                                className='w-6/12 border-[2px] border-gray-100 bg-gray-100 px-2 py-1 outline-none focus:border-green-600 transition ease-in-out duration-300 placeholder:text-gray-600'
                                            />
                                            <input type="text" onChange={(e) => setPickUpAddressPostalCode(e.target.value)} placeholder='Postal Code'
                                                className='w-6/12 border-[2px] border-gray-100 bg-gray-100 px-2 py-1 rounded-r-sm outline-none focus:border-green-600 transition ease-in-out duration-300 placeholder:text-gray-600'
                                            />
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className='p-5 rounded-md border-[1px] border-gray-300 mt-5'>
                                    <legend className='p-2 font-semibold text-lg'>Citizenship</legend>
                                    <div>
                                        <label>You are</label>
                                        <div className="flex gap-5 mt-1">
                                            <label htmlFor="citizenshipSriLankan" className="flex gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="citizen"
                                                    id="citizenshipSriLankan"
                                                    value="sriLankan"
                                                    checked={isSriLankan}
                                                    onChange={handleCitizenshipChange}
                                                    className='accent-green-800 cursor-pointer'
                                                />
                                                Sri Lankan
                                            </label>

                                            <label htmlFor="citizenshipForeigner" className="flex gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="citizen"
                                                    id="citizenshipForeigner"
                                                    value="foreigner"
                                                    checked={!isSriLankan}
                                                    onChange={handleCitizenshipChange}
                                                    className='accent-green-800 cursor-pointer'
                                                />
                                                Foreigner
                                            </label>
                                        </div>
                                    </div>

                                    <div className='mt-5 flex flex-col'>
                                        <label>If you are foreigner what is your country?</label>
                                        <input type="text" onChange={(e) => setCountry(e.target.value)}
                                            placeholder='Country'
                                            className='border-[2px] border-gray-100 bg-gray-100 py-[5px] px-3 rounded-sm focus:border-green-600 outline-none transition ease-in-out duration-300 placeholder:text-gray-600 mt-2'
                                        />
                                    </div>
                                </fieldset>

                                <fieldset className='p-5 rounded-md border-[1px] border-gray-300 mt-5'>
                                    <legend className='p-2 font-semibold text-lg'>Bank account details</legend>
                                    <div className='flex flex-col'>
                                        <input type="text" onChange={(e) => setBankName(e.target.value)}
                                            placeholder='Bank Name'
                                            className='border-[2px] border-gray-100 bg-gray-100 py-[5px] px-3 rounded-sm focus:border-green-600 outline-none transition ease-in-out duration-300 placeholder:text-gray-600 mt-2'
                                        />
                                    </div>

                                    <div className='mt-5 flex flex-col'>
                                        <input type="text" onChange={(e) => setBankAccountNumber(e.target.value)}
                                            placeholder='Account Number'
                                            className='border-[2px] border-gray-100 bg-gray-100 py-[5px] px-3 rounded-sm focus:border-green-600 outline-none transition ease-in-out duration-300 placeholder:text-gray-600 mt-2'
                                        />
                                    </div>

                                    <div className='mt-5 flex flex-col'>
                                        <input type="text" onChange={(e) => setBankAccountHolderName(e.target.value)}
                                            placeholder='Account Holder Name'
                                            className='border-[2px] border-gray-100 bg-gray-100 py-[5px] px-3 rounded-sm focus:border-green-600 outline-none transition ease-in-out duration-300 placeholder:text-gray-600 mt-2'
                                        />
                                    </div>
                                </fieldset>

                                <fieldset className='p-5 rounded-md border-[1px] border-gray-300 mt-5'>
                                    <legend className='p-2 font-semibold text-lg'>Document Images</legend>
                                    <div>
                                        <p>National Identity Card (NIC)</p>
                                        <div className='flex flex-row w-full justify-between gap-2 mt-1'>
                                            <div className='w-1/2 flex flex-col items-center rounded-md py-12 bg-gray-100 cursor-pointer text-green-950 hover:bg-green-400 hover:text-green-50 transition ease-in-out duration-500'><MdImage className='text-5xl' /><p>Front Image</p></div>
                                            <div className='w-1/2 flex flex-col items-center rounded-md py-12 bg-gray-100 cursor-pointer text-green-950 hover:bg-green-400 hover:text-green-50 transition ease-in-out duration-500'><MdImage className='text-5xl' />Back Image</div>
                                        </div>
                                    </div>

                                    <div className='mt-5'>
                                        <p>Passport</p>
                                        <div className='flex flex-row w-full justify-between gap-2 mt-1'>
                                            <div className='w-1/2 flex flex-col items-center rounded-md py-12 bg-gray-100 cursor-pointer text-green-950 hover:bg-green-400 hover:text-green-50 transition ease-in-out duration-500'><MdImage className='text-5xl' /><p>Front Image</p></div>
                                            <div className='w-1/2 flex flex-col items-center rounded-md py-12 bg-gray-100 cursor-pointer text-green-950 hover:bg-green-400 hover:text-green-50 transition ease-in-out duration-500'><MdImage className='text-5xl' />Back Image</div>
                                        </div>
                                    </div>

                                    <div className='mt-5'>
                                        <p>Bussiness Registration Certificate</p>
                                        <div className='flex flex-row w-full justify-between gap-2 mt-1'>
                                            <div className='w-1/2 flex flex-col items-center rounded-md py-12 bg-gray-100 cursor-pointer text-green-950 hover:bg-green-400 hover:text-green-50 transition ease-in-out duration-500'><MdImage className='text-5xl' /><p>Front Image</p></div>
                                            <div className='w-1/2 flex flex-col items-center rounded-md py-12 bg-gray-100 cursor-pointer text-green-950 hover:bg-green-400 hover:text-green-50 transition ease-in-out duration-500'><MdImage className='text-5xl' />Back Image</div>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className='p-5 rounded-md border-[1px] border-gray-300 mt-5'>
                                    <legend className='p-2 font-semibold text-lg'>Delivery Reference</legend>
                                    <div>
                                        <p>You Refered Delivery Method</p>
                                        <div className='flex gap-5 mt-2'>
                                            <label htmlFor="platformDelivery" className='flex gap-2 cursor-pointer'>
                                                <input
                                                    type="radio"
                                                    name='delivery'
                                                    id='platformDelivery'
                                                    value='platform-delivery'
                                                    checked={isPlatformDelivery}
                                                    onChange={handleIsPlatformDelivery}
                                                    className='accent-green-800 cursor-pointer'
                                                />
                                                Platform Delivery
                                            </label>

                                            <label htmlFor="selfDelivery" className='flex gap-2 cursor-pointer'>
                                                <input
                                                    type="radio"
                                                    name='delivery'
                                                    id='selfDelivery'
                                                    value='self-delivery'
                                                    checked={!isPlatformDelivery}
                                                    onChange={handleIsPlatformDelivery}
                                                    className='accent-green-800 cursor-pointer'
                                                />
                                                Self Delivery
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className='mt-5'>
                                    <label htmlFor="terms-and-conditions"
                                        className='flex gap-3 text-xl items-center cursor-pointer'
                                    >
                                        <input
                                            type="checkbox"
                                            id="terms-and-conditions"
                                            className='h-4 w-4 accent-green-800 cursor-pointer'
                                            checked={isAgree}
                                            onChange={handleIsAgree}
                                        />
                                        <p>
                                            <a href="/terms" className='underline'>Terms</a> and <a href="/conditions" className='underline'>Conditions</a> Agreement
                                        </p>
                                    </label>
                                    <label htmlFor="terms-and-conditions">
                                        <p className='cursor-pointer mt-3'>
                                            I hereby confirm that I have read, understood, and agree to abide by the platform's terms and conditions, privacy policy, and guidelines for selling. I acknowledge that any violation of these terms may result in the suspension or termination of my seller account.
                                        </p>
                                    </label>
                                </div>

                                <button type='submit'
                                    className='bg-green-900 text-white w-full h-10 rounded-sm mt-3 cursor-pointer hover:bg-green-700 transition ease-in-out duration-300'
                                >Create Account</button>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default sellerForm
