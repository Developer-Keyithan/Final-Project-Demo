import './Coupon.css';
import sampleData from '../../Data/CouponData';
import { useEffect, useState } from 'react';

interface Coupon {
  name: string;
  description: string;
  discountAmount?: number;
  discountPercentage?: number;
}

interface CouponCardItemProps {
  data: Coupon;
  isSelected: boolean;
  onClick: () => void;
}

function CouponCardItem({ data, isSelected, onClick }: CouponCardItemProps) {
    return (
        <div className={`coupon-item select ${isSelected ? 'selected' : ''}`} onClick={onClick}>
            <h3 className='coupon-name font-semibold'>{data.name}</h3>
            <p className="coupon-decription">{data.description}</p>
        </div>
    );
}

function Coupon() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        const defaultIndex = sampleData.findIndex((item) => item.name === 'fresh100');
        if (defaultIndex !== -1) {
            setSelectedIndex(defaultIndex);
        }
    }, []);

    const handleClick = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <div className='coupon-card-container'>
            <h2 className='font-semibold'>Saved Coupons</h2>
            <div className='coupon-card'>
                {sampleData.map((item, index) => (
                    <CouponCardItem
                        key={index}
                        data={item}
                        isSelected={index === selectedIndex}
                        onClick={() => handleClick(index)} 
                    />
                ))}
            </div>
        </div>
    );
}

export default Coupon;
