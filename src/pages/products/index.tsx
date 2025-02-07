import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';

import Product from '../../Components/Product/Product';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Pagination from '../../Components/Pagination/Pagination';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 42;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/product'); // Replace with your real API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <Navbar />
      <hr className='sticky top-16' />
      <div className='mx-4 md:mx-60'>
        <div className="productPage-product-container">
          <Product data={currentProducts} />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(products.length / productsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;