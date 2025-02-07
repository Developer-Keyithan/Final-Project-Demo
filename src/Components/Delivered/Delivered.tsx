'use client';

import { useState } from 'react';
import Image from 'next/image';
import './style.css';
import RatingCart from '../Rating Cart/RatingCart';
import OrderData from '../../Data/OrderData';
import ProductData from '../../Data/ProductData';
import CardData from '../../Data/CardData';
import Toggle from '../Toggle/Toggle';

import { FaRegHeart } from "react-icons/fa";
import { IoStar } from "react-icons/io5";

interface Card {
  cardId: string;
  bank: string;
  cardNumber: string;
}

type Product = {
  id: string;
  name: string;
  newPrice: string;
  image: string;
};

type Order = {
  id: string;
  deliveredDate: string;
  status: string;
  products: {
    productId: string;
    productQuantity: number;
    quantityUnit: 'kilo gram' | 'gram';
  }[];
  // usedCard: any[];
  usedPaymentMethod: string;
};


const DeliveredOrder: React.FC<{ data: Order }> = ({ data }) => {
  const { id, products, deliveredDate, status, usedPaymentMethod, } = data;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');

  let totalPrice = 0;
  products.forEach((product) => {
    const productData = ProductData.find((p) => p.id === product.productId);

    if (productData) {
      let subTotal = 0;
      if (product.quantityUnit === 'kilo gram') {
        subTotal = parseFloat(productData.newPrice) * product.productQuantity;
      } else if (product.quantityUnit === 'gram') {
        subTotal = (parseFloat(productData.newPrice) / 1000) * product.productQuantity;
      }
      totalPrice += subTotal;
    }
  });


  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleMouseEnter = (value: number) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Rating:', rating);
    console.log('Review:', review);
  };

  return (
    <div className="border-[1px] mt-5 py-5 px-7 rounded-md">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-semibold text-xl">Order Id: {id}</h1>
          <p className="text-gray-600">
            <strong>Date: </strong>
            {deliveredDate}
          </p>
        </div>
        <h2 className="delivered-status text-lg font-semibold">{status}</h2>
      </div>
      <div>
        {products.map((product, index) => {
          const productData = ProductData.find((p) => p.id === product.productId);

          if (!productData) {
            return <p key={index}>Product not found</p>;
          }

          let subTotal = 0;
          if (product.quantityUnit === 'kilo gram') {
            subTotal = parseFloat(productData.newPrice) * product.productQuantity;
          } else if (product.quantityUnit === 'gram') {
            subTotal = (parseFloat(productData.newPrice) / 1000) * product.productQuantity;
          }

          return (
            <div key={index} className="relative">
              <div className="flex gap-5 mt-5">
                <div className="w-1/6 h-[25vh] overflow-hidden rounded-md">
                  <Image
                    src={productData.image}
                    alt="Product"
                    className="object-cover h-full w-full"
                    width={150}
                    height={150}
                  />
                </div>
                <div className="w-5/6 flex flex-col">
                  <h2 className="text-3xl font-semibold">{productData.name}</h2>
                  <p>{productData.description}</p>
                  <div className="flex justify-between mt-3">
                    <p>
                      <strong>Quantity: </strong>
                      {product.productQuantity} {product.quantityUnit}
                    </p>
                    <p>
                      <strong>Price per kg: </strong>
                      {productData.newPrice} LKR
                    </p>
                    <p>
                      <strong>Sub Total: </strong>
                      {subTotal.toFixed(2)} LKR
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="mt-3">
                    <textarea
                      placeholder="Write your review here..."
                      value={review}
                      onChange={handleInputChange}
                      className="delivered-textarea border-[1px] rounded-sm focus:border-green-400 focus:border-[2px] outline-none px-3 py-2 w-full"
                    />
                    <div className="flex items-end justify-between">
                      <div className="stars flex">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <IoStar
                            key={value}
                            className={`star ${hoverRating >= value || rating >= value ? 'filled' : ''}`}
                            onClick={() => handleStarClick(value)}
                            onMouseEnter={() => handleMouseEnter(value)}
                            onMouseLeave={handleMouseLeave}
                          />
                        ))}
                      </div>
                      <button
                        className="delivered-submit-button text-white px-8 py-[6px] rounded-sm"
                        type="submit"
                      >
                        Save Review & Rating
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="h-[2px] bg-gray-400 mx-10 mt-5"></div>
            </div>
          );
        })}
      </div>
      <div className='mt-3 flex justify-between'>
        <p>
          <strong>Payment Method: </strong>
          {usedPaymentMethod}
        </p>
        {/* {Array.isArray(usedCard) && usedCard.length > 0 && usedCard.map((card, index) => {
          const cardData = CardData.find((c) => c.id === card.cardId);

          if (!cardData) {
            return <p key={index}></p>;
          }

          return (
            <div key={index} className="relative">
              <p>
                <strong>Bank name: </strong>
                {cardData.bank}
              </p>
              <p>
                <strong>Card number: </strong>
                {cardData.cardName}
              </p>
            </div>
          );
        })} */}

        <p className='text-xl'>
          <strong>Total Price: </strong>
          {totalPrice.toFixed(2)} LKR
        </p>
      </div>

    </div>
  );
};

const Delivered: React.FC = () => {
  return (
    <div className="mb-5">
      {OrderData.filter((order) => order.status === 'Delivered').map((order, index) => (
        <DeliveredOrder key={order.id} data={order} />
      ))}
    </div>
  );
};

export default Delivered;
