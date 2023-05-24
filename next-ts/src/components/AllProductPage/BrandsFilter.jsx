import React from 'react';

import Checkbox from '../Helpers/Checkbox';
import ServeLangItem from '../Helpers/ServeLangItem';
export default function BrandFilter({ brands, filterBrand, setFilterBrand }) {
  const [showAllBrands, setShowAllBrands] = React.useState(false);

  return (
    <div className='filter-subject-item mt-10 border-b border-qgray-border pb-10'>
      <div className='subject-title mb-[30px]'>
        <h1 className='font-500 text-base text-black'>
          {ServeLangItem()?.Brands}
        </h1>
      </div>
      <div className='filter-items'>
        <ul>
          {showAllBrands
            ? brands &&
              brands.length > 0 &&
              brands.map((brand, i) => (
                <li key={i} className='item  flex items-center justify-between'>
                  <div className='flex items-center space-x-[8px] rtl:space-x-reverse'>
                    <div>
                      <Checkbox
                        id={brand.slug}
                        name={brand.id}
                        handleChange={() => {
                          if (filterBrand === brand.slug) {
                            filterBrand = '';
                            setFilterBrand(filterBrand);
                            return;
                          }
                          filterBrand = brand.slug;
                          setFilterBrand(filterBrand);
                        }}
                        checked={filterBrand === brand.slug ? true : false}
                      />
                    </div>
                    <label
                      htmlFor={brand.name}
                      className='font-400 text-xs font-black capitalize'
                    >
                      {brand.name}
                    </label>
                  </div>
                </li>
              ))
            : brands &&
              brands.length > 0 &&
              brands
                .filter((item, index) => index < 5)
                .map((brand, i) => (
                  <li
                    key={i}
                    className='item  flex items-center justify-between'
                  >
                    <div className='flex items-center space-x-[8px] rtl:space-x-reverse'>
                      <div>
                        <Checkbox
                          id={brand.slug}
                          name={brand.id}
                          handleChange={() => {
                            if (filterBrand === brand.slug) {
                              filterBrand = '';
                              setFilterBrand(filterBrand);
                              return;
                            }

                            filterBrand = brand.slug;
                            setFilterBrand(filterBrand);
                          }}
                          checked={filterBrand === brand.slug ? true : false}
                        />
                      </div>
                      <label
                        htmlFor={brand.name}
                        className='font-400 text-xs font-black capitalize'
                      >
                        {brand.name}
                      </label>
                    </div>
                  </li>
                ))}
        </ul>
      </div>
      <div className='flex justify-center'>
        <button
          onClick={() => setShowAllBrands(!showAllBrands)}
          className='text-qgray-500 text-sm font-medium focus:outline-none focus-visible:ring'
        >
          {showAllBrands ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
}
