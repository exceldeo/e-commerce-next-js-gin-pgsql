import Head from 'next/head';
import React from 'react';

function PageHead(props) {
  const { title } = props;
  const { metaDes } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={metaDes} />
      <link rel='shortcut icon' href={'/favico.svg'} />
    </Head>
  );
}

export default PageHead;
