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
import { useGetAllCategories } from '../../api/category';
import { useGetAllProducts } from '../../api/product';

export default function AllProductPage() {
  const [filterToggle, setToggle] = useState(false);

  const [filter, setFilter] = useState({
    category: '',
    page: 1,
    limit: 2,
    sort: 'asc',
    keyword: '',
  });

  const [categories, setCategories] = useState({});

  const getCategories = useGetAllCategories();

  useEffect(() => {
    if (getCategories.isSuccess) {
      setCategories(getCategories.data.data.datas);
    }
  }, [getCategories?.data?.data, getCategories.isSuccess]);

  const router = useRouter();
  const { category, page, limit, sort, keyword } = router.query;

  useEffect(() => {
    if (router.query) {
      setFilter({
        category: category ? category : '',
        page: page ? page : 1,
        limit: limit ? limit : 16,
        sort: sort ? sort : 'asc',
        keyword: keyword ? keyword : '',
      });
    }
  }, [router.query]);

  const [products, setProducts] = useState([]);

  let getProducts = useGetAllProducts({
    page: page ? page : 1,
    limit: limit,
    sort: sort,
    keyword: keyword,
    category: category,
  });

  useEffect(() => {
    if (getProducts.isSuccess) {
      setProducts(getProducts.data.data.datas);
    }
  }, [getProducts?.data?.data.datas, getProducts.isSuccess]);

  const handlerFilter = (filter) => {
    const { category, page, limit, sort, keyword } = filter;
    router.push({
      pathname: '/search',
      query: {
        category: category ? category : null,
        page: page > 1 ? page : null,
        limit: limit > 10 ? limit : null,
        sort: sort ? sort : null,
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
                    </div>
                    <div>
                      <div className='flex items-center space-x-5'>
                        <p className='font-400 mr-1 text-[13px]'>
                          {ServeLangItem()?.Sort_By}
                        </p>
                        <div className='relative'>
                          <select
                            value={
                              filter.sort === 'desc'
                                ? ServeLangItem()?.Newest
                                : filter.sort === 'asc'
                                ? ServeLangItem()?.Oldest
                                : ''
                            }
                            onChange={(e) => {
                              if (e.target.value === ServeLangItem()?.Newest) {
                                setFilter((prev) => {
                                  const newFilter = {
                                    ...prev,
                                    sort: 'desc',
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
                                    sort: 'asc',
                                  };
                                  handlerFilter(newFilter);
                                  return newFilter;
                                });
                              } else {
                                setFilter((prev) => {
                                  const newFilter = {
                                    ...prev,
                                    sort: '',
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
