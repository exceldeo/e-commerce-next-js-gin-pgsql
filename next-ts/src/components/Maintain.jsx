import Image from 'next/image';
import React, { useState } from 'react';

// import settings from "../../utils/settings";

function Maintain() {
  const [maintain] = useState(null);
  return (
    <>
      <div className='flex h-screen w-full items-center justify-center'>
        {maintain && (
          <div className=' text-center'>
            <div className='mb-5'>
              {maintain && (
                <Image
                  width='300'
                  height='300'
                  objectFit='scale-down'
                  src='https://taxacademy.id/wp-content/uploads/2023/04/Penting-Ketahui-Penyebab-dan-Solusi-Mengatasi-Error-Ketika-Melaporkan-SPT-Tahunan-Badan.png'
                  alt='logo'
                />
              )}
            </div>
            <div className='flex w-full justify-center'>
              <p className='text-tblack w-4/5 text-center text-3xl font-bold'>
                {maintain.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Maintain;
