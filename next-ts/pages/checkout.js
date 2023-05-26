import React from 'react';

import CheckoutPage from '../src/components/CheckoutPage';
import PageHead from '../src/components/Helpers/PageHead';
import Layout from '../src/components/Partials/Layout';

function checkout() {
  return (
    <>
      <PageHead title='Checkout' />
      <Layout childrenClasses='pt-0 pb-0'>
        <CheckoutPage />
      </Layout>
    </>
  );
}
export default checkout;
