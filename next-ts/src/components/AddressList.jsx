import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ServeLangItem from './Helpers/ServeLangItem';
import { useGetAddress } from '../api/address';

const AddressList = ({ selected, setSelected }) => {
  const [defaultAddress, setDefaultAddress] = useState(null);

  const { data, isSuccess } = useGetAddress();

  useEffect(() => {
    if (isSuccess) {
      const address = data?.find((address) => address?.is_default === true);

      setSelected ? setSelected(address) : setDefaultAddress(address);
    }
  }, [isSuccess, data, setSelected]);

  return (
    <div data-aos='zoom-in' className='grid grid-cols-1 gap-3'>
      {data &&
        data.length > 0 &&
        data.map((address, i) => (
          <div
            key={i}
            className={`relative w-full cursor-pointer border p-5 ${
              selected?.id === address.id || defaultAddress?.id === address.id
                ? 'border-qyellow bg-[#FFFAEF]'
                : 'border-transparent bg-primarygray'
            }`}
          >
            <div className='flex items-center justify-between'>
              <p className='title text-[22px] font-semibold'>
                {ServeLangItem()?.Address} #{i + 1}
              </p>
            </div>
            <div className='mt-5'>
              <p className='text-base font-medium text-qgray line-clamp-1'>
                <span className='capitalize text-qblack'>{address.name}</span>
                {`, ${address.address_detail}, ${address.zip_code}`}
              </p>
            </div>
            {(selected?.id === address.id ||
              defaultAddress?.id === address.id) && (
              <span className='absolute right-2 -top-2 bg-qyellow px-2 text-sm font-medium text-qblack'>
                {ServeLangItem()?.Selected}
              </span>
            )}
          </div>
        ))}
    </div>
  );
};

export default AddressList;
