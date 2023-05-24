import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ServeLangItem from '../Helpers/ServeLangItem';
import { useAddToCart } from '../../api/cart';
import { formatMoney } from '../../../utils/formatMoney.ts';

export default function ProductView({
  className,
  images = [],
  product,
  category,
  subCategory,
  childCategory,
  brand,
}) {
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
  }, [addToCart?.error?.response.data.message, addToCart.isError]);

  //wishlist

  // const { wishlistData } = useSelector((state) => state.wishlistData);
  // const wishlist = wishlistData && wishlistData.wishlists;
  // const wishlisted =
  //   wishlist && wishlist.data.find((id) => id.product.id === product.id);

  // const [arWishlist, setArWishlist] = useState(null);
  // useEffect(() => {
  //   if (wishlisted) {
  //     setArWishlist(true);
  //   } else {
  //     setArWishlist(false);
  //   }
  // }, [wishlisted]);

  // const addToWishlist = (id) => {
  //   if (auth()) {
  //     setArWishlist(true);
  //     apiRequest.addToWishlist({ id: id, token: auth().access_token });
  //     dispatch(fetchWishlist());
  //   } else {
  //     loginPopupBoard.handlerPopup(true);
  //   }
  // };
  // const removeToWishlist = (id) => {
  //   if (auth()) {
  //     setArWishlist(false);
  //     apiRequest.removeToWishlist({ id: id, token: auth().access_token });
  //     dispatch(fetchWishlist());
  //   } else {
  //     loginPopupBoard.handlerPopup(true);
  //   }
  // };

  // const { currency_icon } = settings();
  // const { websiteSetup } = useSelector((state) => state.websiteSetup);
  // const [pricePercent, setPricePercent] = useState("");

  // useEffect(() => {
  //   if (websiteSetup) {
  //     const offerFlashSale = websiteSetup.payload.flashSale;
  //     const flashSaleProducts = websiteSetup.payload.flashSaleProducts;
  //     const isFlashSaleProduct = flashSaleProducts.find(
  //       (item) => parseInt(item.product_id) === product.id
  //     );
  //     if (isFlashSaleProduct) {
  //       const offer = parseInt(offerFlashSale.offer);
  //       const price = product.offer_price
  //         ? parseInt(product.offer_price)
  //         : parseInt(product.price);
  //       const discountPrice = (offer / 100) * price;
  //       const mainPrice = price - discountPrice;
  //       setPricePercent(
  //         Math.trunc(((mainPrice - product.price) / product.price) * 100)
  //       );
  //     } else {
  //       setPricePercent(
  //         Math.trunc(
  //           ((product.offer_price - product.price) / product.price) * 100
  //         )
  //       );
  //     }
  //   }
  // }, [websiteSetup]);
  // const popupMessageHandler = () => {
  //   if (auth()) {
  //     messageHandler.toggleHandler(seller);
  //   } else {
  //     loginPopupBoard.handlerPopup(true);
  //   }
  // };

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
              {/* {product.offer_price && (
                <div className="w-[80px] h-[80px] rounded-full bg-qyellow text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
                  <span className="text-tblack">{pricePercent}%</span>
              <span>
               {product.id}
               {CheckProductIsExistsInFlashSale({
                 id: 999999999999999,
                 price: offerPrice,
               })}
              </span>
              </div>
              )} */}
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
            {/* <div
              data-aos='fade-up'
              className='mb-6 flex items-center space-x-[10px]'
            >
              <div className='flex'>
                {Array.from(Array(parseInt(product.rating_avg)), () => (
                  <span key={parseInt(product.rating_avg) + Math.random()}>
                    <Star />
                  </span>
                ))}
                {parseInt(product.rating_avg) < 5 && (
                  <>
                    {Array.from(Array(5 - parseInt(product.rating_avg)), () => (
                      <span
                        key={parseInt(product.rating_avg) + Math.random()}
                        className='text-gray-500'
                      >
                        <Star defaultValue={false} />
                      </span>
                    ))}
                  </>
                )}
              </div>
            </div> */}
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

            {/*<div data-aos="fade-up" className="colors mb-[30px]">*/}
            {/*  <span className="text-sm font-normal uppercase text-qgray mb-[14px] inline-block">*/}
            {/*    COLOR*/}
            {/*  </span>*/}

            {/*  <div className="flex space-x-4 items-center">*/}
            {/*    {productsImg &&*/}
            {/*      productsImg.length > 0 &&*/}
            {/*      productsImg.map((img) => (*/}
            {/*        <div key={img.id}>*/}
            {/*          {img.color && img.color !== "" && (*/}
            {/*            <button*/}
            {/*              onClick={() => changeImgHandler(img.src)}*/}
            {/*              type="button"*/}
            {/*              style={{ "--tw-ring-color": `${img.color}` }}*/}
            {/*              className="w-[20px] h-[20px]  rounded-full focus:ring-2  ring-offset-2 flex justify-center items-center"*/}
            {/*            >*/}
            {/*              <span*/}
            {/*                style={{ background: `${img.color}` }}*/}
            {/*                className="w-[20px] h-[20px] block rounded-full border"*/}
            {/*              ></span>*/}
            {/*            </button>*/}
            {/*          )}*/}
            {/*        </div>*/}
            {/*      ))}*/}
            {/*  </div>*/}
            {/*</div>*/}

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
              {/* <div className="w-[60px] h-full flex justify-center items-center border border-qgray-border"> */}
              {/*<button type="button">*/}
              {/*  <span>*/}
              {/*    <svg*/}
              {/*        width="24"*/}
              {/*        height="24"*/}
              {/*        viewBox="0 0 24 24"*/}
              {/*        fill="none"*/}
              {/*        xmlns="http://www.w3.org/2000/svg"*/}
              {/*    >*/}
              {/*      <path*/}
              {/*          d="M17 1C14.9 1 13.1 2.1 12 3.7C10.9 2.1 9.1 1 7 1C3.7 1 1 3.7 1 7C1 13 12 22 12 22C12 22 23 13 23 7C23 3.7 20.3 1 17 1Z"*/}
              {/*          stroke="#D5D5D5"*/}
              {/*          strokeWidth="2"*/}
              {/*          strokeMiterlimit="10"*/}
              {/*          strokeLinecap="square"*/}
              {/*      />*/}
              {/*    </svg>*/}
              {/*  </span>*/}
              {/*</button>*/}
              {/* {!arWishlist ? (
                  <button
                    type="button"
                    onClick={() => addToWishlist(product.id)}
                  >
                    <span className="w-10 h-10 flex justify-center items-center">
                      <ThinLove />
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      removeToWishlist(wishlisted && wishlisted.id)
                    }
                  >
                    <span className="w-10 h-10 flex justify-center items-center">
                      <ThinLove fill={true} />
                    </span>
                  </button>
                )}
              </div> */}
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
                {subCategory.name ? '/ ' + subCategory.name : ''}
                {childCategory.name ? '/ ' + childCategory.name : ''}
              </p>

              <p className='text-[13px] leading-7 text-qgray'>
                <span className='uppercase text-qblack'>
                  {ServeLangItem()?.SKU}:
                </span>{' '}
                {product.sku}
              </p>
            </div>

            {/* <div
              data-aos="fade-up"
              className="flex space-x-2 items-center mb-[20px] report-btn "
            >
              <span>
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0C0.247634 0 0.475436 0 0.729172 0C0.738324 0.160174 0.747477 0.316279 0.757647 0.493233C1.05816 0.392044 1.33885 0.282211 1.62818 0.203395C3.11296 -0.201361 4.51385 0.0366111 5.84202 0.779512C6.47661 1.13494 7.14171 1.39071 7.86987 1.47207C8.88125 1.58496 9.82093 1.35817 10.7098 0.88426C10.9335 0.765274 11.1522 0.636627 11.411 0.491199C11.4161 0.606117 11.4237 0.693577 11.4237 0.780529C11.4242 3.18822 11.4222 5.5954 11.4288 8.00309C11.4293 8.1892 11.3718 8.29089 11.2096 8.38039C9.31956 9.42279 7.4285 9.43499 5.54557 8.37734C4.06231 7.54443 2.55363 7.43307 0.992568 8.13835C0.804428 8.22327 0.737816 8.33005 0.739341 8.53904C0.749003 9.9206 0.744426 11.3027 0.744426 12.6842C0.744426 12.7849 0.744426 12.8851 0.744426 13C0.48764 13 0.254244 13 0 13C0 8.67582 0 4.34961 0 0Z"
                    fill="#EB5757"
                  />
                </svg>
              </span>

              <button
                type="button"
                onClick={reportHandler}
                className="text-qred font-semibold text-[13px]"
              >
                {ServeLangItem()?.Report_This_Item}
              </button>
            </div> */}

            {/* <div
              data-aos="fade-up"
              className="social-share flex  items-center w-full mb-[20px]"
            >
              <span className="text-qblack text-[13px] mr-[17px] inline-block">
                {ServeLangItem()?.Share_This}
              </span>

              <div className="flex space-x-5 items-center">
                <FacebookShareButton
                  url={`${
                    typeof window !== "undefined" &&
                    window.location.origin &&
                    window.location.origin +
                      "/single-product?slug=" +
                      product.slug
                  }`}
                  quotes={product.name}
                >
                  <span className="cursor-pointer">
                    <svg
                      width="10"
                      height="16"
                      viewBox="0 0 10 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 16V9H0V6H3V4C3 1.3 4.7 0 7.1 0C8.3 0 9.2 0.1 9.5 0.1V2.9H7.8C6.5 2.9 6.2 3.5 6.2 4.4V6H10L9 9H6.3V16H3Z"
                        fill="#3E75B2"
                      />
                    </svg>
                  </span>
                </FacebookShareButton>
                <TwitterShareButton
                  url={`${
                    typeof window !== "undefined" &&
                    window.location.origin &&
                    window.location.origin +
                      "/single-product?slug=" +
                      product.slug
                  }`}
                  title={product.name}
                >
                  <span className="cursor-pointer">
                    <svg
                      width="18"
                      height="14"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.0722 1.60052C16.432 1.88505 15.7562 2.06289 15.0448 2.16959C15.7562 1.74278 16.3253 1.06701 16.5742 0.248969C15.8985 0.640206 15.1515 0.924742 14.3335 1.10258C13.6933 0.426804 12.7686 0 11.7727 0C9.85206 0 8.28711 1.56495 8.28711 3.48557C8.28711 3.7701 8.32268 4.01907 8.39382 4.26804C5.51289 4.12577 2.9165 2.73866 1.17371 0.604639C0.889175 1.13814 0.71134 1.70722 0.71134 2.34742C0.71134 3.5567 1.31598 4.62371 2.27629 5.26392C1.70722 5.22835 1.17371 5.08608 0.675773 4.83711V4.87268C0.675773 6.5799 1.88505 8.00258 3.48557 8.32268C3.20103 8.39382 2.88093 8.42938 2.56082 8.42938C2.34742 8.42938 2.09845 8.39382 1.88505 8.35825C2.34742 9.74536 3.62784 10.7768 5.15722 10.7768C3.94794 11.7015 2.45412 12.2706 0.818041 12.2706C0.533505 12.2706 0.248969 12.2706 0 12.2351C1.56495 13.2309 3.37887 13.8 5.37062 13.8C11.8082 13.8 15.3294 8.46495 15.3294 3.84124C15.3294 3.69897 15.3294 3.52113 15.3294 3.37887C16.0052 2.9165 16.6098 2.31186 17.0722 1.60052Z"
                        fill="#3FD1FF"
                      />
                    </svg>
                  </span>
                </TwitterShareButton>
              </div>
            </div> */}
            {/* {vendor && (
              <div data-aos="fade-up" className="message-btn">
                <button
                  onClick={() => popupMessageHandler()}
                  className="flex px-5 py-2 bg-qyellow text-qblack items-center space-x-2.5"
                  type="button"
                >
                  <span>
                    <svg
                      width="21"
                      height="19"
                      viewBox="0 0 21 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.30898 18.0944C0.962386 18.0925 0.630508 17.954 0.385424 17.7089C0.14034 17.4638 0.00183875 17.132 0 16.7854V6.01951C0.00184787 5.30162 0.287849 4.61366 0.795479 4.10603C1.30311 3.5984 1.99107 3.31239 2.70897 3.31055H15.4838C16.2029 3.31054 16.8927 3.59573 17.4018 4.10356C17.9109 4.61139 18.1979 5.30041 18.1998 6.01951V13.1944C18.1998 13.9135 17.9146 14.6033 17.4068 15.1124C16.8989 15.6216 16.2099 15.9085 15.4908 15.9104H4.83694C4.71593 15.9114 4.59833 15.9506 4.50094 16.0224L2.09997 17.8354C1.87104 18.0045 1.59364 18.0954 1.30898 18.0944ZM2.70897 4.71053C2.36237 4.71237 2.03049 4.85087 1.78541 5.09595C1.54032 5.34104 1.40182 5.67291 1.39998 6.01951V16.6104L3.66095 14.9024C4.00115 14.6497 4.41318 14.5124 4.83694 14.5104H15.4838C15.8328 14.5104 16.1675 14.3718 16.4143 14.125C16.6611 13.8782 16.7998 13.5434 16.7998 13.1944V6.01951C16.7979 5.67291 16.6594 5.34104 16.4144 5.09595C16.1693 4.85087 15.8374 4.71237 15.4908 4.71053H2.70897Z"
                        fill="black"
                      ></path>
                      <path
                        d="M11.8601 10.3746C12.2467 10.3746 12.5601 10.0612 12.5601 9.6746C12.5601 9.28801 12.2467 8.97461 11.8601 8.97461C11.4736 8.97461 11.1602 9.28801 11.1602 9.6746C11.1602 10.0612 11.4736 10.3746 11.8601 10.3746Z"
                        fill="black"
                      ></path>
                      <path
                        d="M9.1414 10.3746C9.52799 10.3746 9.84139 10.0612 9.84139 9.6746C9.84139 9.28801 9.52799 8.97461 9.1414 8.97461C8.7548 8.97461 8.44141 9.28801 8.44141 9.6746C8.44141 10.0612 8.7548 10.3746 9.1414 10.3746Z"
                        fill="black"
                      ></path>
                      <path
                        d="M6.34062 10.3746C6.72721 10.3746 7.04061 10.0612 7.04061 9.6746C7.04061 9.28801 6.72721 8.97461 6.34062 8.97461C5.95402 8.97461 5.64062 9.28801 5.64062 9.6746C5.64062 10.0612 5.95402 10.3746 6.34062 10.3746Z"
                        fill="black"
                      ></path>
                      <path
                        d="M20.2998 11.0116C20.1141 11.0116 19.9361 10.9378 19.8048 10.8066C19.6735 10.6753 19.5998 10.4972 19.5998 10.3116V3.22068C19.598 2.87409 19.4595 2.54221 19.2144 2.29712C18.9693 2.05204 18.6374 1.91354 18.2908 1.9117H4.19999C4.01434 1.9117 3.8363 1.83795 3.70502 1.70668C3.57375 1.5754 3.5 1.39736 3.5 1.21171C3.5 1.02606 3.57375 0.848015 3.70502 0.716741C3.8363 0.585468 4.01434 0.511719 4.19999 0.511719H18.2908C19.0087 0.513567 19.6967 0.799568 20.2043 1.3072C20.7119 1.81483 20.9979 2.50279 20.9998 3.22068V10.3116C20.9998 10.4972 20.926 10.6753 20.7948 10.8066C20.6635 10.9378 20.4854 11.0116 20.2998 11.0116Z"
                        fill="black"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-base font-medium text-qblack capitalize">
                    Chat with seller
                  </span>
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}

//store all varient

// store all varient first item
