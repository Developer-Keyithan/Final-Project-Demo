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
  status: string;
  products: {
    productId: string;
    productQuantity: number;
    quantityUnit: 'kilo gram' | 'gram';
  }[];
  // usedCard: any[];
  usedPaymentMethod: string;
};


const CancelledOrder: React.FC<{ data: Order }> = ({ data }) => {
  const { id, products, status, usedPaymentMethod } = data;


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

  return (
    <div className="border-[1px] mt-5 py-5 px-7 rounded-md">
      <div className="flex justify-between items-start">
        <h1 className="font-semibold text-xl">Order Id: {id}</h1>
        <h2 className="Cancelled-status text-red-700 text-lg font-semibold">{status}</h2>
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
                <div className="w-1/12 h-[12vh] overflow-hidden rounded-md">
                  <Image
                    src={productData.image}
                    alt="Product"
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="w-11/12 flex flex-col">
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
      <div className='text-end w-full mt-5'>
        <button className='place-again-btn px-10 py-2 text-white rounded-sm transition ease-in-out duration-300' type='button'>Place this order again</button>
      </div>
    </div>
  );
};

const Cancelled: React.FC = () => {
  return (
    <div className="mb-5">
      {OrderData.filter((order) => order.status === 'Cancelled').map((order, index) => (
        <CancelledOrder key={order.id} data={order} />
      ))}
    </div>
  );
};

export default Cancelled;
