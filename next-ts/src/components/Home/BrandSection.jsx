import Image from 'next/image';
import Link from 'next/link';

import DataIteration from '../Helpers/DataIteration';
export default function BrandSection({ className, sectionTitle, brands = [] }) {
  return (
    <div data-aos='fade-up' className={`w-full ${className || ''}`}>
      <div className='container-x mx-auto'>
        <div className=' section-title mb-5 flex items-center justify-between'>
          <div>
            <h1 className='font-600 text-xl text-qblacktext sm:text-3xl'>
              {sectionTitle}
            </h1>
          </div>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6'>
          <DataIteration
            datas={brands}
            startLength={0}
            endLength={brands.length > 12 ? 12 : brands.length}
          >
            {({ datas }) => (
              <div key={datas.id} className='item'>
                <Link
                  href={{
                    pathname: '/products',
                    query: { brand: datas.slug },
                  }}
                >
                  <div className='relative flex h-[130px] w-full cursor-pointer items-center justify-center border border-primarygray bg-white'>
                    <Image
                      layout='fill'
                      objectFit='scale-down'
                      src={`${datas.logo}`}
                      alt={datas.name}
                    />
                  </div>
                </Link>
              </div>
            )}
          </DataIteration>
        </div>
      </div>
    </div>
  );
}
