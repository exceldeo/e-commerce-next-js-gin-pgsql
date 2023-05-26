import { useFormik } from 'formik';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import InputCom from './Helpers/InputCom';
import LoaderStyleOne from './Helpers/Loaders/LoaderStyleOne';
import Selectbox from './Helpers/Selectbox';
import ServeLangItem from './Helpers/ServeLangItem';
import { useAddAddress } from '../api/address';
import InputSelect from './Helpers/InputSelect';
import { useAddPayment } from '../api/payment';

const PaymentForm = ({ toggle, setToggle }) => {
  const addPayment = useAddPayment();
  const paymentForm = useFormik({
    initialValues: {
      bank_name: '',
      card_number: '',
      is_default: true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      bank_name: Yup.string().required('Required'),
      card_number: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      addPayment.mutate(values);
    },
  });

  useEffect(() => {
    if (addPayment.isSuccess) {
      paymentForm.resetForm();
      toast.success(`Address added successfully`);
      setToggle(!toggle);
    }
  }, [addPayment.isSuccess, paymentForm, setToggle, toggle]);

  if (addPayment.isError) {
    toast.error(
      addPayment?.Address?.error?.response?.data?.message ||
        addPayment?.Address?.error?.message ||
        addPayment?.Address?.error?.response?.data?.message ||
        addPayment?.Address?.error?.message
    );
  }

  return (
    <div data-aos='zoom-in' className='w-full'>
      <div className='flex items-center justify-between'>
        <h1 className='mb-5 text-xl font-medium text-qblack sm:text-2xl'>
          {ServeLangItem()?.Add_New_Payment}
        </h1>
        <span
          onClick={() => setToggle(!toggle)}
          className='cursor-pointer text-qyellow'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
              clipRule='evenodd'
            />
          </svg>
        </span>
      </div>
      <div className='form-area'>
        <form onSubmit={paymentForm.handleSubmit}>
          <div className='mb-6'>
            <div className='items-center sm:flex sm:space-x-5'>
              <div className='mb-5 w-full  sm:mb-0'>
                <InputCom
                  label={ServeLangItem()?.Bank_Name + '*'}
                  placeholder={ServeLangItem()?.Bank_Name}
                  inputClasses='w-full h-[50px]'
                  name='bank_name'
                  value={paymentForm.values.bank_name}
                  inputHandler={paymentForm.handleChange}
                  error={
                    paymentForm.values.bank_name !== '' &&
                    paymentForm.errors.bank_name !== undefined
                  }
                  required
                />
              </div>
            </div>
            {paymentForm.values.bank_name !== '' &&
            paymentForm.errors.bank_name ? (
              <span className='mt-1 text-sm text-qred'>
                {paymentForm.errors.bank_name}
              </span>
            ) : (
              ''
            )}
          </div>

          <div className=' mb-6'>
            <div className='w-full'>
              <InputCom
                name='card_number'
                value={paymentForm.values.card_number}
                onChange={paymentForm.handleChange}
                label={ServeLangItem()?.Card_Number + '*'}
                placeholder={ServeLangItem()?.Card_Number}
                inputClasses='w-full h-[50px]'
                error={
                  paymentForm.values.card_number !== '' &&
                  paymentForm.errors.card_number !== undefined
                }
                required
              />
              {paymentForm.values.card_number !== '' &&
              paymentForm.errors.card_number ? (
                <span className='mt-1 text-sm text-qred'>
                  {paymentForm.errors.card_number}
                </span>
              ) : (
                ''
              )}
            </div>
          </div>

          <button type='submit' className='h-[50px] w-full'>
            <div className='yellow-btn'>
              <span className='text-sm'>Save Address</span>
              {addPayment.isLoading && (
                <span className='w-5 ' style={{ transform: 'scale(0.3)' }}>
                  <LoaderStyleOne />
                </span>
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
