import { useEffect, useState } from 'react';

import CategorySection from './CategorySection';
import LoaderStyleTwo from '../Helpers/Loaders/LoaderStyleTwo';
import SectionStyleThree from '../Helpers/SectionStyleThree';
import Layout from '../Partials/Layout';
import { useGetAllCategories } from '../../api/category';
import { useGetAllProducts } from '../../api/product';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategories = useGetAllCategories();

  useEffect(() => {
    if (getCategories.isSuccess) {
      setCategories(getCategories.data.data.datas);
    }
  }, [getCategories?.data?.data.datas, getCategories.isSuccess]);

  const getProducts = useGetAllProducts({
    page: 1,
    limit: 16,
    sort: 'asc',
  });

  useEffect(() => {
    if (getProducts.isSuccess) {
      setProducts(getProducts.data.data.datas);
    }
  }, [getProducts?.data?.data.datas, getProducts.isSuccess]);

  return (
    <>
      <Layout>
        {getProducts.isLoading && getCategories.isLoading ? (
          <div
            className={`pin fixed left-0 top-0 z-[9000] h-screen  w-screen overflow-y-hidden bg-black/[0.4] bg-current${
              getProducts.isLoading && getCategories.isLoading
                ? 'block'
                : 'hidden'
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
        ) : (
          <>
            {!getCategories.isLoading ? (
              <CategorySection
                categories={categories}
                sectionTitle='Categories'
              />
            ) : (
              <span className='w-5 ' style={{ transform: 'scale(0.3)' }}>
                <LoaderStyleTwo />
              </span>
            )}
            {!getProducts.isLoading ? (
              <SectionStyleThree
                products={products.length > 0 ? products : []}
                sectionTitle='New Arrivals'
                seeMoreUrl='/search?sort=created_at&type=desc'
                className='new-products mb-[30px] md:mb-[60px]'
              />
            ) : (
              <span className='w-5 ' style={{ transform: 'scale(0.3)' }}>
                <LoaderStyleTwo />
              </span>
            )}
          </>
        )}
      </Layout>
    </>
  );
}

export default Home;
