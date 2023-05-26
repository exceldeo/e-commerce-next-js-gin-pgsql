import React from 'react';

import Signup from '../src/components/Auth/Signup/index.jsx';
import PageHead from '../src/components/Helpers/PageHead.jsx';
const signupPage = () => {
  return (
    <>
      <PageHead title='signup' />
      <Signup />
    </>
  );
};

export default signupPage;
