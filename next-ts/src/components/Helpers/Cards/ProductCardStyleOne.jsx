import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ServeLangItem from '../ServeLangItem';
import auth from '../../../../utils/auth';
import { formatMoney } from '../../../../utils/formatMoney.ts';
import { useAddToCart } from '../../../api/cart';
import { useRouter } from 'next/router';

export default function ProductCardStyleOne({ datas }) {
  const isAuth = auth();
  const router = useRouter();

  const [price] = useState(datas.price);
  const [imgSrc, setImgSrc] = useState(null);

  const loadImg = (value) => {
    setImgSrc(value);
  };

  const addToCart = useAddToCart();

  const handleAddToCart = (id) => {
    if (!isAuth) {
      toast.error(ServeLangItem()?.Item_Added_To_Cart);
      return;
    }
    addToCart.mutate({
      id: id,
      qty: 1,
    });
  };

  useEffect(() => {
    if (addToCart.isSuccess) {
      toast.success(ServeLangItem()?.Item_Added_To_Cart);
    }
  }, [addToCart.isSuccess]);

  useEffect(() => {
    if (addToCart.isError) {
      toast.error(addToCart.error.response.message);
    }
  }, [addToCart.isError]);

  useEffect(() => {
    console.log('datas', datas);
  }, [datas]);

  return (
    <div className='main-wrapper-card relative'>
      <div
        className='product-card-one group relative h-[340px] w-full overflow-hidden bg-white'
        style={{ boxShadow: '0px 15px 64px 0px rgba(0, 0, 0, 0.05)' }}
      >
        <div className='product-card-img -mt-2 h-[180px] w-full'>
          <div className='relative flex h-full w-full scale-100 transform items-center justify-center transition duration-300 ease-in-out group-hover:scale-110'>
            <Image
              layout='fill'
              objectFit='scale-down'
              src={`${imgSrc ? imgSrc : '/assets/images/spinner.gif'}`}
              alt=''
              onLoadingComplete={() => loadImg(datas.thumbnail)}
              className='h-full w-full object-contain'
            />
          </div>
        </div>
        <div className='product-card-details relative px-[30px] pb-[30px] pt-2'>
          <div className='absolute left-0 top-40 h-10 w-full px-[30px] transition-all duration-300 ease-in-out group-hover:top-[85px]'>
            <button
              onClick={() => handleAddToCart(datas.id)}
              type='button'
              className='yellow-btn group relative flex h-full w-full items-center  justify-center overflow-hidden shadow'
            >
              <div className='btn-content relative z-10 flex items-center space-x-3 rtl:space-x-reverse'>
                <span>
                  <svg
                    width='14'
                    height='16'
                    viewBox='0 0 14 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='fill-current'
                  >
                    <path d='M12.5664 4.14176C12.4665 3.87701 12.2378 3.85413 11.1135 3.85413H10.1792V3.43576C10.1792 2.78532 10.089 2.33099 9.86993 1.86359C9.47367 1.01704 8.81003 0.425438 7.94986 0.150881C7.53106 0.0201398 6.90607 -0.0354253 6.52592 0.0234083C5.47246 0.193372 4.57364 0.876496 4.11617 1.85052C3.89389 2.32772 3.80368 2.78532 3.80368 3.43576V3.8574H2.8662C1.74187 3.8574 1.51313 3.88028 1.41326 4.15483C1.36172 4.32807 0.878481 8.05093 0.6723 9.65578C0.491891 11.0547 0.324369 12.3752 0.201948 13.3688C-0.0106763 15.0815 -0.00423318 15.1077 0.00220999 15.1371V15.1404C0.0312043 15.2515 0.317925 15.5424 0.404908 15.6274L0.781834 16H13.1785L13.4588 15.7483C13.5844 15.6339 14 15.245 14 15.0521C14 14.9214 12.5922 4.21694 12.5664 4.14176ZM12.982 14.8037C12.9788 14.8266 12.953 14.8952 12.9079 14.9443L12.8435 15.0162H1.13943L0.971907 14.8331L1.63233 9.82901C1.86429 8.04766 2.07047 6.4951 2.19289 5.56684C2.24766 5.16154 2.27343 4.95563 2.28631 4.8543C2.72123 4.85103 4.62196 4.84776 6.98661 4.84776H11.6901L11.6966 4.88372C11.7481 5.1452 12.9594 14.5128 12.982 14.8037ZM4.77338 3.8574V3.48479C4.77338 3.23311 4.80559 2.88664 4.84103 2.72649C5.03111 1.90935 5.67864 1.24584 6.48726 1.03339C6.82553 0.948403 7.37964 0.97782 7.71791 1.10202H7.72113C8.0755 1.22296 8.36545 1.41907 8.63284 1.71978C9.06453 2.19698 9.2095 2.62516 9.2095 3.41615V3.8574H4.77338Z' />
                  </svg>
                </span>
                <span>{ServeLangItem()?.Add_To_Cart}</span>
              </div>
              <div className='bg-shape absolute h-full w-full  bg-qblack'></div>
            </button>
          </div>
          <Link
            href={{
              pathname: '/single-product',
              query: { slug: datas.slug },
            }}
            passHref
          >
            <a rel='noopener noreferrer'>
              <p className='title font-600 mb-2 cursor-pointer text-[15px] leading-[24px] text-qblack line-clamp-2 hover:text-blue-600'>
                {datas.title}
              </p>
            </a>
          </Link>
          <p className='price'>
            <span
              suppressHydrationWarning
              className='main-price  font-600 text-[18px]'
            >
              Rp. {formatMoney(price)}
            </span>
          </p>
          {/* shop name
           */}
          <div className='shop-name flex items-center space-x-2'>
            <span className='font-500 text-[12px] text-qblack'>
              {datas.shop?.name}
            </span>
            <span className='font-500 text-[12px] text-qblack'>
              {datas.shop?.city}
            </span>
          </div>
        </div>
        <div className='quick-access-btns flex flex-col space-y-2'></div>
      </div>
      <span className='anim bottom'></span>
      <span className='anim right'></span>
      <span className='anim top'></span>
      <span className='anim left'></span>
    </div>
  );
}
