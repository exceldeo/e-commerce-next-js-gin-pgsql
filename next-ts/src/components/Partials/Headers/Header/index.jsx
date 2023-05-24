import Image from 'next/image';
import Link from 'next/link';

import Middlebar from './Middlebar';
import TopBar from './TopBar';
import SKKMigasIOG from '../../../../../public/assets/images/skkmigasiog.png';
import auth from '../../../../../utils/auth';
import ThinBag from '../../../Helpers/icons/ThinBag';

export default function Header({ drawerAction }) {
  const isAuth = auth();

  return (
    <header className='header-section-wrapper relative print:hidden'>
      {isAuth && <TopBar contact={null} className='quomodo-shop-top-bar' />}
      <Middlebar className='quomodo-shop-middle-bar hidden lg:block' />
      <div className='quomodo-shop-drawer block h-[60px] w-full border-b-8 border-[#BAFA95] bg-white py-1 lg:hidden'>
        <div className='flex h-full w-full items-center justify-between px-5'>
          <div onClick={drawerAction}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h7'
              />
            </svg>
          </div>

          <div className='relative h-full w-[200px]'>
            <Link href='/' passHref>
              <a>
                <Image
                  layout='fill'
                  objectFit='scale-down'
                  src={SKKMigasIOG.src}
                  alt='logo'
                />
              </a>
            </Link>
          </div>
          {isAuth && (
            <div className='cart relative cursor-pointer'>
              <Link href='/cart'>
                <span>
                  <ThinBag />
                </span>
              </Link>
              <span className='absolute -top-2.5 -right-2.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-qyellow text-[9px]'>
                {/* {cartItems ? cartItems.length : 0} */}
              </span>
            </div>
          )}
        </div>
      </div>
      {/* <Navbar className="quomodo-shop-nav-bar lg:block hidden" /> */}
    </header>
  );
}
