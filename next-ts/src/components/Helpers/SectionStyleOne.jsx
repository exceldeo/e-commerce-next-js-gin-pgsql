import { useEffect, useState } from 'react';

import CategoryCard from './Cards/CategoryCard';
import ProductCardStyleOne from './Cards/ProductCardStyleOne';
import DataIteration from './DataIteration';
import LoaderStyleTwo from './Loaders/LoaderStyleTwo';
import ViewMoreTitle from './ViewMoreTitle';

export default function SectionStyleOne({
  className,
  categoryTitle,
  sectionTitle,
  seeMoreUrl,
  categories = [],
  products = [],
  categoryBackground,
}) {
  const [selectedId, setId] = useState(
    categories.length > 0 && categories[0].category_id
  );
  const [load, setLoad] = useState(false);
  const cp =
    products.length > 0 &&
    products.map((item) => {
      return {
        id: item.id,
        category_id: item.child_category_id,
        title: item.title,
        slug: item.slug,
        image: item.thumbnail ? item.thumbnail : null,
        price: item.price,
      };
    });
  const filterProducts =
    cp && cp.filter((item) => item.category_id === selectedId);
  const categoryHandler = (id) => {
    setLoad(true);
    setTimeout(() => {
      setId(id);
      setLoad(false);
    }, 500);
  };

  useEffect(() => {
    console.log(load, 'load');
  }, []);

  return (
    <>
      {categories.length > 0 && products.length > 0 && (
        <div
          data-aos='fade-up'
          className={`section-style-one ${className || ''}`}
        >
          <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
            <div className='products-section w-full'>
              <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[30px]'>
                <div className='category-card hidden w-full xl:block'>
                  <CategoryCard
                    moreUrl={seeMoreUrl}
                    background={categoryBackground}
                    title={categoryTitle}
                    categories={categories}
                    changeIdHandler={categoryHandler}
                    productsInCategoryIds={cp.map((i) =>
                      parseInt(i.category_id)
                    )}
                  />
                </div>
                {load === false ? (
                  products.length > 0 && (
                    <DataIteration
                      datas={products}
                      startLength={0}
                      endLength={products.length > 3 ? 3 : products.length}
                    >
                      {({ datas }) => (
                        <div key={datas.id} className='item'>
                          <ProductCardStyleOne datas={datas} />
                        </div>
                      )}
                    </DataIteration>
                  )
                ) : (
                  <div className='loading  col-span-3 flex h-[445px] items-center justify-center'>
                    <LoaderStyleTwo />
                  </div>
                )}
              </div>
            </div>
          </ViewMoreTitle>
        </div>
      )}
    </>
  );
}
