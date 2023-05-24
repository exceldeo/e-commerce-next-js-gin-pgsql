import { useEffect, useState } from 'react';

import 'react-input-range/lib/css/index.css';

import BrandFilter from './BrandsFilter';
import CategoryFilter from './CategoriesFilter';

export default function ProductsFilter({
  handlerFilter,
  setFilter,
  filter,
  filterToggle,
  categories,
  brands,
  className,
}) {
  const [filterCategory, setFilterCategory] = useState(
    filter.category ? filter.category : ''
  );
  const [filterBrand, setFilterBrand] = useState(
    filter.brand ? filter.brand : ''
  );

  useEffect(() => {
    setFilter((prev) => {
      const newFilter = {
        ...prev,
        brand: filterBrand,
      };
      handlerFilter(newFilter);
      return newFilter;
    });
  }, [filterBrand]);

  useEffect(() => {
    setFilter((prev) => {
      const newFilter = {
        ...prev,
        category: filterCategory,
      };
      handlerFilter(newFilter);
      return newFilter;
    });
  }, [filterCategory]);

  return (
    <>
      <div
        className={`filter-widget fixed left-0 top-0 z-10 h-screen w-full overflow-y-scroll bg-white px-[30px] lg:relative lg:h-auto lg:overflow-y-auto ${
          className || ''
        } ${filterToggle ? 'block' : 'hidden lg:block'}`}
      >
        <BrandFilter
          brands={brands}
          filterBrand={filterBrand}
          setFilterBrand={setFilterBrand}
        />

        <CategoryFilter
          categories={categories}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />

        <button
          onClick={handlerFilter}
          type='button'
          className='fixed top-5 right-5 z-50 flex h-10 w-10  items-center justify-center rounded border border-qred text-qred lg:hidden'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
    </>
  );
}
