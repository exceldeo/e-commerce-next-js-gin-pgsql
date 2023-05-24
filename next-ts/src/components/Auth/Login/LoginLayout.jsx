import Image from 'next/image';
import React from 'react';

import LoginImage from '../../../../public/assets/images/login-image.png';

function LoginLayout({ children }) {
  return (
    <div className='min-h-screen w-full pt-0 pb-0 '>
      <div className='login-page-wrapper w-full py-10'>
        <div className='container-x mx-auto'>
          <div className='relative items-center lg:flex'>
            <div className='flex h-[783px] w-full flex-col justify-center border border-[#E0E0E0] bg-white p-5 sm:p-10 lg:w-[572px]'>
              {children && children}
            </div>
            <div className='hidden flex-1 scale-60 transform lg:flex xl:scale-100   xl:justify-center '>
              <div
                className='rtl::xl:-left-20 absolute ltr:-right-[138px] rtl:-left-[138px] ltr:xl:-right-20'
                style={{ top: 'calc(50% - 258px)' }}
              >
                <Image width={608} height={480} src={LoginImage} alt='login' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginLayout;
