import React from 'react';

export default function Pagination({
  paginateBackIsDisabled,
  paginateNextIsDisabled,
  paginateFront,
  paginateBack,
}) {
  return (
    <div className='py-2'>
      <div>
        <nav
          className='relative z-0 inline-flex -space-x-px rounded-md shadow-sm'
          aria-label='Pagination'
        >
          {paginateBackIsDisabled ? (
            <a
              href='#'
              className='relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50'
            >
              <span>Previous</span>
            </a>
          ) : (
            <a
              onClick={paginateBack}
              href='#'
              className='relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50'
            >
              <span>Previous</span>
            </a>
          )}
          {paginateNextIsDisabled ? (
            <a
              href='#'
              className='relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50'
            >
              <span>Next</span>
            </a>
          ) : (
            <a
              onClick={paginateFront}
              href='#'
              className='relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50'
            >
              <span>Next</span>
            </a>
          )}
        </nav>
      </div>
    </div>
  );
}
