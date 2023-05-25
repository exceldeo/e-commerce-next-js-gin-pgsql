import { useState } from 'react';

import AddressForm from '../../../AddressForm';
import PaymentList from '../../../PaymentList';
import ServeLangItem from '../../../Helpers/ServeLangItem';
import PaymentForm from '../../../PaymentForm';

export default function PaymentTab() {
  const [newPayment, setNewPayment] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <>
      <div className='mt-4 mb-5 h-[50px] w-[180px]'>
        <button
          type='button'
          className='yellow-btn rounded'
          onClick={() => setNewPayment(!newPayment)}
        >
          <div className='w-full text-sm font-semibold'>
            {ServeLangItem()?.Add_New_Payment}
          </div>
        </button>
      </div>
      {newPayment ? (
        <PaymentForm toggle={newPayment} setToggle={setNewPayment} />
      ) : (
        <PaymentList />
      )}
    </>
  );
}
