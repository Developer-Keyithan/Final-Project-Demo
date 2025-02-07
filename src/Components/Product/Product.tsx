'use client';  // Add this at the top of your component to make it a client component

import { useState } from 'react';
import { StaticImageData } from "next/image";
import './Product.css';
import Cart from '../Cart/Cart';
import { RiArrowDropDownLine } from "react-icons/ri";
import { LuFilter } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

interface product {
  id: string;
  image: string | StaticImageData;
  name: string;
  productName: string;
  price: {
    newPrice: string;
    oldPrice: string;
  };
  productImages: { imageUrl: string | StaticImageData }[];
  rating: number;
  deliveryType: string;
}

interface FilterProps {
  data: product[];
}

const Products: React.FC<FilterProps> = ({ data }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterClick = (filter: string) => {
    setActiveFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter(item => item !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };

  return (
    <div className='product-container'>
      <div className='product-catogary'>
        <div className='search'>
          <label htmlFor="search-bar">Search Your Likes</label>
          <form action="">
            <input type="search" id="search-bar" placeholder='Enter Your Search Here...' />
            <button type='submit'>Search</button>
          </form>
        </div>
        <div className='filters'>
          <label htmlFor="filters">Some Filters For You</label>
          <div className='product-btn'>
            <button type='button' /*onClick={() => handleFilterClick('District')}*/>District <i><RiArrowDropDownLine /></i></button>
            <button type='button' onClick={() => handleFilterClick('Vegetables')}>Vegetables</button>
            <button type='button' onClick={() => handleFilterClick('Fruits')}>Fruits</button>
            <button type='button' onClick={() => handleFilterClick('Grains')}>Grains</button>
            <button type='button' onClick={() => handleFilterClick('Fresh')}>Fresh</button>
            <button type='button' onClick={() => handleFilterClick('Spices')}>Spices</button>
            <button type='button' onClick={() => handleFilterClick('Organic')}>Organic</button>
            <button type='button' onClick={() => handleFilterClick('Free Delivery')}>Free Delivery</button>
            <button type='button' onClick={() => handleFilterClick('In-Stock')}>In-Stock</button>
          </div>
        </div>
        <div className='price-range'>
          <label htmlFor="points">Choose Price Range</label>
          <div>
            <h3>Rs. 50</h3>
            <h3>Rs. 1800</h3>
          </div>
          <input type="range" className='range' />
        </div>
      </div>

      <div className='active-filters'>
        <button className='filter'><LuFilter /> Active Filters <i><RiArrowDropDownLine /></i></button>
        <div className='active-product-btn'>
          {activeFilters.map((filter, index) => (
            <button key={index} onClick={() => handleFilterClick(filter)}>
              {filter} <i><RxCross2 /></i>
            </button>
          ))}
        </div>
      </div>

      <div className='carts'>
        {data.map((item, index) => (
          <Cart key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
