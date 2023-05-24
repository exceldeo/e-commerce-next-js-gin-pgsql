import Link from 'next/link';
import { useEffect } from 'react';

import ShopNowBtn from '../Helpers/Buttons/ShopNowBtn';
import ServeLangItem from '../Helpers/ServeLangItem';
import SimpleSlider from '../Helpers/SliderCom';
import settings from '../../../utils/settings';

export default function Banner({
  className,
  images = [],
  sidebarImgOne,
  sidebarImgTwo,
}) {
  const settingBanner = {
    infinite: true,
    dots: true,
    autoplay: true,
    arrows: false,
    fade: true,
  };
  const { text_direction } = settings();
  useEffect(() => {
    const getSliderInitElement = document.querySelector(
      '.slider-wrapper .slick-slider.slick-initialized'
    );
    getSliderInitElement.setAttribute('dir', `${text_direction}`);
  }, [text_direction]);

  return (
    <>
      <div className={`w-full ${className || ''}`}>
        <div className='container-x mx-auto'>
          <div className='main-wrapper w-full'>
            <div className='banner-card mb-[30px] rtl:space-x-0 xl:flex xl:h-[600px]  xl:space-x-[30px] '>
              <div
                data-aos='fade-right'
                className='mb-2 h-[220px] w-full ltr:ml-0 rtl:ml-[30px] md:h-[500px] xl:mb-0 xl:h-full xl:w-[740px]'
              >
                <div className='slider-wrapper h-full w-full'>
                  <SimpleSlider settings={settingBanner}>
                    {images.length > 0 &&
                      images.map((item, i) => (
                        <div key={i} className='item group h-full w-full'>
                          <div
                            style={{
                              backgroundImage: `url(${item.image})`,
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                            }}
                            className='relative flex h-full  w-full max-w-full items-center px-5 ltr:pl-[30px] rtl:pr-[30px]'
                          >
                            <div>
                              <div className='mb-[15px] flex h-[18px] w-[100px] items-center justify-center rounded-full bg-white  shadow md:mb-[30px] md:h-[25px] md:w-[112px]'>
                                <span className='text-[10px] font-semibold uppercase text-qblack md:text-xs'>
                                  {item.badge}
                                </span>
                              </div>
                              <div className='mb-[15px] md:mb-[30px]'>
                                <p className='text-[20px] leading-none text-qblack md:mb-3 md:text-[50px]'>
                                  {item.title_one}
                                </p>
                                <h1 className='text-[20px] font-bold text-qblack md:w-[400px] md:text-[50px] md:leading-[66px]'>
                                  {item.title_two}
                                </h1>
                              </div>
                              <div className='w-[90px]'>
                                <Link
                                  href={{
                                    pathname: '/single-product',
                                    query: { slug: item.product_slug },
                                  }}
                                  passHref
                                >
                                  <a rel='noopener noreferrer'>
                                    <ShopNowBtn />
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </SimpleSlider>
                </div>
              </div>
              <div
                data-aos='fade-left'
                className='flex h-[150px] flex-1 flex-row  md:h-[350px] xl:h-full xl:flex-col xl:space-y-[30px]'
              >
                <div
                  className='group relative mr-2 flex w-full items-center ltr:pl-[30px] rtl:pr-[30] ltr:md:pl-[40px] rtl:md:pr-[40px] xl:mr-0 xl:h-1/2'
                  style={{
                    backgroundImage: `url(${sidebarImgOne.image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <div className='flex flex-col justify-between px-5'>
                    <div>
                      <div className='mb-[15px] flex h-[18px] w-[100px] items-center justify-center rounded-full bg-white  shadow md:mb-[22px] md:h-[25px] md:w-[112px]'>
                        <span className='text-[10px] font-semibold uppercase text-qblack md:text-xs'>
                          {sidebarImgOne.badge}
                        </span>
                      </div>
                      <div className='mb-2.5 md:mb-[22px]'>
                        <p className='font-semibold leading-none text-qblack md:mb-3 md:text-[20px]'>
                          {sidebarImgOne.title_one}
                        </p>
                        <h1 className='font-semibold text-qblack md:text-[30px] md:leading-[40px]'>
                          {sidebarImgOne.title_two}
                        </h1>
                      </div>
                    </div>
                    <div className='w-[90px]'>
                      <Link
                        href={{
                          pathname: '/products',
                          query: { category: sidebarImgOne.product_slug },
                        }}
                        passHref
                      >
                        <a rel='noopener noreferrer'>
                          <div className='relative w-full cursor-pointer  '>
                            <div className='relative z-20  inline-flex items-center space-x-1.5 rtl:space-x-reverse'>
                              <span className='text-sm font-medium leading-[30px] text-qblack'>
                                {ServeLangItem()?.Shop_Now}
                              </span>
                              <span className='leading-[30px]'>
                                <svg
                                  className='transform rtl:rotate-180'
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
                            <div className='absolute left-0 bottom-0 z-10 h-[0px] w-[82px] bg-qyellow transition-all duration-300 ease-in-out group-hover:h-4 rtl:right-0'></div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    backgroundImage: `url(${sidebarImgTwo.image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                  className='group relative flex w-full items-center ltr:pl-[30px] rtl:pr-[30] ltr:md:pl-[40px] rtl:md:pr-[40px] xl:h-1/2'
                >
                  <div className='flex flex-col justify-between px-5'>
                    <div>
                      <div className='mb-[15px]  flex h-[18px] w-[100px] items-center justify-center rounded-full bg-white  shadow md:mb-[22px] md:h-[25px] md:w-[112px]'>
                        <span className='text-[10px] font-semibold uppercase text-qblack md:text-xs'>
                          {sidebarImgTwo.badge}
                        </span>
                      </div>
                      <div className='mb-2.5 md:mb-[30px]'>
                        <p className='font-semibold leading-none text-qblack md:mb-3 md:text-[22px]'>
                          {sidebarImgTwo.title_one}
                        </p>
                        <h1 className='font-semibold text-qblack md:text-[20px] md:leading-[40px]'>
                          {sidebarImgTwo.title_two}
                        </h1>
                      </div>
                    </div>
                    <div className='w-[90px]'>
                      <Link
                        href={{
                          pathname: '/products',
                          query: { category: sidebarImgTwo.product_slug },
                        }}
                        passHref
                      >
                        <a rel='noopener noreferrer'>
                          <div className='relative w-full cursor-pointer  '>
                            <div className='relative z-20  inline-flex items-center space-x-1.5 rtl:space-x-reverse'>
                              <span className='text-sm font-medium leading-[30px] text-qblack'>
                                {ServeLangItem()?.Shop_Now}
                              </span>
                              <span className='leading-[30px]'>
                                <svg
                                  className='transform rtl:rotate-180'
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
                            <div className='absolute left-0 bottom-0 z-10 h-[0px] w-[82px] bg-qyellow transition-all duration-300 ease-in-out group-hover:h-4 rtl:right-0'></div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div
              data-aos="fade-up"
              className="best-services w-full bg-white flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-10 lg:py-0 py-10"
            >
              {services.map((service) => (
                <div key={service.id} className="item">
                  <div className="flex space-x-5 rtl:space-x-reverse items-center">
                    <div>
                      <span className="w-10 h-10 text-qyellow">
                        <FontAwesomeCom
                          className="w-8 h-8"
                          icon={service.icon}
                        />
                      </span>
                    </div>
                    <div>
                      <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                        {service.title}
                      </p>
                      <p className="text-sm text-qgray line-clamp-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
