import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import IcoAdress from './icons/IcoAdress';
import IcoCart from './icons/IcoCart';
import IcoLogout from './icons/IcoLogout';
import IcoPeople from './icons/IcoPeople';
import IcoDashboard from './icons/IcoDashboard';
import AddressesTab from './tabs/AddressesTab';
import OrderTab from './tabs/OrderTab';
import ProfileTab from './tabs/ProfileTab';
import BreadcrumbCom from '../../BreadcrumbCom';
import ServeLangItem from '../../Helpers/ServeLangItem';
import isAuth from '../../../../Middleware/isAuth';
import apiRequest from '../../../../utils/apiRequest';
import { useGetProfile } from '../../../api/seller/profile';
import ProductTab from './tabs/ProductTab';

function Dashboard() {
  const location = useRouter();
  const getHashContent = location.asPath.split('#');
  const [active, setActive] = useState('dashboard');
  const [dashBoardData, setDashboardData] = useState(null);
  const [profileInfo, setProfile] = useState(null);

  const getShopProfile = useGetProfile();

  useEffect(() => {
    if (getShopProfile.isSuccess) {
      setProfile(getShopProfile.data.data);
    }
  }, [getShopProfile]);

  useEffect(() => {
    setActive(
      getHashContent && getHashContent.length > 1
        ? getHashContent[1]
        : 'profile'
    );
  }, [getHashContent]);

  return (
    <div className='w-full '>
      <div className=''>
        <div className='w-full'>
          <div className='w-full bg-white p-5 xl:p-10'>
            <div className='title-area flex w-full items-center justify-between'>
              <h1 className='text-[22px] font-bold text-qblack'>
                {ServeLangItem()?.Seller_Menu}
              </h1>
            </div>
            <div className='profile-wrapper mt-8 w-full rtl:space-x-reverse xl:flex xl:space-x-10'>
              <div className='border-[rgba(0, 0, 0, 0.1)] mb-10 w-full xl:mb-0 xl:min-h-[600px] xl:w-[236px] ltr:xl:border-r rtl:xl:border-l'>
                <div className='flex flex-row flex-wrap gap-3 rtl:space-x-reverse xl:flex-col xl:gap-0 xl:space-y-10'>
                  <div className='item group'>
                    <Link href='/user/shop#profile'>
                      <div className='flex items-center space-x-3 capitalize text-qgray hover:text-qblack rtl:space-x-reverse'>
                        <span>
                          <IcoPeople />
                        </span>
                        <span className=' cursor-pointer text-base font-normal capitalize'>
                          {ServeLangItem()?.Shop_Information}
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className='item group'>
                    <Link href='/user/shop#product'>
                      <div className='flex items-center space-x-3 capitalize text-qgray hover:text-qblack rtl:space-x-reverse'>
                        <span>
                          <IcoDashboard />
                        </span>
                        <span className=' cursor-pointer text-base font-normal capitalize'>
                          {ServeLangItem()?.List_Product}
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className='item group'>
                    <Link href='/user/shop#order'>
                      <div className='flex items-center space-x-3 capitalize text-qgray hover:text-qblack rtl:space-x-reverse'>
                        <span>
                          <IcoCart />
                        </span>
                        <span className=' cursor-pointer text-base font-normal capitalize'>
                          {ServeLangItem()?.Order}
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className='item group'>
                    <Link href={`/`}>
                      <div className='flex items-center space-x-3 capitalize text-qgray hover:text-qblack rtl:space-x-reverse'>
                        <span>
                          <IcoLogout />
                        </span>
                        <span className=' cursor-pointer text-base font-normal capitalize'>
                          Back
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='flex-1'>
                <div className='item-body dashboard-wrapper w-full'>
                  {active === 'profile' ? (
                    <>
                      {profileInfo && <ProfileTab profileInfo={profileInfo} />}
                    </>
                  ) : active === 'order' ? (
                    <OrderTab />
                  ) : active === 'product' ? (
                    <ProductTab />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
