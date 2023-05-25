import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useUpdateProfile } from '../../../../api/profile';
import InputCom from '../../../Helpers/InputCom';
import InputSelect from '../../../Helpers/InputSelect';
import ServeLangItem from '../../../Helpers/ServeLangItem';

export default function ProfileTab({ profileInfo }) {
  return (
    <>
      {profileInfo && (
        <>
          <div className='flex flex-col-reverse space-x-8 rtl:space-x-reverse lg:flex-row'>
            <div className=' w-full '>
              <div className='input-item mb-8'>
                <InputCom
                  label={ServeLangItem()?.Name}
                  placeholder='Name'
                  type='text'
                  inputClasses='h-[50px]'
                  value={profileInfo.fullname ? profileInfo.fullname : ''}
                  disabled
                />
              </div>

              <div className='input-item mb-8 rtl:space-x-reverse md:flex md:space-x-2.5'>
                <div className='mb-8 h-full w-full md:mb-0 md:w-1/2'>
                  <div>
                    <p className='input-label mb-2 block  text-[13px] font-normal capitalize text-qgray'>
                      {ServeLangItem()?.Email}
                      <span className='ml-1 text-xs text-yellow-500'>
                        ({ServeLangItem()?.Read_Only})
                      </span>
                    </p>
                    <div className='text-dark-gray flex h-[50px] w-full  cursor-not-allowed items-center rounded border border-yellow-500 bg-yellow-50 px-6'>
                      {profileInfo?.email}
                    </div>
                  </div>
                </div>
                <div className='relative h-full w-full md:w-1/2'>
                  <InputCom
                    label={ServeLangItem()?.Phone_Number}
                    placeholder={ServeLangItem()?.Phone_Number}
                    type='text'
                    inputClasses='h-[50px] placeholder:capitalize pl-20'
                    value={profileInfo.phone_no ? profileInfo.phone_no : ''}
                    disabled
                  />

                  <button
                    // onClick={() => setCountryDropToggle(!countryDropToggle)}
                    type='button'
                    className='absolute left-0 top-[29px] flex h-[50px] w-[70px] items-center justify-center bg-qgray-border'
                  >
                    <div className='flex items-center'>
                      <span>+62</span>
                    </div>
                  </button>
                </div>
              </div>
              {/* role
               */}
              <div className='input-item mb-8'>
                Role :{' '}
                <span
                  className={`text-qgray-500 rounded-md p-1 text-white ${
                    profileInfo.role === 0 ? 'bg-green-600' : 'bg-yellow-500'
                  }`}
                >
                  {profileInfo.role === 0 ? 'Buyer' : 'Seller'}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
