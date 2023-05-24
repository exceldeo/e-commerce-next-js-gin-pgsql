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
      localStorage.removeItem('token');
      router.push('/login');
    }
  };

  const getProfile = useGetProfile();

  // const [categoryToggle, setToggle] = useState(false);
  // const [subCatHeight, setHeight] = useState(null);
  // const handler = () => {
  //   setToggle(!categoryToggle);
  // };

  // useEffect(() => {
  //   let categorySelector = document.querySelector('.category-dropdown');
  //   // setHeight(categorySelector.offsetHeight);
  // }, [categoryToggle]);

  // const getCategories = useGetAllSummarizedCategories();
  // const [categoryList, setCategoryList] = useState({});

  // useEffect(() => {
  //   if (getCategories.isSuccess) {
  //     setCategoryList(getCategories.data?.data);
  //   }
  // }, [getCategories.isSuccess]);

  return (
    <div
      className={`h-[86px] w-full  border-b-8 border-[#BAFA95] bg-white ${className}`}
    >
      <div className='container-x mx-auto h-full'>
        <div className='relative h-full'>
          <div className='flex h-full items-center justify-center'>
            <div className='relative'>
              <Link href='/' passHref>
                <a rel='noopener noreferrer'>
                  <Image
                    width='200'
                    height='80'
                    objectFit='fill'
                    src={SKKMIGASIOG.src}
                    alt='logo'
                  />
                </a>
              </Link>
            </div>
            {/* <div className='category relative mt-[6px] h-[53px] rounded-t-md bg-white px-5'>
              <button
                onClick={handler}
                type='button'
                className='mr-2 flex h-full w-full items-center justify-between'
              >
                <div className='flex items-center space-x-3 rtl:space-x-reverse'>
                  <span className='font-600 text-sm text-qblacktext'>
                    {ServeLangItem()?.Categories}
                  </span>
                </div>
                <div>
                  <Arrow
                    width='5.78538'
                    height='1.28564'
                    className='fill-current text-qblacktext'
                  />
                </div>
              </button>
              {categoryToggle && (
                <>
                  <div
                    className='fixed top-0 left-0 -z-10 h-full w-full'
                    onClick={handler}
                  ></div>
                </>
              )}
              <div
                style={{
                  boxShadow: ' 0px 15px 50px 0px rgba(0, 0, 0, 0.14)',
                }}
                className={`category-dropdown absolute left-0 top-[53px] z-50 w-full bg-white  ${
                  categoryToggle ? 'block' : 'hidden'
                }`}
              >
                <ul className='categories-list relative'>
                  {Object.keys(categoryList).length > 0 &&
                    Object.keys(categoryList).map((key) => (
                      <li key={key} className='category-item'>
                        <Link
                          href={{
                            pathname: '/products',
                            query: { category: categoryList[key].slug },
                          }}
                          passHref
                        >
                          <a rel='noopener noreferrer'>
                            <div className=' flex h-10 cursor-pointer items-center justify-between px-5 transition-all duration-300 ease-in-out'>
                              <div className='flex items-center space-x-6 rtl:space-x-reverse'>
                                <span className='font-400 text-xs'>
                                  {categoryList[key].name}
                                </span>
                              </div>
                              <div>
                                <span>
                                  <svg
                                    className='transform rtl:rotate-180'
                                    width='6'
                                    height='9'
                                    viewBox='0 0 6 9'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <rect
                                      x='1.49805'
                                      y='0.818359'
                                      width='5.78538'
                                      height='1.28564'
                                      transform='rotate(45 1.49805 0.818359)'
                                      fill='#1D1D1D'
                                    />
                                    <rect
                                      x='5.58984'
                                      y='4.90918'
                                      width='5.78538'
                                      height='1.28564'
                                      transform='rotate(135 5.58984 4.90918)'
                                      fill='#1D1D1D'
                                    />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </a>
                        </Link>
                        <div
                          className={`sub-category-lvl-two  absolute top-0 z-10 w-[270px] ltr:left-[270px]  rtl:right-[270px]
                          ${
                            Object.keys(categoryList[key].sub_categories)
                              .length > 0
                              ? 'bg-white'
                              : ''
                          }
                          `}
                          style={{ height: `${subCatHeight}px` }}
                        >
                          <ul className=''>
                            {Object.keys(categoryList[key].sub_categories)
                              .length > 0 &&
                              Object.keys(categoryList[key].sub_categories).map(
                                (subKey) => (
                                  <li key={subKey} className='category-item'>
                                    <Link
                                      href={{
                                        pathname: '/products',
                                        query: {
                                          category:
                                            categoryList[key].sub_categories[
                                              subKey
                                            ].slug,
                                        },
                                      }}
                                      passHref
                                    >
                                      <a rel='noopener noreferrer'>
                                        <div className='flex h-10 cursor-pointer items-center justify-between px-5 transition-all duration-300 ease-in-out'>
                                          <div>
                                            <span className='font-400 text-xs'>
                                              {
                                                categoryList[key]
                                                  .sub_categories[subKey].name
                                              }
                                            </span>
                                          </div>
                                          <div>
                                            <span>
                                              <svg
                                                className='transform rtl:rotate-180'
                                                width='6'
                                                height='9'
                                                viewBox='0 0 6 9'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                              >
                                                <rect
                                                  x='1.49805'
                                                  y='0.818359'
                                                  width='5.78538'
                                                  height='1.28564'
                                                  transform='rotate(45 1.49805 0.818359)'
                                                  fill='#1D1D1D'
                                                />
                                                <rect
                                                  x='5.58984'
                                                  y='4.90918'
                                                  width='5.78538'
                                                  height='1.28564'
                                                  transform='rotate(135 5.58984 4.90918)'
                                                  fill='#1D1D1D'
                                                />
                                              </svg>
                                            </span>
                                          </div>
                                        </div>
                                      </a>
                                    </Link>
                                    <div
                                      className={`sub-category-lvl-three absolute top-0 z-10 w-[270px] ltr:left-[270px] rtl:right-[270px] ${
                                        Object.keys(
                                          categoryList[key].sub_categories[
                                            subKey
                                          ].child_categories
                                        ).length > 0
                                          ? 'bg-white'
                                          : ''
                                      }`}
                                      style={{ height: `${subCatHeight}px` }}
                                    >
                                      <ul className=''>
                                        {Object.keys(
                                          categoryList[key].sub_categories[
                                            subKey
                                          ].child_categories
                                        ) > 0 &&
                                          Object.keys(
                                            categoryList[key].sub_categories[
                                              subKey
                                            ].child_categories
                                          ).map((subSubKey) => (
                                            <li
                                              key={subSubKey}
                                              className='category-item'
                                            >
                                              <Link
                                                href={{
                                                  pathname: '/products',
                                                  query: {
                                                    category:
                                                      categoryList[key]
                                                        .sub_categories[subKey]
                                                        .child_categories[
                                                        subSubKey
                                                      ].slug,
                                                  },
                                                }}
                                                passHref
                                              >
                                                <a rel='noopener noreferrer'>
                                                  <div className=' flex h-10 cursor-pointer items-center justify-between px-5 transition-all duration-300 ease-in-out'>
                                                    <div>
                                                      <span className='font-400 text-xs'>
                                                        {
                                                          categoryList[key]
                                                            .sub_categories[
                                                            subKey
                                                          ].child_categories[
                                                            subSubKey
                                                          ].name
                                                        }
                                                      </span>
                                                    </div>
                                                  </div>
                                                </a>
                                              </Link>
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                  </li>
                                )
                              )}
                          </ul>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div> */}
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
                    {/* <span className='absolute -top-2.5 -right-2.5  flex h-[18px] w-[18px] items-center justify-center rounded-full text-[9px]'>
                    0
                  </span> */}
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
                              {getProfile.data?.data?.name}
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
                    className='font-600 inline-block h-full h-[42px] w-[100px] bg-yellow-500 p-1 align-middle text-sm text-white '
                  >
                    Login KKKS
                  </button>
                </Link>
                <a href='https://test-kkks.cipcc.id/vendor/login'>
                  <button
                    type='button'
                    className='font-600 inline-block h-full h-[42px] w-[100px] bg-green-500 p-1 align-middle text-sm text-white '
                  >
                    Login Vendor
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
