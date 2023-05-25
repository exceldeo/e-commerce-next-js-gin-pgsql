import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import SKKMIGASIOG from '../../../../../public/assets/images/skkmigasiog.png';
import auth from '../../../../../utils/auth';
import { useGetProfile } from '../../../../api/profile';
import ThinBag from '../../../Helpers/icons/ThinBag';
import ThinPeople from '../../../Helpers/icons/ThinPeople';
import SearchBox from '../../../Helpers/SearchBox';
import ServeLangItem from '../../../Helpers/ServeLangItem';

export default function Middlebar({ className }) {
  const router = useRouter();
  const [profile, setProfile] = useState(false);
  const isAuth = auth();

  const profilehandler = () => {
    setProfile(!profile);
  };

  const logout = () => {
    if (isAuth) {
      localStorage.removeItem('auth');
      router.push('/login');
    }
  };

  const getProfile = useGetProfile();

  return (
    <div
      className={`h-[86px] w-full  border-b-8 border-[#BAFA95] bg-white ${className}`}
    >
      <div className='container-x mx-auto h-full'>
        <div className='relative h-full'>
          <div className='flex h-full items-center justify-center'>
            <div className='relative'>
              <Link href='/' passHref>
                <div className='w-[100px]'>E-Commerce</div>
              </Link>
            </div>
            <div className='mx-5 h-[44px] w-[100%]'>
              <SearchBox className='search-com' />
            </div>
            {isAuth ? (
              <div className='relative flex items-center space-x-6 rtl:space-x-reverse '>
                <div className='cart-wrapper group relative  rounded-xl bg-white p-1'>
                  <div className='cart relative cursor-pointer'>
                    <Link href='/cart' passHref>
                      <a rel='noopener noreferrer'>
                        <span className='cursor-pointer'>
                          <ThinBag />
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className='rounded-xl bg-white p-1'>
                  <button onClick={profilehandler} type='button'>
                    <span>
                      <ThinPeople />
                    </span>
                  </button>
                </div>
                {profile && (
                  <>
                    <div
                      onClick={() => setProfile(false)}
                      className='fixed top-0 left-0 z-30 z-30 h-full w-full'
                    ></div>
                    <div
                      className='absolute right-0 top-11 z-40 flex w-[208px] flex-col justify-between border-t-[3px] border-qyellow bg-white'
                      style={{
                        boxShadow: ' 0px 15px 50px 0px rgba(0, 0, 0, 0.14)',
                      }}
                    >
                      <div className='menu-item-area w-full  p-5'>
                        <ul className='flex  w-full flex-col space-y-7'>
                          <li className='text-base text-qgraytwo'>
                            <span>
                              {ServeLangItem()?.Hi},{' '}
                              {getProfile.data?.data?.fullname}
                            </span>
                          </li>
                          <li className='cursor-pointer text-base text-qgraytwo hover:font-semibold hover:text-qblack'>
                            <Link href='/profile#profile' passHref>
                              <a rel='noopener noreferrer'>
                                <span className='capitalize'>
                                  {ServeLangItem()?.profile}
                                </span>
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className='flex h-10 w-full items-center justify-center border-t border-qgray-border'>
                        <button
                          onClick={logout}
                          type='button'
                          className=' text-base font-semibold text-qblack'
                        >
                          {ServeLangItem()?.Sign_Out}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className='relative flex items-center space-x-6 rtl:space-x-reverse '>
                <Link href='/login'>
                  <button
                    type='button'
                    className='font-600 inline-block h-full h-[42px] w-[100px] rounded-md  bg-green-600 p-1 align-middle text-sm text-white '
                  >
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
