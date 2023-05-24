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
import { useAddAddress } from '../../api/address';
import { useCreateOrder } from '../../api/order';
import isAuth from '../../../Middleware/isAuth';
import { formatMoney } from '../../../utils/formatMoney.ts';
import wordCount from '../../../utils/wordCount';

function CheckoutPage() {
  const [activeAddress, setActiveAddress] = useState('billing');
  const [newAddress, setNewAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [selectedShipping, setShipping] = useState(null);
  const [selectedBilling, setBilling] = useState(null);
  const router = useRouter();
  const { checkout } = useSelector((state) => state.checkout);

  const countSubTotal = useCallback(() => {
    if (checkout.length > 0) {
      return checkout.reduce((a, b) => {
        return a + b?.price * b?.qty;
      }, 0);
    }
    return 0;
  }, [checkout]);

  const addAddress = useAddAddress();
  const newAddressForm = useFormik({
    initialValues: {
      name: '',
      province: '',
      city: '',
      district: '',
      village: '',
      address: '',
      zip_code: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      province: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      district: Yup.string().required('Required'),
      village: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      zip_code: Yup.string().length(5, 'Must be 5 characters').required(),
    }),
    onSubmit: (values) => {
      addAddress.mutate(values);
    },
  });

  useEffect(() => {
    if (addAddress.isSuccess) {
      newAddressForm.resetForm();
      toast.success('Address added successfully');
      setNewAddress(!newAddress);
    }
  }, [addAddress.isSuccess, newAddress, newAddressForm]);

  if (addAddress.isError) {
    toast.error(
      addAddress?.error?.response?.data?.message ?? addAddress.error.message
    );
  }

  const createOrder = useCreateOrder();

  const createOrderHandler = () => {
    if (!selectedShipping) {
      toast.error(ServeLangItem()?.ErrMsg.not_select_shipping_address);
      return;
    }

    if (!selectedBilling) {
      toast.error(ServeLangItem()?.ErrMsg.not_select_billing_address);
      return;
    }

    createOrder.mutate({
      order_items: checkout.map((item) => ({
        product_id: item.id,
        quantity: item.qty,
        notes: 'notes',
      })),
      term_of_sales: 'exw',
      subject: 'test',
      province_code: selectedShipping.province_code,
      city_code: selectedShipping.city_code,
      district_code: selectedShipping.district_code,
      village_code: selectedShipping.village_code,
      zip_code: selectedShipping.zip_code,
      latitude: 0,
      longitude: 0,
      address_detail: selectedShipping.address_detail,
      name: selectedShipping.name,
      shipping_name: selectedBilling.name,
      shipping_phone: '08123456789',
      invoice_province_code: selectedBilling.province_code,
      invoice_city_code: selectedBilling.city_code,
      invoice_district_code: selectedBilling.district_code,
      invoice_village_code: selectedBilling.village_code,
      invoice_zip_code: selectedBilling.zip_code,
      invoice_latitude: 0,
      invoice_longitude: 0,
      invoice_address_detail: selectedBilling.address_detail,
      invoice_name: selectedBilling.name,
      invoice_shipping_name: selectedBilling.name,
      invoice_shipping_phone: '08123456789',
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
                {newAddress ? (
                  <AddressForm toggle={newAddress} setToggle={setNewAddress} />
                ) : editAddress ? (
                  <AddressForm
                    toggle={editAddress}
                    setToggle={setEditAddress}
                    edited
                  />
                ) : (
                  <div className='addresses-widget w-full'>
                    <div className='mb-5 w-full items-center justify-between sm:flex'>
                      <div className='rounded border border-qyellow bg-[#FFFAEF] p-2'>
                        <button
                          onClick={() => setActiveAddress('billing')}
                          type='button'
                          className={`text-md rounded-md px-4 py-3 font-medium  ${
                            activeAddress === 'billing'
                              ? 'bg-qyellow text-qblack'
                              : 'text-qyellow'
                          } `}
                        >
                          {ServeLangItem()?.Billing_Address}
                        </button>
                        <button
                          onClick={() => setActiveAddress('shipping')}
                          type='button'
                          className={`text-md ml-1 rounded-md px-4 py-3 font-medium ${
                            activeAddress === 'shipping'
                              ? 'bg-qyellow text-qblack'
                              : 'text-qyellow'
                          } `}
                        >
                          {ServeLangItem()?.Shipping_Address}
                        </button>
                      </div>

                      <button
                        onClick={() => setNewAddress(!newAddress)}
                        type='button'
                        className='mt-2 h-[40px] w-[100px] border border-qblack transition-all duration-300 ease-in-out hover:bg-qblack hover:text-white sm:mt-0'
                      >
                        <span className='text-sm font-semibold'>
                          {ServeLangItem()?.Add_New}
                        </span>
                      </button>
                    </div>
                    {activeAddress === 'billing' ? (
                      <AddressList
                        selected={selectedBilling}
                        setSelected={setBilling}
                        setEdit={setEditAddress}
                      />
                    ) : (
                      <AddressList
                        selected={selectedShipping}
                        setSelected={setShipping}
                        setEdit={setEditAddress}
                      />
                    )}
                  </div>
                )}
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
