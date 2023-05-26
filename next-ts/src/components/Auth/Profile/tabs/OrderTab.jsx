import Link from 'next/link';
import React, { useState } from 'react';

import DateFormat from '../../../../../utils/DateFormat';
import { useGetAllOrders, useUpdateOrder } from '../../../../api/order';
import ServeLangItem from '../../../Helpers/ServeLangItem';

const status = [
  { key: 0, value: 'Waiting for payment' },
  { key: 1, value: 'Requested' },
  { key: 2, value: 'Rejected' },
  { key: 3, value: 'Delived' },
  { key: 4, value: 'Completed' },
];

export default function OrderTab() {
  const [orderStatus, setOrderStatus] = useState('');
  const { data: orders } = useGetAllOrders(orderStatus);

  const updateOrder = useUpdateOrder();

  const handleUpdateOrder = (item) => {
    updateOrder.mutate(item);
  };

  const [isDetail, setIsDetail] = useState(false);

  const [detail, setDetail] = useState(null);

  return (
    <>
      {!isDetail ? (
        <div className='relative w-full space-y-4 overflow-x-auto sm:rounded-lg'>
          <div className='flex space-x-4'>
            {status.map((item) => (
              <div
                key={item.key}
                className={`cursor-pointer rounded-full py-2 px-4 text-center font-bold text-qblack ${
                  orderStatus === item.key ? 'bg-qyellow' : 'bg-qgray-border'
                }`}
                onClick={() => setOrderStatus(item.key)}
              >
                {item.value}
              </div>
            ))}
          </div>
          <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
            <tbody>
              {/* table heading */}
              <tr className='default-border-bottom whitespace-nowrap border-b px-2 text-base text-qgray '>
                <td className='whitespace-nowrap py-4 text-center'>
                  {ServeLangItem()?.Date}
                </td>
                <td className='whitespace-nowrap py-4 text-center'>
                  {ServeLangItem()?.Status}
                </td>
                <td className='whitespace-nowrap py-4  text-center'>
                  {ServeLangItem()?.Action}
                </td>
              </tr>
              {/* table heading end */}
              {orders &&
                orders.data.datas.length > 0 &&
                orders.data.datas.map((item, i) => (
                  <tr key={i} className='border-b bg-white hover:bg-gray-50'>
                    <td className='py-4 px-2 text-center'>
                      <span className='whitespace-nowrap text-base  text-qgray'>
                        {DateFormat(item.created_at)}
                      </span>
                    </td>
                    <td className='py-4 px-2 text-center'>
                      {item.status === 0 ? (
                        <span className='rounded bg-green-100 p-2 text-sm text-green-500'>
                          Waiting for payment
                        </span>
                      ) : item.status === 1 ? (
                        <span className='rounded bg-yellow-100 p-2 text-sm text-yellow-500'>
                          Requested
                        </span>
                      ) : item.status === 2 ? (
                        <span className='rounded bg-red-100 p-2 text-sm text-white'>
                          Rejected
                        </span>
                      ) : item.status === 3 ? (
                        <span className='rounded bg-green-100 p-2 text-sm text-green-500'>
                          Delived
                        </span>
                      ) : (
                        <span className='rounded bg-green-100 p-2 text-sm text-green-500'>
                          Completed
                        </span>
                      )}
                    </td>

                    <td className='flex justify-center py-4'>
                      <div className='flex items-center space-x-2 rtl:space-x-reverse'>
                        {item.status === 0 && (
                          <button onClick={() => handleUpdateOrder(item)}>
                            <div className='flex h-[46px] w-[116px] cursor-pointer items-center justify-center bg-green-400 font-bold text-white'>
                              <span>Payment</span>
                            </div>
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setIsDetail(true);
                            setDetail(item);
                          }}
                        >
                          <div className='flex h-[46px] w-[116px] cursor-pointer items-center justify-center bg-qyellow font-bold text-qblack'>
                            <span>{ServeLangItem()?.View_Details}</span>
                          </div>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='relative w-full space-y-4 overflow-x-auto sm:rounded-lg'>
          <button
            onClick={() => setIsDetail(false)}
            className='absolute top-0 right-0 mt-4 mr-4 rounded-lg bg-qyellow px-4 py-2 text-qblack'
          >
            Back
          </button>
          <div className='flex space-x-4'>
            {detail?.created_at && (
              <div className='cursor-pointer rounded-full bg-qgray-border py-2 px-4 text-center font-bold text-qblack'>
                {DateFormat(detail?.created_at)}
              </div>
            )}

            {detail?.status === 0 ? (
              <div className='cursor-pointer rounded-full bg-qgray-border py-2 px-4 text-center font-bold text-qblack'>
                Waitting for payment
              </div>
            ) : detail?.status === 1 ? (
              <div className='cursor-pointer rounded-full bg-qgray-border py-2 px-4 text-center font-bold text-qblack'>
                Requested
              </div>
            ) : detail?.status === 2 ? (
              <div className='cursor-pointer rounded-full bg-qgray-border py-2 px-4 text-center font-bold text-qblack'>
                Rejected
              </div>
            ) : detail?.status === 3 ? (
              <div className='cursor-pointer rounded-full bg-qgray-border py-2 px-4 text-center font-bold text-qblack'>
                Delived
              </div>
            ) : (
              <div className='cursor-pointer rounded-full bg-qgray-border py-2 px-4 text-center font-bold text-qblack'>
                Completed
              </div>
            )}
          </div>
          <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
            <tbody>
              {/* table heading */}
              <tr className='default-border-bottom whitespace-nowrap border-b px-2 text-base text-qgray '>
                <td className='whitespace-nowrap py-4 text-center'>
                  {ServeLangItem()?.Product}
                </td>
                <td className='whitespace-nowrap py-4 text-center'>Quantity</td>
                <td className='whitespace-nowrap py-4 text-center'>
                  {ServeLangItem()?.Price}
                </td>
              </tr>
              {/* table heading end */}
              {detail?.OrdersProduct &&
                detail?.OrdersProduct.length > 0 &&
                detail?.OrdersProduct.map((item, i) => (
                  <tr key={i} className='border-b bg-white hover:bg-gray-50'>
                    <td className='py-4 px-2 text-center'>
                      <span className='whitespace-nowrap text-base  text-qgray'>
                        {item?.title}
                      </span>
                    </td>
                    <td className='py-4 px-2 text-center'>
                      <span className='whitespace-nowrap text-base  text-qgray'>
                        {item?.qty}
                      </span>
                    </td>
                    <td className='py-4 px-2 text-center'>
                      <span className='whitespace-nowrap text-base  text-qgray'>
                        {item?.price}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
