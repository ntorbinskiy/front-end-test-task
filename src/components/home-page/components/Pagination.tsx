import React from 'react';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    darkMode?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  darkMode = false,
}) => {
  const handlePrevious = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = (): number[] => {
    const pageNumbers: number[] = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {

      let start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages, start + 2);

      if (end === totalPages) {
        start = Math.max(1, end - 2);
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <nav className="flex justify-between items-center gap-x-1 mt-6" aria-label="Pagination">
      <button
        type="button"
        className={`min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
          currentPage === 1 ? 'disabled:opacity-50 disabled:pointer-events-none' : ''
        } ${darkMode ? 'dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10' : ''} cursor-pointer`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous"
      >
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span aria-hidden="true" className="hidden sm:block">Previous</span>
      </button>

      <div className="flex items-center gap-x-1">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            type="button"
            className={`cursor-pointer min-h-[38px] min-w-[38px] flex justify-center items-center ${
              page === currentPage
                ? `bg-gray-200 text-gray-800 ${darkMode ? 'dark:bg-neutral-600 dark:text-white' : ''}`
                : `text-gray-800 hover:bg-gray-100 ${darkMode ? 'dark:text-white dark:hover:bg-white/10' : ''}`
            } py-2 px-3 text-sm rounded-lg focus:outline-none ${
              page === currentPage
                ? `focus:bg-gray-300 ${darkMode ? 'dark:focus:bg-neutral-500' : ''}`
                : `focus:bg-gray-100 ${darkMode ? 'dark:focus:bg-white/10' : ''}`
            } disabled:opacity-50 disabled:pointer-events-none`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={`cursor-pointer min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
          currentPage === totalPages ? 'disabled:opacity-50 disabled:pointer-events-none' : ''
        } ${darkMode ? 'dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10' : ''}`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <span aria-hidden="true" className="hidden sm:block">Next</span>
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>
  );
};
