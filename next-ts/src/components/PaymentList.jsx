import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ServeLangItem from './Helpers/ServeLangItem';
import { useGetPayment } from '../api/payment';

const PaymentList = ({ selected, setSelected, setEdit }) => {
  const [defaultPayment, setDefaultPayment] = useState(null);

  const { data, isSuccess } = useGetPayment();

  useEffect(() => {
    if (isSuccess) {
      const payment = data?.find((payment) => payment?.is_default === true);

      setSelected ? setSelected(payment) : setDefaultPayment(payment);
    }
  }, [isSuccess, data, setSelected]);

  return (
    <div data-aos='zoom-in' className='grid grid-cols-1 gap-3'>
      {data &&
        data.length > 0 &&
        data.map((payment, i) => (
          <div
            key={i}
            className={`relative w-full cursor-pointer border p-5 ${
              selected?.id === payment.id || defaultPayment?.id === payment.id
                ? 'border-qyellow bg-[#FFFAEF]'
                : 'border-transparent bg-primarygray'
            }`}
          >
            <div className='flex items-center justify-between'>
              <p className='title text-[22px] font-semibold'>
                {ServeLangItem()?.Payment_Method} #{i + 1}
              </p>
            </div>
            <div className='mt-5'>
              <p className='text-base font-medium text-qgray line-clamp-1'>
                <span className='capitalize text-qblack'>
                  {payment.bank_name}
                </span>
                {`,${payment.card_number}`}
              </p>
            </div>
            {(selected?.id === payment.id ||
              defaultPayment?.id === payment.id) && (
              <span className='absolute right-2 -top-2 bg-qyellow px-2 text-sm font-medium text-qblack'>
                {ServeLangItem()?.Selected}
              </span>
            )}
          </div>
        ))}
    </div>
  );
};

export default PaymentList;
