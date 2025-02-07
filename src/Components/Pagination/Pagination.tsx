import './Pagination.css';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Adjust as needed

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const startPage = Math.max(1, currentPage - Math.floor(5 / 2));
  const endPage = Math.min(totalPages, startPage + 5 - 1);

  return (
    <div className='page-number-container'>
      <button
        aria-label="Previous Page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaArrowLeftLong /> Previous
      </button>
      {startPage > 1 && (
        <button onClick={() => onPageChange(1)} aria-label={`Go to Page 1`}>
          1
        </button>
      )}
      {startPage > 2 && <div className='dots'>...</div>}
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`number ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
          aria-label={`Go to Page ${page}`}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages - 1 && <div className='dots'>...</div>}
      {endPage < totalPages && (
        <button onClick={() => onPageChange(totalPages)} aria-label={`Go to Page ${totalPages}`}>
          {totalPages}
        </button>
      )}
      <button
        aria-label="Next Page"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next <FaArrowRightLong />
      </button>
    </div>
  );
};

export default Pagination;