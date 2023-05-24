// import BreadcrumbCom from "../BreadcrumbCom";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import 'react-input-range/lib/css/index.css';

import ProductsFilter from './ProductsFilter';
import ProductCardStyleOne from '../Helpers/Cards/ProductCardStyleOne';
import DataIteration from '../Helpers/DataIteration';
import LoaderStyleTwo from '../Helpers/Loaders/LoaderStyleTwo';
import Pagination from '../Helpers/Pagination';
import ServeLangItem from '../Helpers/ServeLangItem';
import Layout from '../Partials/Layout';
import { useGetAllBrands } from '../../api/brand';
import { useGetAllSummarizedCategories } from '../../api/category';
import { useGetAllProducts } from '../../api/product';

export default function AllProductPage() {
  const [filterToggle, setToggle] = useState(false);

  const [filter, setFilter] = useState({
    category: '',
    brand: '',
    price: {
      min: 0,
      max: 0,
    },
    page: 1,
    limit: 2,
    sort: '',
    order: 'asc',
    keyword: '',
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState({});

  const getBrands = useGetAllBrands();

  useEffect(() => {
    if (getBrands.isSuccess) {
      setBrands(getBrands.data.data.brands);
    }
  }, [getBrands?.data?.data.brands, getBrands.isSuccess]);

  const getCategories = useGetAllSummarizedCategories();

  useEffect(() => {
    if (getCategories.isSuccess) {
      setCategories(getCategories.data.data);
    }
  }, [getCategories?.data?.data, getCategories.isSuccess]);

  const router = useRouter();
  const { category, brand, price, page, limit, sort, order, keyword } =
    router.query;

  useEffect(() => {
    if (router.query) {
      setFilter({
        category: category ? category : '',
        brand: brand ? brand : '',
        price: price
          ? {
              min: price.split(',')[0],
              max: price.split(',')[1],
            }
          : { min: 0, max: 0 },
        page: page ? page : 1,
        limit: 2,
        sort: sort ? sort : '',
        order: order ? order : 'asc',
        keyword: keyword ? keyword : '',
      });
    }
  }, [router.query]);

  const [products, setProducts] = useState([]);

  let getProducts = useGetAllProducts({
    page: page ? page : 1,
    page_size: 16,
    sort: sort,
    type: order,
    keyword: keyword,
    brand_id: getBrands.data?.data?.brands?.find((item) => item.slug === brand)
      ?.id,
    child_category_id: category,
  });

  useEffect(() => {
    if (getProducts.isSuccess) {
      setProducts(getProducts.data.data.products);
    }
  }, [getProducts?.data?.data.products, getProducts.isSuccess]);

  const handlerFilter = (filter) => {
    const { category, brand, price, page, limit, sort, order, keyword } =
      filter;
    router.push({
      pathname: '/search',
      query: {
        category: category ? category : null,
        brand: brand ? brand : null,
        price:
          price.min > 0 && price.max > 0 ? `${price.min},${price.max}` : null,
        page: page > 1 ? page : null,
        limit: limit > 10 ? limit : null,
        sort: sort ? sort : null,
        order: order ? order : null,
        keyword: keyword ? keyword : null,
      },
    });
  };

  return (
    <>
      <Layout>
        <div className='products-page-wrapper w-full'>
          <div className='container-x mx-auto'>
            {/*<BreadcrumbCom />*/}
            <div className='w-full rtl:space-x-reverse lg:flex lg:space-x-[30px]'>
              <div className='lg:w-[270px]'>
                <ProductsFilter
                  handlerFilter={handlerFilter}
                  setFilter={setFilter}
                  filter={filter}
                  categories={categories}
                  brands={brands}
                  priceMax={filter.price.max}
                  priceMin={filter.price.min}
                  filterToggleHandler={() => setToggle(!filterToggle)}
                  filterToggle={filterToggle}
                  className='mb-[30px]'
                />
              </div>

              <div className='flex-1'>
                <div className='w-full'>
                  <div className='products-sorting mb-[40px] flex w-full flex-col justify-between space-y-5 bg-white p-[30px] md:h-[70px] md:flex-row md:items-center md:space-y-0'>
                    <div>
                      {ServeLangItem()?.Keyword} : {filter.keyword}
                      {getProducts.data?.data?.total_data > 0 && (
                        <p className='font-400 text-[13px]'>
                          <span className='text-qgray'>
                            {' '}
                            {ServeLangItem()?.Showing}
                          </span>{' '}
                          {getProducts.data.data?.page == 1
                            ? 1
                            : getProducts.data.data?.page *
                                getProducts.data.data?.page_size -
                              getProducts.data.data?.page_size +
                              1}{' '}
                          –{' '}
                          {getProducts.data.data?.page *
                            getProducts.data.data?.page_size >
                          getProducts.data.data?.total_data
                            ? getProducts.data.data?.total_data
                            : getProducts.data.data?.page *
                              getProducts.data.data?.page_size}{' '}
                          {ServeLangItem()?.Of}{' '}
                          {getProducts.data.data?.total_data}{' '}
                          {ServeLangItem()?.results}
                        </p>
                      )}
                    </div>
                    <div>
                      <div className='flex items-center space-x-5'>
                        <p className='font-400 mr-1 text-[13px]'>
                          {ServeLangItem()?.Sort_By}
                        </p>
                        <div className='relative'>
                          <select
                            value={
                              filter.sort === 'created_at' &&
                              filter.order === 'desc'
                                ? ServeLangItem()?.Newest
                                : filter.sort === 'created_at' &&
                                  filter.order === 'asc'
                                ? ServeLangItem()?.Oldest
                                : ''
                            }
                            onChange={(e) => {
                              if (e.target.value === ServeLangItem()?.Newest) {
                                setFilter((prev) => {
                                  const newFilter = {
                                    ...prev,
                                    sort: 'created_at',
                                    order: 'desc',
                                  };
                                  handlerFilter(newFilter);
                                  return newFilter;
                                });
                              } else if (
                                e.target.value === ServeLangItem()?.Oldest
                              ) {
                                setFilter((prev) => {
                                  const newFilter = {
                                    ...prev,
                                    sort: 'created_at',
                                    order: 'asc',
                                  };
                                  handlerFilter(newFilter);
                                  return newFilter;
                                });
                              } else {
                                setFilter((prev) => {
                                  const newFilter = {
                                    ...prev,
                                    sort: '',
                                    order: '',
                                  };
                                  handlerFilter(newFilter);
                                  return newFilter;
                                });
                              }
                            }}
                            className='h-[40px] w-[150px] appearance-none rounded-[4px] border border-[#E1E1E1] px-[15px] text-[13px] font-medium text-[#6D6D6D] focus:outline-none'
                          >
                            <option value=''>{ServeLangItem()?.Default}</option>

                            <option value={ServeLangItem()?.Newest}>
                              {ServeLangItem()?.Newest}
                            </option>
                            <option value={ServeLangItem()?.Oldest}>
                              {ServeLangItem()?.Oldest}
                            </option>
                          </select>
                          <div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform'>
                            <svg
                              width='10'
                              height='5'
                              viewBox='0 0 10 5'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M5 5L0.5 0.5L9.5 0.5L5 5Z'
                                fill='#6D6D6D'
                              />
                            </svg>{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {getProducts.isLoading ? (
                    <div className='bg-neutral-focus inset-0 flex h-full w-full items-center justify-center bg-opacity-25'>
                      <div className='flex w-[200px] flex-col items-center justify-center '>
                        <div className='max-w-[6rem] '>
                          <LoaderStyleTwo />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {products && products.length > 0 ? (
                        <>
                          <div className='mb-[40px] grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4  xl:gap-[20px]'>
                            <DataIteration
                              datas={products && products}
                              startLength={0}
                              endLength={products && products.length}
                            >
                              {({ datas }) => (
                                <div data-aos='fade-up' key={datas.id}>
                                  <ProductCardStyleOne datas={datas} />
                                </div>
                              )}
                            </DataIteration>
                          </div>
                          <Pagination
                            paginateBackIsDisabled={
                              getProducts.data?.data?.page === 1
                            }
                            paginateNextIsDisabled={
                              getProducts.data?.data?.page *
                                getProducts.data?.data?.page_size >=
                              getProducts.data?.data?.total_data
                            }
                            paginateFront={() => {
                              setFilter((prev) => {
                                const newFilter = {
                                  ...prev,
                                  page: parseInt(prev.page) + 1,
                                };
                                handlerFilter(newFilter);
                                return newFilter;
                              });
                            }}
                            paginateBack={() => {
                              setFilter((prev) => {
                                const newFilter = {
                                  ...prev,
                                  page: parseInt(prev.page) - 1,
                                };
                                handlerFilter(newFilter);
                                return newFilter;
                              });
                            }}
                          />
                        </>
                      ) : (
                        <div className='mt-5 flex justify-center'>
                          <h1 className='text-tblack text-2xl font-medium'>
                            Products not available
                          </h1>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
