import Link from 'next/link';
import React, { useState } from 'react';

import DateFormat from '../../../../../utils/DateFormat';
import { useGetAllOrders } from '../../../../api/order';
import ServeLangItem from '../../../Helpers/ServeLangItem';

const status = [
  { key: 'requested', value: 'Requested' },
  { key: 'confirmed', value: 'Confirmed' },
  { key: 'po_accepted', value: 'PO Accepted' },
];

export default function OrderTab() {
  const [orderStatus, setOrderStatus] = useState('');
  const { data: orders } = useGetAllOrders(orderStatus);

  return (
    <>
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
              <td className='block whitespace-nowrap py-4 text-center'>
                {ServeLangItem()?.Order}
              </td>
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
              orders.data.orders.length > 0 &&
              orders.data.orders.map((item, i) => (
                <tr key={i} className='border-b bg-white hover:bg-gray-50'>
                  <td className='py-4 text-center'>
                    <span className='text-lg font-medium text-qgray'>
                      {item.purchase_code}
                    </span>
                  </td>
                  <td className='py-4 px-2 text-center'>
                    <span className='whitespace-nowrap text-base  text-qgray'>
                      {DateFormat(item.created_at)}
                    </span>
                  </td>
                  <td className='py-4 px-2 text-center'>
                    {item.status === 'requested' ? (
                      <span className='rounded bg-green-100 p-2 text-sm text-green-500'>
                        {item.status}
                      </span>
                    ) : (
                      <span className='rounded bg-yellow-100 p-2 text-sm text-yellow-500'>
                        {item.status}
                      </span>
                    )}
                  </td>

                  <td className='flex justify-center py-4'>
                    <div className='flex items-center space-x-2 rtl:space-x-reverse'>
                      <Link href={`/order/${item.id}`}>
                        <div className='flex h-[46px] w-[116px] cursor-pointer items-center justify-center bg-qyellow font-bold text-qblack'>
                          <span>{ServeLangItem()?.View_Details}</span>
                        </div>
                      </Link>
                      {/*{item.order_status === "0" && (*/}
                      {/*  <button*/}
                      {/*    type="button"*/}
                      {/*    className="text-green-500 text-sm font-semibold"*/}
                      {/*  >*/}
                      {/*    Review*/}
                      {/*  </button>*/}
                      {/*)}*/}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
