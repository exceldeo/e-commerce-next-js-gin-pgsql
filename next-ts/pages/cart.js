import React from 'react';

import CartPage from './../src/components/CartPage/index';
import PageHead from '../src/components/Helpers/PageHead';
import Layout from '../src/components/Partials/Layout';

function cart() {
  return (
    <>
      <PageHead title='CIPCC | Cart' />
      <Layout>
        <CartPage />
      </Layout>
    </>
  );
}
export default cart;
