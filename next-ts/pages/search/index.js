import React from 'react';

import AllProductPage from '../../src/components/AllProductPage/index';
import PageHead from '../../src/components/Helpers/PageHead';

export default function allproductsPage() {
  return (
    <>
      <PageHead title='search | products' />
      <AllProductPage />
    </>
  );
}
