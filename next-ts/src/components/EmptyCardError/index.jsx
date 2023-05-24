// import Empty from "./Empty";
import Image from 'next/image';
import Link from 'next/link';

import ServeLangItem from '../Helpers/ServeLangItem';
import EmptyCartImg from '../../../public/assets/images/empty_cart.png';

export default function EmptyCardError() {
  return (
    <div className='empty-card-wrapper w-full'>
      <div className='flex w-full items-center justify-center'>
        <div>
          <div className='mb-5 scale-50 transform sm:mb-10 sm:scale-100'>
            <div className='relative h-[419px] w-[527px]'>
              <Image
                layout='fill'
                objectFit='scale-down'
                src={EmptyCartImg}
                alt='404'
              />
            </div>
          </div>
          <div data-aos='fade-up' className='empty-content w-full'>
            <h1 className='mb-5 text-center text-base font-semibold sm:text-xl'>
              {ServeLangItem()?.Empty_You_dont_Cart_any_Products}
            </h1>
            <Link href='/'>
              <div className='flex w-full cursor-pointer justify-center'>
                <div className='h-[50px] w-[180px] '>
                  <span type='button' className='yellow-btn'>
                    {ServeLangItem()?.Back_to_Shop}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
