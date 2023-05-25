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
  const [isLoading, setIsLoading] = useState({
    products: false,
    categories: false,
  });

  const getCategories = useGetAllCategories();

  useEffect(() => {
    if (getCategories.isSuccess) {
      setCategories(getCategories.data.data.categories);
      setIsLoading({ ...isLoading, categories: true });
    }
  }, [getCategories?.data?.data.categories, getCategories.isSuccess]);

  const getProducts = useGetAllProducts({
    page_size: 30,
    page: 1,
    sort: 'created_at',
    type: 'desc',
  });

  useEffect(() => {
    if (getProducts.isSuccess) {
      console.log(getProducts.data.data.datas);
      // setProducts(getProducts.data.data.products);
      setIsLoading({ ...isLoading, products: true });
    }
  }, [getProducts?.data?.data.products, getProducts.isSuccess]);

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
            {isLoading.categories ? (
              <CategorySection
                categories={categories}
                sectionTitle='Categories'
              />
            ) : (
              <span className='w-5 ' style={{ transform: 'scale(0.3)' }}>
                <LoaderStyleTwo />
              </span>
            )}
            {isLoading.products ? (
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
