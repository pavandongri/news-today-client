import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const delta = 1;
    let left = Math.max(1, currentPage - delta);

    let right = Math.min(totalPages, currentPage + delta + 1);

    if (currentPage <= delta + 1) {
      right = 1 + 2 * delta + (currentPage == 2);
    } else if (currentPage >= totalPages - delta) {
      left = totalPages - 2 * delta;
    }

    let range = [];
    let rangeWithDots = [];
    let l
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      <button id="btn-prev" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        {'<'}
      </button>
      {pageNumbers.map((pageNum, index) => (
        <button
          key={index}
          onClick={() => onPageChange(pageNum)}
          className={`page-number ${pageNum === currentPage ? 'current-page' : ''}`}
          id={pageNum === currentPage ? 'activeNum' : ''}
        >
          {pageNum}
        </button>
      ))}
      <button id='btn-next' disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;