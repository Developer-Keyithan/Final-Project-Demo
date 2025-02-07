import './AddressCart.css';
import { useEffect, useState } from 'react';
import { TiHome } from "react-icons/ti";
import { MdWork } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import axios from 'axios';

interface AddressData {
  _id: string;
  no?: string | number;
  street?: string;
  town: string;
  division?: string;
  district: string;
  contactNumber: string;
  place: 'Home' | 'Work Place' | 'Undifined';
}

interface AddressCardItemProps {
  data: AddressData;
  isSelected: boolean;
  onClick: () => void;
}

function AddressCardItem({ data, isSelected, onClick }: AddressCardItemProps) {
  let icon: React.ReactNode;
  let name = '';

  if (data.place === 'Home') {
    icon = <TiHome />;
    name = 'Home';
  } else if (data.place === 'Work Place') {
    icon = <MdWork />;
    name = 'Work Place';
  } else {
    icon = <FaLocationDot />;
    name = 'Undefined Delivery Address';
  }

  const formattedAddress = [
    data.no ? data.no.toString() : '',  // Ensure it's converted to string
    data.street,
    data.town,
    data.division,
  ].filter(Boolean).join(', ');

  return (
    <div
      className={`address-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className='address-name'>
        <i>{icon}</i>
        <h3 className='font-semibold'>{name}</h3>
      </div>
      <div className="address-data">
        <p><span className='font-semibold'>Address:</span> {formattedAddress}</p>
        <p><span className='font-semibold'>District:</span> {data.district}</p>
        <p>
          <span className='font-semibold'>Contact No: </span>
          {Array.isArray(data.contactNumber)
            ? data.contactNumber.map(num => `+94 ${num.toString().replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')}`).join(', ')
            : `+94 ${data.contactNumber.toString().replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')}`}
        </p>
      </div>
    </div>
  );
}

function AddressCard({ data, onSelectAddress }: { data: AddressData[], onSelectAddress: (address: AddressData) => void }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const defaultIndex = data.findIndex((item) => item.place === 'Home');
    if (defaultIndex !== -1) {
      setSelectedIndex(defaultIndex);
      onSelectAddress(data[defaultIndex]);  // Send default address on load
    }
  }, []);

  const handleClick = (index: number, item: AddressData) => {
    setSelectedIndex(index);
    onSelectAddress(item); // Send selected address to parent
  };

  return (
    <div className='address-card-container'>
      <h2 className='font-semibold'>Saved Delivery Addresses</h2>
      <div className='address-card'>
        {data.map((item, index) => (
          <AddressCardItem
            key={index}
            data={item}
            isSelected={index === selectedIndex}
            onClick={() => handleClick(index, item)}
          />
        ))}
      </div>
    </div>
  );
}


export default AddressCard;
