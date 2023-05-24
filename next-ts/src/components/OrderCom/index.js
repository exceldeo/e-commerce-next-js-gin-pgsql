import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import Breadcrumb from '../BreadcrumbCom';
import ServeLangItem from '../Helpers/ServeLangItem';
import { useGetOrderById } from '../../api/order';
import isAuth from '../../../Middleware/isAuth';
import { formatMoney } from '../../../utils/formatMoney.ts';
import OrderPrint from '../OrderPrint';

function OrderCom() {
  const router = useRouter();
  const { id } = router.query;

  const { data: order } = useGetOrderById(id);

  const countSubTotal = useCallback(() => {
    if (order?.data.order_products.length > 0) {
      return order?.data.order_products.reduce((a, b) => {
        return a + b?.price * b?.quantity;
      }, 0);
    }
    return 0;
  }, [order?.data]);

  const countAddedPrice = useCallback(() => {
    if (order?.data.order_added_prices.length > 0) {
      return order?.data.order_added_prices.reduce((a, b) => {
        return a + b?.price;
      }, 0);
    }
    return 0;
  }, [order?.data]);

  return (
    <>
      <div className='order-tracking-wrapper w-full'>
        <div className='container-x mx-auto'>
          <Breadcrumb
            paths={[
              { name: ServeLangItem()?.home, path: '/' },
              { name: ServeLangItem()?.Order, path: `/order/${id}` },
            ]}
          />
          {order && (
            <div className='py-auto relative h-[168px] w-full rounded-2xl bg-[#CBECFF] print:hidden'>
              <div className='py-auto flex h-full w-full justify-center space-x-[90px] rtl:space-x-reverse lg:space-x-[373px]'>
                <div className='relative'>
                  <div className='relative top-[50px] z-20 h-[30px] w-[30px] rounded-full border-[8px] border-qyellow bg-white'></div>
                  <p className='font-400 absolute -left-4 top-[90px] text-sm sm:text-base'>
                    {ServeLangItem()?.Pending}
                  </p>
                  <div
                    className={`absolute top-[60px] z-10 h-[8px] w-[100px] ltr:-left-[92px] rtl:-right-[92px] lg:w-[400px] ltr:lg:-left-[390px] rtl:lg:-right-[390px]  ${
                      order.data.order.status === 'po_accepted' ||
                      order.data.order.status === 'confirmed'
                        ? 'bg-qyellow'
                        : 'bg-white'
                    }`}
                  ></div>
                </div>
                <div className='relative'>
                  <div
                    className={`relative top-[50px] z-20 h-[30px] w-[30px]  rounded-full border-[8px] bg-white ${
                      order.data.order.status === 'confirmed' ||
                      order.data.order.status === 'po_accepted'
                        ? 'border-qyellow'
                        : 'border-qgray'
                    }`}
                  ></div>
                  <div
                    className={`absolute top-[60px] z-10 h-[8px] w-[100px] ltr:-left-[92px] rtl:-right-[92px] lg:w-[400px] ltr:lg:-left-[390px] rtl:lg:-right-[390px]  ${
                      order.data.order.status === 'po_accepted'
                        ? 'bg-qyellow'
                        : 'bg-white'
                    }`}
                  ></div>
                  <p className='font-400 absolute  -left-4 top-[90px] text-sm sm:text-base'>
                    {ServeLangItem()?.Confirm}
                  </p>
                </div>
                <div className='relative'>
                  <div
                    className={`relative top-[50px] z-20 h-[30px] w-[30px] rounded-full  border-[8px] bg-white ${
                      order.data.order.status === 'po_accepted'
                        ? 'border-qyellow'
                        : 'border-qgray'
                    }`}
                  ></div>
                  <p className='font-400 absolute -left-4 top-[90px] text-sm sm:text-base'>
                    {ServeLangItem()?.PO_Accepted}
                  </p>
                </div>
              </div>
            </div>
          )}
          {order && (
            <OrderPrint order={order.data} />
            // <div id='printSection' className='mt-4 '>
            //   <div className='mb-4 items-center justify-between sm:flex'>
            //     <div>
            //       <h1 className='mb-2.5 text-[26px] font-semibold text-qblack'>
            //         {order.data.order_address &&
            //           order.data.order_address.address.name}
            //       </h1>
            //       <ul className='flex flex-col space-y-0.5'>
            //         <li className='text-[22px]n text-[#4F5562]'>
            //           {ServeLangItem()?.Purchase_Code}:{' '}
            //           <span className='text-[#27AE60]'>
            //             {order.data.order.purchase_code}
            //           </span>
            //         </li>
            //         <li className='text-[22px]n text-[#4F5562]'>
            //           {ServeLangItem()?.Billing_Address}:{' '}
            //           <span className='text-[#27AE60]'>{`${
            //             order.data.order_address &&
            //             order.data.order_address.address.address_detail
            //           },${
            //             order.data.order_address &&
            //             order.data.order_address.city.name
            //           },${
            //             order.data.order_address &&
            //             order.data.order_address.province.name
            //           }`}</span>
            //         </li>
            //         <li className='text-[22px]n text-[#4F5562]'>
            //           {ServeLangItem()?.Shipping_Address}:{' '}
            //           <span className='text-[#27AE60]'>{`${
            //             order.data.invoice_address &&
            //             order.data.invoice_address.address.address_detail
            //           },${
            //             order.data.invoice_address &&
            //             order.data.invoice_address.city.name
            //           },${
            //             order.data.invoice_address &&
            //             order.data.invoice_address.province.name
            //           }`}</span>
            //         </li>
            //       </ul>
            //     </div>
            //     {/* <div>
            //       <button
            //         onClick={print}
            //         type='button'
            //         className='mt-5 flex h-[52px] w-[161px] items-center justify-center space-x-2.5 rounded bg-qyellow rtl:space-x-reverse print:hidden sm:mt-0'
            //       >
            //         <span>
            //           <svg
            //             width='27'
            //             height='26'
            //             viewBox='0 0 27 26'
            //             fill='none'
            //             xmlns='http://www.w3.org/2000/svg'
            //           >
            //             <path
            //               d='M24.9 6.10885H22.0364V0.900017C22.0364 0.402996 21.6334 0 21.1364 0H5.86364C5.36662 0 4.96362 0.402943 4.96362 0.900017V6.10885H2.09999C0.942047 6.10885 0 7.05095 0 8.2089V17.2635C0 18.4214 0.942047 19.3635 2.09999 19.3635H4.96378V24.1947C4.96378 24.6917 5.36672 25.0947 5.8638 25.0947H21.1362C21.6332 25.0947 22.0362 24.6918 22.0362 24.1947V19.3635H24.9C26.058 19.3635 27 18.4214 27 17.2635V8.2089C27 7.05101 26.058 6.10885 24.9 6.10885ZM6.76361 1.80004H20.2363V6.10885H6.76361V1.80004ZM20.2362 23.2947H6.76382C6.76382 23.1188 6.76382 16.149 6.76382 15.9315H20.2362C20.2362 16.1545 20.2362 23.1256 20.2362 23.2947ZM21.1364 11.3936H18.8454C18.3484 11.3936 17.9454 10.9907 17.9454 10.4936C17.9454 9.99654 18.3483 9.5936 18.8454 9.5936H21.1364C21.6334 9.5936 22.0364 9.99654 22.0364 10.4936C22.0364 10.9907 21.6334 11.3936 21.1364 11.3936Z'
            //               fill='#222222'
            //             />
            //           </svg>
            //         </span>
            //         <span className='text-sm text-qblack'>
            //           {ServeLangItem()?.Print_PDF}
            //         </span>
            //       </button>
            //     </div> */}
            //   </div>
            //   <div className='overflow-style-none relative mb-10 box-border w-full overflow-x-auto border border-[#EDEDED]'>
            //     <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
            //       <tbody>
            //         {/* table heading */}
            //         <tr className='default-border-bottom whitespace-nowrap border-b bg-[#F6F6F6] px-2 text-[13px] font-medium uppercase text-black'>
            //           <td className=' block w-[380px] whitespace-nowrap py-4 ltr:pl-10 rtl:pr-10  rtl:text-right'>
            //             {ServeLangItem()?.Product}
            //           </td>
            //           <td className='whitespace-nowrap py-4  text-center'>
            //             {ServeLangItem()?.quantity}
            //           </td>
            //           <td className='whitespace-nowrap py-4 text-center'>
            //             {ServeLangItem()?.Price}
            //           </td>
            //           <td className='whitespace-nowrap py-4 text-center capitalize'>
            //             {ServeLangItem()?.SUBTOTAL}
            //           </td>
            //         </tr>
            //         {/* table heading end */}
            //         {order &&
            //           order.data.order_products.length > 0 &&
            //           order.data.order_products.map((item, i) => (
            //             <tr
            //               key={i}
            //               className='border-b bg-white hover:bg-gray-50'
            //             >
            //               <td className='w-[400px] py-4 pl-10 '>
            //                 <div className='flex items-center space-x-6'>
            //                   <div className='flex flex-1 flex-col'>
            //                     <p className='text-[15px] font-medium text-qblack rtl:pr-10 rtl:text-right'>
            //                       {item.title}
            //                     </p>
            //                   </div>
            //                 </div>
            //               </td>
            //               <td className=' py-4'>
            //                 <div className='flex items-center justify-center'>
            //                   <div className='flex h-[40px] w-[54px] items-center justify-center border border-qgray-border'>
            //                     <span>{item.quantity}</span>
            //                   </div>
            //                 </div>
            //               </td>
            //               <td className='py-4 px-2 text-center'>
            //                 <div className='flex items-center justify-center space-x-1'>
            //                   <span className='text-[15px] font-normal'>
            //                     <span>Rp. </span>
            //                     <span>{formatMoney(item.price)}</span>
            //                   </span>
            //                 </div>
            //               </td>
            //               <td className='py-4 px-2 text-center'>
            //                 <div className='flex items-center justify-center space-x-1'>
            //                   <span className='text-[15px] font-normal'>
            //                     <span>Rp. </span>
            //                     <span>
            //                       {formatMoney(item.price * item.quantity)}
            //                     </span>
            //                   </span>
            //                 </div>
            //               </td>
            //               <td className='py-4 px-2 text-center print:hidden'></td>
            //             </tr>
            //           ))}
            //       </tbody>
            //     </table>
            //   </div>
            //   <div className='flex justify-center print:justify-end sm:mr-10 sm:justify-end'>
            //     <div>
            //       <div className='mb-1 flex w-[200px] justify-between font-semibold'>
            //         <p className='text-sm capitalize text-qblack'>
            //           {ServeLangItem()?.SUBTOTAL}
            //         </p>
            //         <p className='text-sm text-qblack'>
            //           <span>Rp. </span>
            //           <span>{formatMoney(countSubTotal())}</span>
            //         </p>
            //       </div>
            //       {order &&
            //         order.data.order_added_prices.length > 0 &&
            //         order.data.order_added_prices.map((item, i) => (
            //           <div
            //             key={i}
            //             className='flex w-[200px] justify-between font-semibold'
            //           >
            //             <p className='text-sm capitalize text-qblack'>
            //               {item.description}
            //             </p>
            //             <p className='text-sm text-qblack'>
            //               <span>Rp. </span>
            //               <span>{formatMoney(item.price)}</span>
            //             </p>
            //           </div>
            //         ))}
            //       <div className='mt-4 h-[1px] w-full bg-qgray-border'></div>
            //       <div className='mt-4 flex w-[200px] justify-between font-semibold'>
            //         <p className='text-lg text-qblack'>
            //           {ServeLangItem()?.Total_Paid}
            //         </p>
            //         <p className='text-lg text-qblack'>
            //           <span>Rp. </span>
            //           <span>
            //             {formatMoney(countAddedPrice() + countSubTotal())}
            //           </span>
            //         </p>
            //       </div>
            //     </div>
            //   </div>
            // </div>
          )}

          {/* <div className='rounded-xl bg-white p-3 lg:p-10'></div> */}
          {order && (
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && id) {
                  window.open(
                    `${id}/print`,
                    'PRINT',
                    'height=650,width=900,top=100,left=150'
                  );
                }
              }}
              type='button'
              className='mt-5 flex h-[52px] w-[161px] items-center justify-center space-x-2.5 rounded bg-qyellow rtl:space-x-reverse print:hidden sm:mt-0'
            >
              <span>
                <svg
                  width='27'
                  height='26'
                  viewBox='0 0 27 26'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M24.9 6.10885H22.0364V0.900017C22.0364 0.402996 21.6334 0 21.1364 0H5.86364C5.36662 0 4.96362 0.402943 4.96362 0.900017V6.10885H2.09999C0.942047 6.10885 0 7.05095 0 8.2089V17.2635C0 18.4214 0.942047 19.3635 2.09999 19.3635H4.96378V24.1947C4.96378 24.6917 5.36672 25.0947 5.8638 25.0947H21.1362C21.6332 25.0947 22.0362 24.6918 22.0362 24.1947V19.3635H24.9C26.058 19.3635 27 18.4214 27 17.2635V8.2089C27 7.05101 26.058 6.10885 24.9 6.10885ZM6.76361 1.80004H20.2363V6.10885H6.76361V1.80004ZM20.2362 23.2947H6.76382C6.76382 23.1188 6.76382 16.149 6.76382 15.9315H20.2362C20.2362 16.1545 20.2362 23.1256 20.2362 23.2947ZM21.1364 11.3936H18.8454C18.3484 11.3936 17.9454 10.9907 17.9454 10.4936C17.9454 9.99654 18.3483 9.5936 18.8454 9.5936H21.1364C21.6334 9.5936 22.0364 9.99654 22.0364 10.4936C22.0364 10.9907 21.6334 11.3936 21.1364 11.3936Z'
                    fill='#222222'
                  />
                </svg>
              </span>
              <span className='text-sm text-qblack'>
                {ServeLangItem()?.Print_PDF}
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default isAuth(OrderCom);
