import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ProductView from './ProductView';
import SallerInfo from './SallerInfo';
import BreadcrumbCom from '../BreadcrumbCom';
import ProductCardStyleOne from '../Helpers/Cards/ProductCardStyleOne';
import DataIteration from '../Helpers/DataIteration';
import LoaderStyleOne from '../Helpers/Loaders/LoaderStyleOne';
import LoaderStyleTwo from '../Helpers/Loaders/LoaderStyleTwo';
import ServeLangItem from '../Helpers/ServeLangItem';
import Layout from '../Partials/Layout';
import { useGetAllProducts, useGetProductBySlug } from '../../api/product';

export default function SingleProductPage() {
  const router = useRouter();
  const [tab, setTab] = useState('des');

  const { slug } = router.query;
  const getDetailProduct = useGetProductBySlug(slug);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRelatedProducts, setIsLoadingRelatedProducts] =
    useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [vendorProducts, setVendorProducts] = useState([]);

  useEffect(() => {
    if (getDetailProduct.isSuccess) {
      setIsLoading(false);
    }
  }, [getDetailProduct.isSuccess]);

  const getAllProductByBrand = useGetAllProducts({
    brand_id: getDetailProduct.data?.data?.brand?.id,
    page_size: 5,
    page: 1,
    sort: 'created_at',
    order: 'desc',
  });

  useEffect(() => {
    if (getAllProductByBrand.isSuccess) {
      setRelatedProducts(getAllProductByBrand.data.data.products);
      setIsLoadingRelatedProducts(false);
    }
  }, [
    getAllProductByBrand?.data?.data.products,
    getAllProductByBrand.isSuccess,
  ]);

  const getAllProductByVendor = useGetAllProducts({
    vendor_id: getDetailProduct.data?.data?.vendor?.id,
    page_size: 5,
    page: 1,
    sort: 'created_at',
    order: 'desc',
  });

  useEffect(() => {
    if (getAllProductByVendor.isSuccess) {
      setVendorProducts(getAllProductByVendor.data.data.products);
    }
  }, [
    getAllProductByVendor?.data?.data.products,
    getAllProductByVendor.isSuccess,
  ]);

  return (
    <>
      <Layout childrenClasses='pt-0 pb-0'>
        <>
          {getDetailProduct.isLoading ? (
            <LoaderStyleTwo />
          ) : (
            <div className='single-product-wrapper w-full '>
              <div className='product-view-main-wrapper w-full bg-white pt-[30px]'>
                <div className='breadcrumb-wrapper w-full '>
                  <div className='container-x mx-auto'>
                    <BreadcrumbCom
                      paths={[
                        { name: ServeLangItem()?.home, path: '/' },
                        {
                          name: getDetailProduct.data.data.product.title,
                          path: `/single-product?slug=${getDetailProduct.data.data.product.slug}`,
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className='w-full bg-white pb-[60px]'>
                  <div className='container-x mx-auto'>
                    {isLoading ? (
                      <LoaderStyleOne />
                    ) : (
                      <ProductView
                        product={
                          getDetailProduct.data.data &&
                          getDetailProduct.data.data.product
                        }
                        images={
                          getDetailProduct.data.data &&
                          getDetailProduct.data.data.product_gallery
                        }
                        vendor={
                          getDetailProduct.data.data &&
                          getDetailProduct.data.data.vendor
                        }
                        category={
                          getDetailProduct.data.data &&
                          getDetailProduct.data.data.category
                        }
                        subCategory={
                          (getDetailProduct.data.data &&
                            getDetailProduct.data.data.sub_category) ||
                          null
                        }
                        childCategory={
                          (getDetailProduct.data.data &&
                            getDetailProduct.data.data.child_category) ||
                          null
                        }
                        brand={
                          (getDetailProduct.data.data &&
                            getDetailProduct.data.data.brand) ||
                          null
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              <div
                className='product-des-wrapper relative w-full pb-[60px]'
                // ref={reviewElement}
              >
                <div className='tab-buttons mb-10 mt-5 w-full sm:mt-0'>
                  <div className='container-x mx-auto'>
                    <ul className='flex space-x-12 '>
                      <li>
                        <span
                          onClick={() => setTab('des')}
                          className={`cursor-pointer border-b py-[15px] text-sm font-medium sm:block sm:text-[15px] ${
                            tab === 'des'
                              ? 'border-qyellow text-qblack '
                              : 'border-transparent text-qgray'
                          }`}
                        >
                          {ServeLangItem()?.Product_Details}
                        </span>
                      </li>
                      <li>
                        <span
                          onClick={() => setTab('info')}
                          className={`cursor-pointer border-b py-[15px] text-sm font-medium sm:block sm:text-[15px] ${
                            tab === 'info'
                              ? 'border-qyellow text-qblack '
                              : 'border-transparent text-qgray'
                          }`}
                        >
                          {ServeLangItem()?.Seller_Information}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className='absolute left-0 top-[36px] -z-10 h-[1px] w-full bg-[#E8E8E8] sm:top-[50px]'></div>
                </div>
                <div className='tab-contents w-full '>
                  <div className='container-x mx-auto'>
                    {tab === 'des' && (
                      <>
                        <div className='product-detail-des'>
                          <ul>
                            <li className='leading-[30px] text-qgray'>
                              <span className='text-[15px] font-medium capitalize text-qblack'>
                                {ServeLangItem()?.Tkdn}
                              </span>
                              : {getDetailProduct.data.data.product.tkdn}
                            </li>
                            <li className='leading-[30px] text-qgray'>
                              <span className='text-[15px] font-medium capitalize text-qblack'>
                                {ServeLangItem()?.Weight}
                              </span>
                              : {getDetailProduct.data.data.product.weight}{' '}
                              {getDetailProduct.data.data.product.unit_weight}
                            </li>
                            <li className='leading-[30px] text-qgray'>
                              <span className='text-[15px] font-medium capitalize text-qblack'>
                                {ServeLangItem()?.Size}
                              </span>
                              : {getDetailProduct.data.data.product.size}{' '}
                              {getDetailProduct.data.data.product.unit_size}
                            </li>
                          </ul>
                          {getDetailProduct.data.data.product.description}
                        </div>
                      </>
                    )}

                    {tab === 'info' && (
                      <div
                        data-aos='fade-up'
                        className='tab-content-item w-full'
                      >
                        {getDetailProduct.data.data && (
                          <SallerInfo
                            sellerInfo={getDetailProduct.data.data.vendor}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='related-product w-full bg-white'>
                <div className='container-x mx-auto'>
                  <div className='w-full py-[60px]'>
                    <h1 className='font-600 mb-[30px] text-xl leading-none text-qblacktext sm:text-3xl'>
                      {ServeLangItem()?.Related_Products_By_Vendor}
                    </h1>
                    <div
                      data-aos='fade-up'
                      className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-[30px]'
                    >
                      {getAllProductByVendor.isLoading ? (
                        <LoaderStyleTwo />
                      ) : (
                        <DataIteration
                          datas={vendorProducts}
                          startLength={0}
                          endLength={
                            vendorProducts.length > 5
                              ? 5
                              : vendorProducts.length
                          }
                        >
                          {({ datas }) => (
                            <div key={datas.id} className='item'>
                              <ProductCardStyleOne datas={datas} />
                            </div>
                          )}
                        </DataIteration>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='related-product w-full bg-white'>
                <div className='container-x mx-auto'>
                  <div className='w-full py-[60px]'>
                    <h1 className='font-600 mb-[30px] text-xl leading-none text-qblacktext sm:text-3xl'>
                      {ServeLangItem()?.Related_Product}
                    </h1>
                    <div
                      data-aos='fade-up'
                      className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-[30px]'
                    >
                      {isLoadingRelatedProducts ? (
                        <LoaderStyleTwo />
                      ) : (
                        <DataIteration
                          datas={relatedProducts}
                          startLength={0}
                          endLength={
                            relatedProducts.length > 5
                              ? 5
                              : relatedProducts.length
                          }
                        >
                          {({ datas }) => (
                            <div key={datas.id} className='item'>
                              <ProductCardStyleOne datas={datas} />
                            </div>
                          )}
                        </DataIteration>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      </Layout>
    </>
  );
}
