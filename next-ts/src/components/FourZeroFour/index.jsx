import Image from 'next/image';
import Link from 'next/link';

import BreadcrumbCom from '../BreadcrumbCom';
import ServeLangItem from '../Helpers/ServeLangItem';
import Layout from '../Partials/Layout';
import errorImage from '../../../public/assets/images/error_page-2022-11-17-11-27-36-6180.png';

export default function FourZeroFour() {
  return (
    <Layout>
      <div className='cart-page-wrapper w-full'>
        <div className='container-x mx-auto'>
          <BreadcrumbCom paths={[{ name: 'home', path: '/' }]} />
          <div className='empty-card-wrapper w-full'>
            <div className='flex w-full items-center justify-center'>
              <div>
                <div className='mb-0 scale-50 transform sm:mb-10 sm:scale-100'>
                  <div className='relative h-[475px] w-[338px]'>
                    <Image
                      layout='fill'
                      objectFit='scale-down'
                      src={errorImage}
                      alt='404'
                    />
                  </div>
                </div>
                <div data-aos='fade-up' className='empty-content w-full'>
                  <h1 className='mb-5 text-center text-base font-semibold sm:text-xl'>
                    {ServeLangItem()?.Sorry_We_cantt_Find_that_page}
                  </h1>
                  <Link href='/'>
                    <div className='flex w-full justify-center '>
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
        </div>
      </div>
    </Layout>
  );
}
