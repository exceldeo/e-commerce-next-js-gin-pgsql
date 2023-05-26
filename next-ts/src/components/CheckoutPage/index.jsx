import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import AddressForm from '../AddressForm';
import AddressList from '../AddressList';
import PageTitle from '../Helpers/PageTitle';
import ServeLangItem from '../Helpers/ServeLangItem';
import { useAddAddress, useGetAddress } from '../../api/address';
import { useCreateOrder } from '../../api/order';
import isAuth from '../../../Middleware/isAuth';
import { formatMoney } from '../../../utils/formatMoney.ts';
import wordCount from '../../../utils/wordCount';
import { useGetPayment } from '../../api/payment';
import PaymentList from '../PaymentList';

function CheckoutPage() {
  const [selectedPayment, setPayment] = useState(null);
  const [selectedShipping, setShipping] = useState(null);
  const router = useRouter();
  const { checkout } = useSelector((state) => state.checkout);

  const { data, isSuccess } = useGetAddress();

  useEffect(() => {
    if (isSuccess) {
      const address = data?.find((address) => address?.is_default === true);

      setShipping(address);
    }
  }, [isSuccess, data]);

  const { dataPayment, isSuccessPayment } = useGetPayment();

  useEffect(() => {
    if (isSuccessPayment) {
      const payment = dataPayment?.find(
        (payment) => payment?.is_default === true
      );

      setPayment(payment);
    }
  }, [isSuccessPayment, dataPayment]);

  const countSubTotal = useCallback(() => {
    if (checkout.length > 0) {
      return checkout.reduce((a, b) => {
        return a + b?.price * b?.qty;
      }, 0);
    }
    return 0;
  }, [checkout]);

  const createOrder = useCreateOrder();

  const createOrderHandler = () => {
    if (!selectedShipping) {
      toast.error(ServeLangItem()?.ErrMsg.not_select_shipping_address);
      return;
    }

    createOrder.mutate({
      shop_id: parseInt(checkout[0]?.shop_id),
      status: 0,
      orders_product: checkout.map((item) => ({
        product_id: parseInt(item.id),
        quantity: item.qty,
      })),
      orders_payment: {
        orders_payment_id: parseInt(selectedPayment?.id),
      },
      orders_address: {
        shipping_address_id: parseInt(selectedShipping?.id),
      },
    });
  };

  useEffect(() => {
    if (createOrder.isSuccess) {
      toast.success('Order created successfully');
      router.push('/');
    }
  }, [createOrder.isSuccess, router]);

  useEffect(() => {
    console.log(checkout);
  }, [checkout]);

  return (
    <>
      <div className='checkout-page-wrapper w-full bg-white pb-[60px]'>
        <div className='mb-5 w-full'>
          <PageTitle
            title='Checkout'
            breadcrumb={[
              { name: ServeLangItem()?.home, path: '/' },
              { name: ServeLangItem()?.Checkout, path: '/checkout' },
            ]}
          />
        </div>
        <div className='checkout-main-content w-full'>
          <div className='container-x mx-auto'>
            <div className='w-full rtl:space-x-reverse lg:flex lg:space-x-[30px]'>
              <div className='w-full lg:w-4/6'>
                <h1 className='mt-5 mb-5 text-xl font-medium text-qblack sm:text-2xl'>
                  {ServeLangItem()?.Addresses}
                </h1>

                <div className='addresses-widget w-full'>
                  <div className='mb-5 w-full items-center justify-between sm:flex'></div>
                  <AddressList />
                </div>
                <div className='w-full'>
                  <h1 className='mt-5 mb-5 text-xl font-medium text-qblack sm:text-2xl'>
                    Payment
                  </h1>

                  <div className='addresses-widget w-full'>
                    <div className='mb-5 w-full items-center justify-between sm:flex'></div>
                    <PaymentList />
                  </div>
                </div>
              </div>
              <div className='flex-1'>
                <h1 className='mt-5 mb-5 text-xl font-medium text-qblack sm:text-2xl'>
                  {ServeLangItem()?.Order_Summary}
                </h1>

                <div className='w-full border border-[#EDEDED] px-10 py-[30px]'>
                  <div className='sub-total mb-6'>
                    <div className=' mb-5 flex justify-between'>
                      <p className='text-[13px] font-medium uppercase text-qblack'>
                        {ServeLangItem()?.Product}
                      </p>
                      <p className='text-[13px] font-medium uppercase text-qblack'>
                        {ServeLangItem()?.total}
                      </p>
                    </div>
                    <div className='h-[1px] w-full bg-[#EDEDED]'></div>
                  </div>
                  <div className='product-list mb-[30px] w-full'>
                    <ul className='flex flex-col space-y-5'>
                      {checkout.length > 0 &&
                        checkout.map((item) => (
                          <li key={item.id}>
                            <div className='flex items-center justify-between'>
                              <div>
                                <h4
                                  title={item.title}
                                  className='mb-2.5 text-[15px] text-qblack line-clamp-1'
                                >
                                  {wordCount(`${item.title}`)}
                                  <sup className='ml-2 mt-2 text-[13px] text-qgray'>
                                    x{parseInt(item.qty)}
                                  </sup>
                                </h4>
                              </div>
                              <div>
                                <span
                                  suppressHydrationWarning
                                  className='text-[15px] font-medium text-qblack'
                                >
                                  Rp. {formatMoney(item.qty * item.price)}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className='h-[1px] w-full bg-[#EDEDED]'></div>

                  <div className='mt-[30px]'>
                    <div className=' mb-5 flex justify-between'>
                      <p className='text-2xl font-medium capitalize text-qblack'>
                        {ServeLangItem()?.total}
                      </p>
                      <p
                        suppressHydrationWarning
                        className='text-2xl font-medium text-qred'
                      >
                        Rp. {formatMoney(countSubTotal())}
                      </p>
                    </div>
                  </div>
                  <button
                    type='button'
                    onClick={createOrderHandler}
                    className='w-full'
                  >
                    <div className='black-btn flex h-[50px] w-full items-center justify-center'>
                      <span className='text-sm font-semibold'>
                        {ServeLangItem()?.Place_Order_Now}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default isAuth(CheckoutPage);
