import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import ProductsTable from './ProductsTable';
import BreadcrumbCom from '../BreadcrumbCom';
import EmptyCardError from '../EmptyCardError';
import LoaderStyleTwo from '../Helpers/Loaders/LoaderStyleTwo';
import PageTitle from '../Helpers/PageTitle';
import ServeLangItem from '../Helpers/ServeLangItem';
import {
  useAddToCart,
  useGetCart,
  useUpdateCart,
  useDeleteCart,
} from '../../api/cart';
import { clearItemCheckout } from '../../store/checkout.js';
import isAuth from '../../../Middleware/isAuth';

function CartPage() {
  const { checkout } = useSelector((state) => state.checkout);
  const [getCarts, setGetCarts] = useState([]);
  const addToCart = useAddToCart();
  const updateCart = useUpdateCart();

  const serverReqIncreseQty = (id) => {
    updateCart.mutate({
      id: id,
      product_id: getCart.data.data.find((item) => item.id === id).product_id,
      qty: getCart.data.data.find((item) => item.id === id).qty + 1,
    });
  };

  const serverReqDecreseQyt = (id) => {
    updateCart.mutate({
      id: id,
      product_id: getCart.data.data.find((item) => item.id === id).product_id,
      qty: getCart.data.data.find((item) => item.id === id).qty - 1,
    });
  };

  useEffect(() => {
    if (updateCart.isSuccess) {
      toast.success(ServeLangItem()?.Item_Cart_Update);
    }
  }, [updateCart.isSuccess]);

  useEffect(() => {
    if (updateCart.isError) {
      toast.error(updateCart.error.response.data.message);
    }
  }, [updateCart.isError]);
  const getCart = useGetCart();

  useEffect(() => {
    if (getCart.isSuccess) {
      setGetCarts(getCart.data.data);
    }
  }, [getCart?.data?.data, getCart.isSuccess]);

  useEffect(() => {
    if (
      getCart &&
      getCart.data &&
      getCart.data.data &&
      getCart.data.data.length > 0
    ) {
      setGetCarts(getCart.data.data);
    }
  }, [getCart]);

  const deleteCart = useDeleteCart();

  const handleDelete = (id) => {
    deleteCart.mutate({
      id: id,
    });
  };

  useEffect(() => {
    if (deleteCart.isSuccess) {
      toast.success(ServeLangItem()?.Item_Cart_Delete);
    }
  }, [deleteCart.isSuccess]);

  useEffect(() => {
    if (deleteCart.isError) {
      toast.error(deleteCart.error.response.data.message);
    }
  }, [deleteCart.isError]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearItemCheckout());
  }, []);

  const router = useRouter();

  const handleCheckout = () => {
    if (checkout.length > 0) {
      router.push('/checkout');
    } else {
      toast.error(ServeLangItem()?.Cart_is_Empty);
    }
  };

  return (
    <>
      {getCart.isLoading ? (
        <div
          className={`pin fixed top-0 left-0 z-[9000] h-screen  w-screen overflow-y-hidden bg-black/[0.4] bg-current${
            getCart.isLoading ? 'block' : 'hidden'
          }
              `}
        >
          <div className='bg-neutral-focus inset-0 flex h-full w-full items-center justify-center bg-opacity-25'>
            <div className='flex w-[200px] flex-col items-center justify-center '>
              <div className='max-w-[6rem]'>
                <LoaderStyleTwo />
              </div>
            </div>
          </div>
        </div>
      ) : getCarts && getCarts.length === 0 ? (
        <div className='cart-page-wrapper w-full'>
          <div className='container-x mx-auto'>
            <BreadcrumbCom
              paths={[
                { name: ServeLangItem()?.home, path: '/' },
                { name: ServeLangItem()?.cart, path: '/cart' },
              ]}
            />
            <EmptyCardError />
          </div>
        </div>
      ) : (
        <div className='cart-page-wrapper w-full bg-white pb-[60px]'>
          <div className='w-full'>
            <PageTitle
              title='Your Cart'
              breadcrumb={[
                { name: ServeLangItem()?.home, path: '/' },
                { name: ServeLangItem()?.cart, path: '/cart' },
              ]}
            />
          </div>
          <div className='mt-[23px] w-full'>
            <div className='container-x mx-auto'>
              <ProductsTable
                incrementQty={serverReqIncreseQty}
                decrementQty={serverReqDecreseQyt}
                cartItems={getCarts && getCarts}
                handleDeleteItem={handleDelete}
                className='mb-[30px]'
              />
              <div className='w-full justify-between sm:flex'>
                <div className='flex items-center space-x-4 rtl:space-x-reverse'>
                  <button onClick={handleCheckout}>
                    <div className='black-btn flex h-[50px] w-[300px] cursor-pointer items-center justify-center'>
                      <span className='text-sm font-semibold'>
                        {ServeLangItem()?.Proceed_to_Checkout}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default isAuth(CartPage);
