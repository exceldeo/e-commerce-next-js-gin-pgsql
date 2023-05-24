import { useState } from 'react';

import AddressForm from '../../../AddressForm';
import AddressList from '../../../AddressList';
import ServeLangItem from '../../../Helpers/ServeLangItem';

export default function AddressesTab() {
  const [newAddress, setNewAddress] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <>
      <div className='mt-4 mb-5 h-[50px] w-[180px]'>
        <button type='button' className='yellow-btn rounded' onClick={() => setNewAddress(!newAddress)}>
          <div className='w-full text-sm font-semibold'>
            {ServeLangItem()?.Add_New_Address}
          </div>
        </button>
      </div>
      {edit && <AddressForm toggle={edit} setToggle={setEdit} edited />}
      {newAddress ? (
        <AddressForm toggle={newAddress} setToggle={setNewAddress} />
      ) : (
        <AddressList setEdit={setEdit} />
      )}
    </>
  );
}
