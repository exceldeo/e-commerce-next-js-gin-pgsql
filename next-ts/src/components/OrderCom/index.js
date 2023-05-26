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
    if (order?.data.OrdersProduct.length > 0) {
      return order?.data.OrdersProduct.reduce((a, b) => {
        return a + b?.price * b?.quantity;
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
          <div className='order-tracking-content rounded bg-white p-5 '>
            <div className='order-tracking-content__left'>
              <div className='order-tracking-content__left__title'>
                {ServeLangItem()?.Order}
              </div>
              {order?.data?.OrdersProduct?.map((item, index) => (
                <div className='order-tracking-content__left__item' key={index}>
                  <div className='order-tracking-content__left__item__img'>
                    <img src={item?.Product?.image} alt='' />
                  </div>
                  <div className='order-tracking-content__left__item__info'>
                    <div className='order-tracking-content__left__item__info__name'>
                      {item?.Product?.name}
                    </div>
                    <div className='order-tracking-content__left__item__info__price'>
                      {formatMoney(item?.price)}
                    </div>
                    <div className='order-tracking-content__left__item__info__quantity'>
                      {item?.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default isAuth(OrderCom);
