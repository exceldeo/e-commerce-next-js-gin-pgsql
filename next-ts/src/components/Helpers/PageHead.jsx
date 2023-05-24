import Head from 'next/head';
import React from 'react';

import CIPCC from '../../../public/assets/images/CIPCC.png';

function PageHead(props) {
  const { title } = props;
  const { metaDes } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={metaDes} />
      <link rel='shortcut icon' type='image/png' href={CIPCC.src} />
    </Head>
  );
}

export default PageHead;
