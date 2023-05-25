import ProductCardStyleOne from './Cards/ProductCardStyleOne';
import DataIteration from './DataIteration';
import ViewMoreTitle from './ViewMoreTitle';

export default function SectionStyleThree({
  className,
  sectionTitle,
  seeMoreUrl,
  products = [],
}) {
  const rs = products.map((item) => {
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      thumbnail: item.thumbnail ? item.thumbnail : null,
      price: item.price,
      review: parseInt(item.rating_avg || 0),
      shop: item.shop,
      category: item.category,
    };
  });
  return (
    <div className={`section-style-one ${className || ''}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className='products-section w-full'>
          <div className='grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 xl:gap-[20px]'>
            <DataIteration datas={rs} startLength={0} endLength={rs.length}>
              {({ datas }) => (
                <div data-aos='fade-up' key={datas.id} className='item'>
                  <ProductCardStyleOne datas={datas} />
                </div>
              )}
            </DataIteration>
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  );
}
