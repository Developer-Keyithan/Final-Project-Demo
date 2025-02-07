import { useState } from 'react';
import './style.css';
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';

interface FormState {
    userId: string;
    no: string;
    street: string;
    town: string;
    division: string;
    district: string;
    contactNumbers: string[];
}

interface DeliveryAddressFormProps {
    id: string;
    handleClose: () => void;
}

const DeliveryAddressForm: React.FC<DeliveryAddressFormProps> = ({ handleClose, id }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(true);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [isAddNumberDisabled, setAddNumberDisabled] = useState(false);
    const [isAddContactClicked, setAddContactClicked] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleDistrictSelect = (district: string) => {
        setSelectedDistrict(district);
        setDropdownOpen(false);
    };

    const [formState, setFormState] = useState<FormState>({
        userId: id,
        no: '',
        street: '',
        town: '',
        division: '',
        district: '',
        contactNumbers: [''],
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: keyof FormState, value: string) => {
        setFormState({ ...formState, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const handleContactNumberChange = (index: number, value: string) => {
        // Remove all non-digit characters
        const cleanedValue = value.replace(/\D/g, '');

        // Ensure the input is exactly 9 digits
        if (cleanedValue.length <= 9) {
            // Format the number as "12 345 7896"
            const formattedValue = cleanedValue
                .replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3') // Add spaces after 2 and 5 digits
                .trim(); // Remove any trailing spaces

            const updatedNumbers = [...formState.contactNumbers];
            updatedNumbers[index] = formattedValue;
            setFormState({ ...formState, contactNumbers: updatedNumbers });
        }
    };

    const handleAddNewMobileNumber = () => {
        if (formState.contactNumbers.length < 2) {
            setFormState({ ...formState, contactNumbers: [...formState.contactNumbers, ''] });
            setAddNumberDisabled(true);
            setAddContactClicked(true);
        }
    };

    const handleCancelContactNumber = () => {
        setFormState({
            ...formState,
            contactNumbers: formState.contactNumbers.slice(0, 1),
        });
        setAddNumberDisabled(false);
        setAddContactClicked(false);
    };

    const handleAddressChange = (e: any) => {
        setSelectedAddress(e.target.value);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formState.town) newErrors.town = 'Town is required';
        if (!formState.division) newErrors.division = 'Division is required';
        if (!selectedDistrict) newErrors.district = 'District is required';
        formState.contactNumbers.forEach((number, index) => {
            if (!number || number.replace(/\D/g, '').length !== 9) {
                newErrors[`contactNumbers.${index}`] = 'Contact number must be 9 digits';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const userId = id;
                const place = selectedAddress;
                const no = formState.no;
                const street = formState.street;
                const town = formState.town;
                const division = formState.division;
                const district = selectedDistrict;
                const contactNumber = formState.contactNumbers;

                const response = await axios.post('/api/delivery-address', {
                    userId, no, place, street, town, division, district, contactNumber
                });

                if (response.status === 200) {
                    toast.success(response.data.message, {
                        style: {
                            width: '400px',
                            height: '60px',
                            display: 'flex',
                            justifyContent: 'center'
                        }
                    });
                } else {
                    toast.error(response.data.error, {
                        style: {
                            width: '400px',
                            height: '60px',
                            display: 'flex',
                            justifyContent: 'center'
                        }
                    });
                }
            } catch (error: any) {
                toast.error(error.response?.data?.error || "Something went wrong.", {
                    style: {
                        width: '400px',
                        height: '60px',
                        display: 'flex',
                        justifyContent: 'center'
                    }
                });
            }
        }
    };

    return (
        <div className='relative'>
            <form className='w-full p-5 border-[1px] rounded-lg border-gray-400 bg-white' onSubmit={handleSubmit}>
                <p className='text-xl font-semibold pt-5 pb-10 text-center'>Add New Delivery Address</p>

                <fieldset className='border-[1px] border-black rounded-md p-5 flex flex-col gap-3 transition-all ease-in-out duration-300 overflow-hidden'>
                    <legend className='p-2'>Delivery Address Details</legend>

                    <div className='grid grid-cols-2 gap-3'>
                        <input
                            type="text"
                            placeholder="House/Building Number"
                            value={formState.no}
                            onChange={(e) => handleInputChange('no', e.target.value)}
                            className='border-[1px] border-gray-300 rounded-sm py-1 px-3 focus:outline-green-900'
                        />

                        <input
                            type="text"
                            placeholder="Street"
                            value={formState.street}
                            onChange={(e) => handleInputChange('street', e.target.value)}
                            className='border-[1px] border-gray-300 rounded-sm py-1 px-3 focus:outline-green-900'
                        />

                        <div>
                            <input
                                type="text"
                                placeholder="Town"
                                value={formState.town}
                                onChange={(e) => handleInputChange('town', e.target.value)}
                                className={`border-[1px] ${errors.town ? 'border-red-500' : 'border-gray-300'} rounded-sm py-1 px-3 focus:outline-green-900 w-full`}
                            />
                            {errors.town && <p style={{ color: 'red' }}>{errors.town}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Division"
                                value={formState.division}
                                onChange={(e) => handleInputChange('division', e.target.value)}
                                className={`border-[1px] ${errors.division ? 'border-red-500' : 'border-gray-300'} rounded-sm py-1 px-3 focus:outline-green-900 w-full`}
                            />
                            {errors.division && <p style={{ color: 'red' }}>{errors.division}</p>}
                        </div>
                    </div>

                    <div className='border-[1px] border-green-900 rounded-sm overflow-hidden'>
                        <button
                            type="button"
                            onClick={toggleDropdown}
                            aria-expanded={isDropdownOpen}
                            className='w-full py-1 cursor-pointer bg-green-900 text-white hover:bg-green-800 transition ease-in-out duration-300'
                        >
                            {selectedDistrict || 'Select Your District'}
                        </button>
                        <div
                            className={`grid grid-cols-5 gap-2 transition-all ease-in-out duration-300 px-2 ${isDropdownOpen ? 'max-h-[300px] my-2' : 'max-h-0 overflow-hidden'}`}
                            role="listbox"
                        >
                            {['Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'].map(
                                (district) => (
                                    <p
                                        key={district}
                                        onClick={() => handleDistrictSelect(district)}
                                        className='cursor-pointer text-center border-[1px] border-gray-300 py-1 rounded-sm hover:bg-green-800 hover:text-white transition ease-in-out duration-300 hover:border-green-800'
                                        role="option"
                                        aria-selected={selectedDistrict === district ? 'true' : 'false'}
                                    >
                                        {district}
                                    </p>
                                )
                            )}
                        </div>
                    </div>
                    <div>
                        <p>This Address is</p>
                        <div className='flex justify-between mt-2'>
                            <label
                                className='flex items-center gap-2 cursor-pointer accent-green-800'
                                htmlFor="home-address"
                            >
                                <input
                                    type="radio"
                                    name='delivery-place'
                                    id='home-address'
                                    value="Home"
                                    className='cursor-pointer'
                                    onChange={handleAddressChange}
                                />
                                Home Address
                            </label>

                            <label
                                className='flex items-center gap-2 cursor-pointer accent-green-800'
                                htmlFor="work-place-address"
                            >
                                <input
                                    type="radio"
                                    name='delivery-place'
                                    id='work-place-address'
                                    value="Work Place"
                                    className='cursor-pointer'
                                    onChange={handleAddressChange}
                                />
                                Work Place Address
                            </label>

                            <label
                                className='flex items-center gap-2 cursor-pointer accent-green-800'
                                htmlFor="other-address"
                            >
                                <input
                                    type="radio"
                                    name='delivery-place'
                                    id='other-address'
                                    value='Undifined'
                                    className='cursor-pointer'
                                    onChange={handleAddressChange}
                                />
                                Other Address
                            </label>
                        </div>
                    </div>
                </fieldset>

                <fieldset
                    className='border-[1px] border-black rounded-md p-5 grid gap-3 transition ease-in-out duration-1000 mt-5'
                    style={{
                        gridTemplateColumns: isAddContactClicked ? '1fr 1fr 0.5fr' : '1fr 1fr',
                    }}
                >
                    <legend className='p-2'>Contact Number or Numbers</legend>
                    {formState.contactNumbers.map((number, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Contact Number"
                                value={number}
                                onChange={(e) => handleContactNumberChange(index, e.target.value)}
                                maxLength={11} // 9 digits + 2 spaces
                                className={`border-[1px] ${errors[`contactNumbers.${index}`] ? 'border-red-500' : 'border-gray-300'} rounded-sm py-1 px-3 focus:outline-green-900 w-full h-9`}
                            />
                            {errors[`contactNumbers.${index}`] && (
                                <p style={{ color: 'red' }}>{errors[`contactNumbers.${index}`]}</p>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddNewMobileNumber}
                        disabled={isAddNumberDisabled}
                        style={{ display: isAddNumberDisabled ? 'none' : 'inline-block' }}
                        className='w-full rounded-sm py-1 cursor-pointer bg-green-900 text-white hover:bg-green-800 transition ease-in-out duration-300 h-9'
                    >
                        Add a Contact Number
                    </button>

                    {isAddContactClicked && (
                        <button
                            type="button"
                            onClick={handleCancelContactNumber}
                            className='flex items-center justify-center gap-2  w-full rounded-sm py-1 cursor-pointer bg-red-800 text-white hover:bg-red-700 transition ease-in-out duration-300 h-9'
                        >
                            Cancel <IoClose />
                        </button>
                    )}
                </fieldset>

                <button
                    className='w-full rounded-sm py-2 cursor-pointer bg-green-900 text-white hover:bg-green-800 transition ease-in-out duration-300 mt-5'
                    type="submit"
                >
                    Save Address
                </button>
            </form>
            <button className="absolute top-[8px] right-[8px] text-xl hover:bg-red-800 hover:text-white rounded-full transition ease-in-out duration-300 p-[1px]" onClick={handleClose}>
                <IoClose />
            </button>
        </div>
    );
};

export default DeliveryAddressForm;