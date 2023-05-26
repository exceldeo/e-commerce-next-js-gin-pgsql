import React from 'react';
import ServeLangItem from '../ServeLangItem';

function ShopNowBtn() {
  return (
    <div className='relative w-full cursor-pointer '>
      <div className='relative  z-20 inline-flex items-center space-x-1.5 rtl:space-x-reverse'>
        <span className='text-sm font-medium leading-[30px] text-qblack'>
          {ServeLangItem()?.Shop_Now}
        </span>
        <span className='leading-[30px]'>
          <svg
            className={`transform rtl:rotate-180`}
            width='7'
            height='11'
            viewBox='0 0 7 11'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='2.08984'
              y='0.636719'
              width='6.94219'
              height='1.54271'
              transform='rotate(45 2.08984 0.636719)'
              fill='#1D1D1D'
            />
            <rect
              x='7'
              y='5.54492'
              width='6.94219'
              height='1.54271'
              transform='rotate(135 7 5.54492)'
              fill='#1D1D1D'
            />
          </svg>
        </span>
      </div>
      <div className='absolute left-0 bottom-0 z-10 h-[2px] w-[82px] bg-qyellow transition-all duration-300 ease-in-out group-hover:h-4 rtl:right-0'></div>
    </div>
  );
}

export default ShopNowBtn;
