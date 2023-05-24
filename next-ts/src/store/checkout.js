import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkout: [],
};

export const checkoutSetup = createSlice({
  name: 'checkout-setup',
  initialState,
  reducers: {
    addItemCheckout: (state, payload) => {
      // check if another vendor is added
      if (
        state.checkout.length > 0 &&
        state.checkout[0].vendor_id !== payload.payload.vendor_id
      ) {
        return {
          ...state,
          checkout: [payload.payload],
        };
      }

      return {
        ...state,
        checkout: [...state.checkout, payload.payload],
      };
    },
    removeItemCheckout: (state, payload) => {
      return {
        ...state,
        checkout: state.checkout.filter((item) => item.id !== payload.payload),
      };
    },
    clearItemCheckout: (state) => {
      return {
        ...state,
        checkout: [],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemCheckout, removeItemCheckout, clearItemCheckout } =
  checkoutSetup.actions;
export default checkoutSetup.reducer;
