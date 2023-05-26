import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ServeLangItem from '../Helpers/ServeLangItem';
import { useAddToCart } from '../../api/cart';
import { formatMoney } from '../../../utils/formatMoney.ts';
import auth from '../../../utils/auth';

export default function ProductView({
  className,
  images = [],
  product,
  category,
  brand,
}) {
  const isAuth = auth();
  const [more, setMore] = useState(false);
  const productsImg = images && images.length > 0 && images;

  const [src, setSrc] = useState(product.thumbnail);

  const changeImgHandler = (current) => {
    setSrc(current);
  };
  const [quantity, setQuantity] = useState(1);
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addToCart = useAddToCart();

  const addToCard = () => {
    if (!isAuth) {
      toast.error(ServeLangItem()?.Item_Added_To_Cart);
      return;
    }

    addToCart.mutate({
      id: product.id,
      qty: quantity,
    });
  };

  useEffect(() => {
    if (addToCart.isSuccess) {
      toast.success(ServeLangItem()?.Item_Added_To_Cart);
    }
  }, [addToCart.isSuccess]);

  useEffect(() => {
    if (addToCart.isError) {
      toast.error(addToCart.error.response.data.message);
    }
  }, [addToCart.isError]);

  return (
    <>
      <div
        className={`product-view w-full justify-between lg:flex ${
          className || ''
        }`}
      >
        <div
          data-aos='fade-right'
          className='lg:mr-[50px] lg:w-1/2 xl:mr-[70px]'
        >
          <div className='w-full'>
            <div className=' relative mb-3 flex h-[350px] w-full items-center justify-center overflow-hidden border border-qgray-border md:h-[600px]'>
              <Image
                layout='fill'
                objectFit='scale-down'
                src={src}
                alt=''
                className='scale-110  transform object-contain'
              />
            </div>
            <div className='flex flex-wrap gap-2'>
              <div
                onClick={() => changeImgHandler(product.thumbnail)}
                className='relative h-[110px] w-[110px] cursor-pointer border border-qgray-border p-[15px]'
              >
                <Image
                  layout='fill'
                  objectFit='scale-down'
                  src={src}
                  alt=''
                  className={`h-full w-full scale-110 transform object-contain ${
                    src !== product.thumbnail ? 'opacity-50' : ''
                  } `}
                />
              </div>
              {productsImg &&
                productsImg.length > 0 &&
                productsImg.map((img, i) => (
                  <div
                    onClick={() => changeImgHandler(img.file_path)}
                    key={i}
                    className='relative h-[110px] w-[110px] cursor-pointer border border-qgray-border p-[15px]'
                  >
                    <Image
                      layout='fill'
                      objectFit='scale-down'
                      src={`${img.file_path}`}
                      alt=''
                      className={`h-full w-full object-contain ${
                        src !== img.file_path ? 'opacity-50' : ''
                      } `}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <div className='product-details mt-10 w-full lg:mt-0'>
            {brand && (
              <span
                data-aos='fade-up'
                className='mb-2 inline-block text-xs font-normal uppercase tracking-wider text-qgray'
              >
                {brand.name}
              </span>
            )}

            <p
              data-aos='fade-up'
              className='mb-4 text-xl font-medium text-qblack'
            >
              {product.title}
            </p>
            <div
              data-aos='fade-up'
              className='mb-7 flex items-baseline space-x-2'
            >
              <span className='text-xl font-medium text-qblack'>
                Rp. {formatMoney(product.price)}
              </span>
            </div>

            <div data-aos='fade-up' className='mb-[30px]'>
              <div
                className={`text-normal whitespace-pre-line text-sm  leading-7 text-qgray ${
                  more ? '' : 'line-clamp-2'
                }`}
              >
                {more ? product.description : product.description.slice(0, 100)}
              </div>
              <button
                onClick={() => setMore(!more)}
                type='button'
                className='text-xs font-bold text-blue-500'
              >
                {more ? 'See Less' : 'See More'}
              </button>
            </div>
            <div className='mb-[30px] flex w-fit items-center space-x-2 bg-qyellowlow p-3'>
              <span className='text-base font-bold text-qblack'>
                {ServeLangItem()?.Availability} :
              </span>
              <span className='text-base font-bold text-qyellow'>
                {product.stock !== '0'
                  ? `${product.stock} Products Available`
                  : `Products not Available`}
              </span>
            </div>

            <div
              data-aos='fade-up'
              className='quantity-card-wrapper mb-[30px] flex h-[50px] w-full items-center space-x-[10px]'
            >
              <div className='flex h-full w-[120px] items-center border border-qgray-border px-[26px]'>
                <div className='flex w-full items-center justify-between'>
                  <button
                    onClick={decrement}
                    type='button'
                    className='text-base text-qgray'
                  >
                    -
                  </button>
                  <span className='text-qblack'>{quantity}</span>
                  <button
                    onClick={increment}
                    type='button'
                    className='text-base text-qgray'
                  >
                    +
                  </button>
                </div>
              </div>
              <div className='h-full flex-1'>
                <button
                  onClick={addToCard}
                  type='button'
                  className='black-btn h-full w-full text-sm font-semibold'
                >
                  {ServeLangItem()?.Add_To_Cart}
                </button>
              </div>
            </div>

            <div data-aos='fade-up' className='mb-[20px]'>
              <p className='text-[13px] leading-7 text-qgray'>
                <span className='text-qblack'>Category :</span> {category.name}{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
