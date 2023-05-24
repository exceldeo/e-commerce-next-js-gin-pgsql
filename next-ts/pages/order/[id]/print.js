import React, { useEffect, useState } from 'react';

import OrderCom from '../../../src/components/OrderCom';
import isAuth from '../../../Middleware/isAuth';
import OrderPrint from '../../../src/components/OrderPrint';
import { useRouter } from 'next/router';
import { useGetOrderById } from '../../../src/api/order';

const AuthPrint = isAuth(OrderPrint);

function OrderPrintPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: order } = useGetOrderById(id);

  const [imageLoad, setImageLoad] = useState(false);

  useEffect(() => {
    if (imageLoad && typeof window !== 'undefined') {
      const timeout = setTimeout(() => {
        window.print();
        window.close();
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [imageLoad]);

  return order ? (
    <div style={{
      zoom: '75%'
    }}>
      <AuthPrint
        order={order.data}
        handleOnLoad={(loaded) => {
          setImageLoad(loaded);
        }}
      />
    </div>
  ) : (
    'Loading ...'
  );
}
export default OrderPrintPage;
