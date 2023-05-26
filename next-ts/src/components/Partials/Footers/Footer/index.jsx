import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import FontAwesomeCom from '../../../Helpers/icons/FontAwesomeCom';
export default function Footer() {
  const [firstCol, setFirstCol] = useState(null);
  const [secondCol, setSecondCol] = useState(null);
  const [thirdCol, setThirdCol] = useState(null);
  const [footerContent, setFooterContent] = useState(null);
  const [socialLink, setSocialLink] = useState(null);
  return (
    <footer className='footer-section-wrapper bg-white print:hidden'>
      <div className='container-x mx-auto block pt-[56px]'>
        {/* <div className="w-full flex flex-col items-center mb-[50px]"> */}
        {/* logo area */}
        {/* <div className="mb-[40px]">
            <Link href="/" passHref>
              <a>
                {settings && (
                  <Image
                    width="153"
                    height="44"
                    objectFit="scale-down"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL + settings.logo}`}
                    alt="logo"
                  />
                )}
              </a>
            </Link>
          </div> */}
        {/* <div className="w-full h-[1px] bg-[#E9E9E9]"></div>
        </div> */}
        <div className='mb-[50px] justify-between lg:flex'>
          <div className='ml-0  mb-10 w-full lg:mb-0 lg:w-[424px]'>
            <h1 className='text-[18] font-500 mb-5 text-[#2F2F2F]'>About Us</h1>
            <p className='w-[247px] text-[15px] leading-[28px] text-[#9A9A9A]'>
              {footerContent && footerContent.about_us}
            </p>
            {/*<p className="text-[#9A9A9A] text-[15px] w-[247px] leading-[28px]">*/}
            {/*  {footerContent && footerContent.email ? footerContent.email : ""}*/}
            {/*</p>*/}
            {/*<p className="text-[#9A9A9A] text-[15px] w-[247px] leading-[28px]">*/}
            {/*  {footerContent && footerContent.address*/}
            {/*    ? footerContent.address*/}
            {/*    : ""}*/}
            {/*</p>*/}
            {/*<div>*/}
            {/*  <ul className="flex flex-col space-y-4 ">*/}
            {/*    <li>*/}
            {/*      <Link href="/tracking-order">*/}
            {/*        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">*/}
            {/*          Track Order*/}
            {/*        </span>*/}
            {/*      </Link>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*      <Link href="/faq">*/}
            {/*        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">*/}
            {/*          Support*/}
            {/*        </span>*/}
            {/*      </Link>*/}
            {/*    </li>*/}
            {/*    */}
            {/*  </ul>*/}
            {/*</div>*/}
          </div>
          <div className='flex-1 lg:flex'>
            <div className='mb-10 w-full lg:mb-0 lg:w-1/3'>
              {firstCol && (
                <>
                  <div className='mb-5'>
                    <h6 className='text-[18] font-500 text-[#2F2F2F]'>
                      {firstCol.columnTitle}
                    </h6>
                  </div>
                  <div>
                    <ul className='flex flex-col space-y-4 '>
                      {firstCol.col_links.length > 0 &&
                        firstCol.col_links.map((item, i) => (
                          <li key={i}>
                            <Link href={item.link} passHref>
                              <a rel='noopener noreferrer'>
                                <span className='cursor-pointer border-b border-transparent text-[15px] capitalize text-[#9A9A9A] hover:border-qblack hover:text-qblack'>
                                  {item.title}
                                </span>
                              </a>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
            <div className='mb-10 w-full items-center lg:mb-0 lg:flex lg:w-1/3 lg:flex-col '>
              <div>
                {secondCol && (
                  <>
                    <div className='mb-5'>
                      <h6 className='text-[18] font-500 text-[#2F2F2F]'>
                        {secondCol.columnTitle}
                      </h6>
                    </div>
                    <div>
                      <ul className='flex flex-col space-y-4 '>
                        {secondCol.col_links.length > 0 &&
                          secondCol.col_links.map((item, i) => (
                            <li key={i}>
                              <Link href={item.link} passHref>
                                <a rel='noopener noreferrer'>
                                  <span className='cursor-pointer border-b border-transparent text-[15px] capitalize text-[#9A9A9A] hover:border-qblack hover:text-qblack'>
                                    {item.title}
                                  </span>
                                </a>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className='mb-10 w-full items-center lg:mb-0 lg:flex lg:w-1/3 lg:flex-col'>
              <div>
                {thirdCol && (
                  <>
                    <div className='mb-5'>
                      <h6 className='text-[18] font-500 text-[#2F2F2F]'>
                        {thirdCol.columnTitle}
                      </h6>
                    </div>
                    <div>
                      <ul className='flex flex-col space-y-4 '>
                        {thirdCol.col_links.length > 0 &&
                          thirdCol.col_links.map((item, i) => (
                            <li key={i}>
                              <Link href={item.link} passHref>
                                <a rel='noopener noreferrer'>
                                  <span className='cursor-pointer border-b border-transparent text-[15px] capitalize text-[#9A9A9A] hover:border-qblack hover:text-qblack'>
                                    {item.title}
                                  </span>
                                </a>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className='bottom-bar flex flex-col-reverse items-center justify-between border-t border-qgray-border
         lg:h-[82px] lg:flex-row'
        >
          <div className='mb-3 flex items-center justify-between space-x-2.5 rtl:space-x-reverse lg:space-x-5'>
            <div className='flex items-center space-x-5 rtl:space-x-reverse'>
              {socialLink &&
                socialLink.length > 0 &&
                socialLink.map((item, i) => (
                  <a key={i} href={item.link} target='_blank' rel='noreferrer'>
                    <FontAwesomeCom
                      className='h-4 w-4 text-qgray'
                      icon={item.icon}
                    />
                  </a>
                ))}
            </div>
            <span className='font-300 text-[10px] text-qgray sm:text-base'>
              CIPCC © 2021 All Rights Reserved
            </span>
          </div>
          {footerContent && footerContent.payment_image ? (
            <div className='mt-2 lg:mt-0'>
              <Link href='#' passHref>
                <a>
                  <Image
                    width='318'
                    height='28'
                    src='/assets/images/payment-getways.png'
                    alt='payment-getways'
                  />
                </a>
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </footer>
  );
}
