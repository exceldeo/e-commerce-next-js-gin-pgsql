import React from 'react';

import Login from './../src/components/Auth/Login/index';
import PageHead from '../src/components/Helpers/PageHead';

export default function login() {
  return (
    <>
      <PageHead title='CIPCC | Login' />
      <Login />
    </>
  );
}
