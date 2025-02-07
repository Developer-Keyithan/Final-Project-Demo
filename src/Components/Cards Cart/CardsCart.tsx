import './CardsCart.css';
// import sampleData from '../../Data/CardData';
import visa from '../../Assets/visa-card.png';
import master from '../../Assets/master-card.png';

import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';

interface BankCard {
  bankName: string;
  cardNumber: number;
  expireDate: {
    month: number;
    year: number
  };
  savedDate: string;
  cardType: 'Master Card' | 'Visa Card';
  default: boolean;
}

interface CardsCardItemProps {
  data: BankCard;
  isSelected: boolean;
  onClick: () => void;
}

function CardsCardItem({ data, isSelected, onClick }: CardsCardItemProps) {
  let card: StaticImageData | string = '';
  let alt = '';

  if (data.cardType === 'Visa Card') {
    card = visa;
    alt = 'Visa Card';
  } else {
    card = master;
    alt = 'Master Card';
  }

  const maskCardNumber = (cardNumber: number) => {
    const cardNumStr = cardNumber.toString().replace(/\D/g, '');
    if (cardNumStr.length === 16) {
      return `${cardNumStr.slice(0, 4)} ${cardNumStr.slice(4, 8).replace(/\d/g, 'X')} ${cardNumStr.slice(8, 12).replace(/\d/g, 'X')} ${cardNumStr.slice(12)}`;
    }
    return cardNumber;
  };

  const maskedCardNumber = maskCardNumber(data.cardNumber);

  return (
    <div className={`cards-item select ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      <div className='cards-content'>
        <h3 className='card-name font-semibold'>{data.bankName}</h3>
        <div className="card-data">
          <p><span className='font-semibold'>Card Number:</span> {maskedCardNumber}</p>
          <p><span className='font-semibold'>Expire Date:</span> {data.expireDate.month}/{data.expireDate.year}</p>
        </div>
      </div>

      <div className='cards-type'>
        <Image width={100} height={100} src={card} alt={alt} />
      </div>
    </div>
  );
}

function CardsCard({ data, onSelectCard }: { data: BankCard[], onSelectCard: (card: BankCard) => void }) {
  console.log(data)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const defaultIndex = data.findIndex((item) => item.default === true);
    if (defaultIndex !== -1) {
      setSelectedIndex(defaultIndex);
      onSelectCard(data[defaultIndex]);
    }
  }, []);

  const handleClick = (index: number, item: BankCard) => {
    setSelectedIndex(index);
    onSelectCard(item)
  };

  return (
    <div className='card-card-container'>
      <h2 className='font-semibold'>Saved Cards Details</h2>
      <div className='card-card'>
        {data.map((item, index) => (
          <CardsCardItem
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

export default CardsCard;
