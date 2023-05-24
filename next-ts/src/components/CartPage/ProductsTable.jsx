import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from '../Helpers/Checkbox';
import InputQuantityCom from '../Helpers/InputQuantityCom';
import RadioButton from '../Helpers/RadioButton';
import { addItemCheckout, removeItemCheckout } from '../../store/checkout.js';
import { formatMoney } from '../../../utils/formatMoney.ts';

export default function ProductsTable({
  className,
  cartItems,
  calCPriceDependQunatity,
  incrementQty,
  decrementQty,
  handleDeleteItem,
}) {
  const [Cart, setCart] = useState(null);
  const totalPriceCalc = (item) => {
    return parseInt(item.product.price) * item.cart.qty;
  };

  const groupByVendorId = (array) => {
    const grouped = array.reduce((groups, item) => {
      const val = item.product.vendor_id;
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
    return Object.keys(grouped).map((val) => {
      return grouped[val];
    });
  };
  useEffect(() => {
    setCart(groupByVendorId(cartItems));
  }, [cartItems]);
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.checkout);

  useEffect(() => {
    console.log(checkout);
  }, [checkout]);

  return (
    <div className={`w-full ${className || ''}`}>
      {Cart &&
        Cart.length > 0 &&
        Cart.map((item, index) => (
          <div
            key={index}
            className='relative mb-3 w-full overflow-x-auto rounded-md border'
          >
            <div className='flex items-center gap-1 px-4 py-3'>
              <RadioButton
                id={index}
                name='vendor_id'
                handleChange={() => {
                  item.every((item) =>
                    checkout.find(
                      (checkoutItem) =>
                        checkoutItem.id === item.product.id &&
                        checkoutItem.vendor_id === item.product.vendor_id
                    )
                  )
                    ? item.map((item) => {
                        dispatch(removeItemCheckout(item.product.id));
                      })
                    : item.map((item) => {
                        dispatch(removeItemCheckout(item.product.id));
                        dispatch(
                          addItemCheckout({
                            id: item.product.id,
                            vendor_id: item.product.vendor_id,
                            qty: item.cart.qty,
                            title: item.product.title,
                            price: item.product.price,
                          })
                        );
                      });
                }}
                checked={
                  // check if all item in checkout by vendor id
                  item.every((item) =>
                    checkout.find(
                      (checkoutItem) =>
                        checkoutItem.id === item.product.id &&
                        checkoutItem.vendor_id === item.product.vendor_id
                    )
                  )
                    ? true
                    : false
                }
                className='h-[13px] w-[13px] rounded-[2px] border-[#EDEDED]'
              />
              <p className='text-[15px] font-medium text-qblack'>Vendor name</p>
            </div>
            <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
              <tbody>
                {item &&
                  item.length > 0 &&
                  item.map((item, index) => (
                    <tr
                      key={index}
                      className='border-b bg-white hover:bg-gray-50'
                    >
                      {/* add checkbox */}
                      <td className='text-center'>
                        <Checkbox
                          id={item.product.id}
                          name={item.product.slug}
                          handleChange={() => {
                            checkout.find(
                              (checkoutItem) =>
                                checkoutItem.id === item.product.id
                            )
                              ? dispatch(removeItemCheckout(item.product.id))
                              : dispatch(
                                  addItemCheckout({
                                    id: item.product.id,
                                    vendor_id: item.product.vendor_id,
                                    qty: item.cart.qty,
                                    title: item.product.title,
                                    price: item.product.price,
                                  })
                                );
                          }}
                          checked={
                            checkout.find(
                              (checkoutItem) =>
                                checkoutItem.id === item.product.id
                            )
                              ? true
                              : false
                          }
                        />
                      </td>
                      <td className='w-[100px] py-4 '>
                        <div className='flex items-center space-x-6'>
                          <div className='relative flex h-[80px] w-[80px] items-center justify-center overflow-hidden border border-[#EDEDED]'>
                            <Image
                              layout='fill'
                              src={`${item.product.thumbnail}`}
                              alt='product'
                              className='h-full w-full object-contain'
                            />
                          </div>
                          <div className='flex flex-1 flex-col'>
                            <Link
                              href={{
                                pathname: '/single-product',
                                query: { slug: item.product.slug },
                              }}
                            >
                              <p className='cursor-pointer text-[15px] font-medium text-qblack hover:text-blue-500'>
                                {item.product.title}
                              </p>
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className='py-4 px-2 text-center'>
                        <div className='flex items-center justify-center space-x-1'>
                          <span className='text-[15px] font-normal'>
                            Rp. {formatMoney(item.product.price)}
                          </span>
                        </div>
                      </td>
                      <td className=' py-4'>
                        <div className='flex items-center justify-center'>
                          <InputQuantityCom
                            decrementQty={decrementQty}
                            incrementQty={incrementQty}
                            calcTotalPrice={calCPriceDependQunatity}
                            productId={item.product.id}
                            qyt={parseInt(item.cart.qty)}
                          />
                        </div>
                      </td>
                      <td className='py-4 text-right'>
                        <div className='flex items-center justify-center space-x-1'>
                          <span className='text-[15px] font-normal'>
                            Rp. {formatMoney(totalPriceCalc(item))}
                          </span>
                        </div>
                      </td>
                      <td className='py-4 text-right'>
                        <div className='flex items-center justify-center space-x-1'>
                          <span
                            onClick={() => handleDeleteItem(item.product.id)}
                            className='cursor-pointer'
                          >
                            <svg
                              width='10'
                              height='10'
                              viewBox='0 0 10 10'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z'
                                fill='#AAAAAA'
                              />
                            </svg>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
}
