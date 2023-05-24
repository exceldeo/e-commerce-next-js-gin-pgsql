import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function CategorySection({ sectionTitle, categories }) {
  return (
    <div className='category-section-wrapper w-full'>
      <div className='container-x mx-auto pb-[60px]'>
        <div>
          <div className='section-title mb-5 flex items-center justify-between'>
            <div>
              <h1 className='font-600 text-xl text-qblacktext sm:text-3xl'>
                {sectionTitle}
              </h1>
            </div>
          </div>
          <div className='grid w-full grid-cols-2 gap-[30px] md:grid-cols-4 xl:grid-cols-8'>
            {categories &&
              categories.length > 0 &&
              categories
                .slice(0, categories.length > 8 ? 8 : categories.length)
                .map((item, i) => (
                  <div key={i} className='item group w-full cursor-pointer'>
                    <Link
                      href={{
                        pathname: '/products',
                        query: { category: item.slug },
                      }}
                      passhref
                    >
                      <a rel='noopener noreferrer'>
                        <div className='relative flex h-[120px] w-full items-center justify-center rounded bg-white'>
                          <div className='relative h-full w-full scale-100 transform transition duration-300 ease-in-out group-hover:scale-110'>
                            <Image
                              layout='fill'
                              objectFit='scale-down'
                              src={
                                `${item.logo}`
                                  ? `${item.logo}`
                                  : `/assets/images/category-1.png`
                              }
                              alt='category'
                            />
                          </div>
                        </div>
                        <p className='group-hover:text-qgreen mt-5 text-center text-base text-qgray transition duration-300 ease-in-out'>
                          {item.name}
                        </p>
                      </a>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategorySection;
