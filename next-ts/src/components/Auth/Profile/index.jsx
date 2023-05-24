import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import IcoAdress from './icons/IcoAdress';
import IcoCart from './icons/IcoCart';
import IcoLogout from './icons/IcoLogout';
import IcoPeople from './icons/IcoPeople';
import AddressesTab from './tabs/AddressesTab';
import Dashboard from './tabs/Dashboard';
import OrderTab from './tabs/OrderTab';
import ProfileTab from './tabs/ProfileTab';
import BreadcrumbCom from '../../BreadcrumbCom';
import ServeLangItem from '../../Helpers/ServeLangItem';
import isAuth from '../../../../Middleware/isAuth';
import apiRequest from '../../../../utils/apiRequest';
import auth from '../../../../utils/auth';
import { useGetAllOrders } from '../../../api/order';
import { useGetProfile } from '../../../api/profile';

function Profile() {
  const location = useRouter();
  const getHashContent = location.asPath.split('#');
  const [active, setActive] = useState('dashboard');
  const [dashBoardData, setDashboardData] = useState(null);
  const [profileInfo, setProfile] = useState(null);
  const { data: orders } = useGetAllOrders();
  useEffect(() => {
    setActive(
      getHashContent && getHashContent.length > 1
        ? getHashContent[1]
        : 'dashboard'
    );
  }, [getHashContent]);

  const profile = useGetProfile();

  const getProfile = () => {
    if (profile.isSuccess) {
      setProfile(profile.data.data);
    }
  };

  useEffect(() => {
    if (!profileInfo) {
      getProfile();
    }
  }, [profileInfo]);

  const logout = () => {
    if (auth) {
      apiRequest.logout(auth.token);
      localStorage.removeItem('auth');
      location.push('/login');
    }
  };

  return (
    <div className='profile-page-wrapper w-full'>
      <div className='container-x mx-auto'>
        <div className='my-10 w-full'>
          <BreadcrumbCom
            paths={[
              { name: ServeLangItem()?.home, path: '/' },
              { name: ServeLangItem()?.profile, path: '/profile' },
            ]}
          />
          <div className='w-full bg-white p-5 xl:p-10'>
            <div className='title-area flex w-full items-center justify-between'>
              <h1 className='text-[22px] font-bold text-qblack'>
                {ServeLangItem()?.Welcome_to_your_Profile}
              </h1>
              {/* {checkSellerAndVendor && (
                <div className="switch-dashboard flex md:flex-row md:space-x-3 flex-col space-y-3 md:space-y-0 rtl:space-x-reverse rtl:space-x-reverse items-center">
                  <p className="text-qgray text-base">
                    {ServeLangItem()?.Switch_Dashboard}
                  </p>
                  <button
                    onClick={switchDashboardHandler}
                    type="button"
                    className="w-[73px] h-[31px] border border-[#D9D9D9] rounded-full relative "
                  >
                    <div
                      className={`w-[23px] h-[23px] bg-qblack rounded-full absolute top-[3px] transition-all duration-300 ease-in-out ${
                        switchDashboard ? "left-[44px]" : "left-[4px]"
                      }`}
                    ></div>
                  </button>
                </div>
              )} */}
            </div>
            <div className='profile-wrapper mt-8 w-full rtl:space-x-reverse xl:flex xl:space-x-10'>
              <div className='border-[rgba(0, 0, 0, 0.1)] mb-10 w-full xl:mb-0 xl:min-h-[600px] xl:w-[236px] ltr:xl:border-r rtl:xl:border-l'>
                <div className='flex flex-row flex-wrap gap-3 rtl:space-x-reverse xl:flex-col xl:gap-0 xl:space-y-10'>
                  {/* <div className="item group">
                    <Link href="/profile#dashboard">
                      <div className="flex space-x-3 rtl:space-x-reverse items-center text-qgray hover:text-qblack capitalize">
                        <span>
                          <IcoDashboard />
                        </span>
                        <span className=" font-normal text-base capitalize cursor-pointer">
                          {ServeLangItem()?.Dashboard}
                        </span>
                      </div>
                    </Link>
                  </div> */}
                  <div className='item group'>
                    <Link href='/profile#profile'>
                      <div className='flex items-center space-x-3 capitalize text-qgray hover:text-qblack rtl:space-x-reverse'>
                        <span>
                          <IcoPeople />
                        </span>
                        <span className=' cursor-pointer text-base font-normal capitalize'>
                          {ServeLangItem()?.Personal_Info}
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/*<div className="item group">*/}
                  {/*  <Link href="/profile#payment">*/}
                  {/*    <div className="flex space-x-3 rtl:space-x-reverse items-center text-qgray hover:text-qblack capitalize">*/}
                  {/*      <span>*/}
                  {/*        <IcoPayment />*/}
                  {/*      </span>*/}
                  {/*      <span className=" font-normal text-base capitalize cursor-pointer">*/}
                  {/*        Payment Method*/}
                  {/*      </span>*/}
                  {/*    </div>*/}
                  {/*  </Link>*/}
                  {/*</div>*/}
                  <div className='item group'>
                    <Link href='/profile#order'>
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
                  {/* <div className="item group">
                    <Link href="/profile#wishlist">
                      <div className="flex space-x-3 rtl:space-x-reverse items-center text-qgray hover:text-qblack capitalize">
                        <span>
                          <IcoLove />
                        </span>
                        <span className=" font-normal text-base capitalize cursor-pointer">
                          {ServeLangItem()?.Wishlist}
                        </span>
                      </div>
                    </Link>
                  </div> */}
                  <div className='item group'>
                    <Link href='/profile#address'>
                      <div className='flex items-center space-x-3 capitalize text-qgray hover:text-qblack rtl:space-x-reverse'>
                        <span>
                          <IcoAdress />
                        </span>
                        <span className=' cursor-pointer text-base font-normal capitalize'>
                          {ServeLangItem()?.Address}
                        </span>
                      </div>
                    </Link>
                  </div>
                  {/* <div className="item group">
                    <Link href="/profile#review">
                      <div className="flex space-x-3 rtl:space-x-reverse items-center text-qgray hover:text-qblack capitalize">
                        <span>
                          <IcoReviewHand />
                        </span>
                        <span className=" font-normal text-base capitalize cursor-pointer">
                          {ServeLangItem()?.Reviews}
                        </span>
                      </div>
                    </Link>
                  </div> */}
                  {/* <div className="item group">
                    <Link href="/profile#password">
                      <div className="flex space-x-3 rtl:space-x-reverse items-center text-qgray hover:text-qblack capitalize">
                        <span>
                          <IcoPassword />
                        </span>
                        <span className=" font-normal text-base capitalize cursor-pointer">
                          {ServeLangItem()?.Change_Password}
                        </span>
                      </div>
                    </Link>
                  </div> */}
                  {/*<div className="item group">*/}
                  {/*  <Link href="/profile#support">*/}
                  {/*    <div className="flex space-x-3 rtl:space-x-reverse items-center text-qgray hover:text-qblack capitalize">*/}
                  {/*      <span>*/}
                  {/*        <IcoSupport />*/}
                  {/*      </span>*/}
                  {/*      <span className=" font-normal text-base capitalize cursor-pointer">*/}
                  {/*        Support Ticket*/}
                  {/*      </span>*/}
                  {/*    </div>*/}
                  {/*  </Link>*/}
                  {/*</div>*/}
                  <div className='item group'>
                    <div
                      onClick={logout}
                      className='flex items-center space-x-3 capitalize text-qgray hover:text-qblack rtl:space-x-reverse'
                    >
                      <span>
                        <IcoLogout />
                      </span>
                      <span className=' cursor-pointer text-base font-normal capitalize'>
                        {ServeLangItem()?.Logout}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex-1'>
                <div className='item-body dashboard-wrapper w-full'>
                  {active === 'dashboard' ? (
                    <>
                      {dashBoardData && (
                        <Dashboard dashBoardData={dashBoardData} />
                      )}
                    </>
                  ) : active === 'profile' ? (
                    <>
                      {profileInfo && <ProfileTab profileInfo={profileInfo} />}
                    </>
                  ) : active === 'order' ? (
                    <OrderTab orders={orders} />
                  ) : active === 'address' ? (
                    <AddressesTab />
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

export default isAuth(Profile);
