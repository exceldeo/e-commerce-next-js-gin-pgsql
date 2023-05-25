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
    return parseInt(item.Product.price) * item.qty;
  };

  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.checkout);

  useEffect(() => {
    console.log(checkout);
  }, [checkout]);

  return (
    <div className={`w-full ${className || ''}`}>
      <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
        <tbody>
          {Cart &&
            Cart.length > 0 &&
            Cart.map((item, index) => (
              <tr key={index} className='border-b bg-white hover:bg-gray-50'>
                {/* add checkbox */}
                <td className='text-center'>
                  <Checkbox
                    id={item.id}
                    name={item.slug}
                    handleChange={() => {
                      checkout.find(
                        (checkoutItem) => checkoutItem.id === item.id
                      )
                        ? dispatch(removeItemCheckout(item.id))
                        : dispatch(
                            addItemCheckout({
                              id: item.id,
                              qty: item.qty,
                              title: item.Product.title,
                              price: item.Product.price,
                            })
                          );
                    }}
                    checked={
                      checkout.find(
                        (checkoutItem) => checkoutItem.id === item.id
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
                        src={`${item.Product.thumbnail}`}
                        alt='product'
                        className='h-full w-full object-contain'
                      />
                    </div>
                    <div className='flex flex-1 flex-col'>
                      <Link
                        href={{
                          pathname: '/single-product',
                          query: { slug: item.slug },
                        }}
                      >
                        <p className='cursor-pointer text-[15px] font-medium text-qblack hover:text-blue-500'>
                          {item.Product.title}
                        </p>
                      </Link>
                    </div>
                  </div>
                </td>
                <td className='py-4 px-2 text-center'>
                  <div className='flex items-center justify-center space-x-1'>
                    <span className='text-[15px] font-normal'>
                      Rp. {formatMoney(item.Product.price)}
                    </span>
                  </div>
                </td>
                <td className=' py-4'>
                  <div className='flex items-center justify-center'>
                    <InputQuantityCom
                      decrementQty={decrementQty}
                      incrementQty={incrementQty}
                      calcTotalPrice={calCPriceDependQunatity}
                      productId={item.id}
                      qyt={parseInt(item.qty)}
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
                      onClick={() => handleDeleteItem(item.id)}
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
  );
}
