import { configureStore } from '@reduxjs/toolkit';

import checkout from './checkout';
import language from './language';

export default configureStore({
  reducer: {
    language: language,
    checkout: checkout,
  },
});
