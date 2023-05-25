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

const AddressForm = ({ toggle, setToggle }) => {
  const addAddress = useAddAddress();
  const addressForm = useFormik({
    initialValues: {
      name: '',
      province_id: '',
      province: '',
      city_id: '',
      city_name: '',
      address_detail: '',
      zip_code: '',
      is_default: true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      province_id: Yup.string().required('Required'),
      province: Yup.string().required('Required'),
      city_id: Yup.string().required('Required'),
      city_name: Yup.string().required('Required'),
      address_detail: Yup.string().required('Required'),
      zip_code: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      addAddress.mutate(values);
    },
  });

  useEffect(() => {
    if (addAddress.isSuccess) {
      addressForm.resetForm();
      toast.success(`Address added successfully`);
      setToggle(!toggle);
    }
  }, [addAddress.isSuccess, addressForm, setToggle, toggle]);

  if (addAddress.isError) {
    toast.error(
      addAddress?.Address?.error?.response?.data?.message ||
        addAddress?.Address?.error?.message ||
        addAddress?.Address?.error?.response?.data?.message ||
        addAddress?.Address?.error?.message
    );
  }

  const provinces = [
    { id: '1', name: 'Jakarta' },
    { id: '2', name: 'Jawa Barat' },
  ];

  const cities = [
    { id: '1', name: 'Jakarta Selatan' },
    { id: '2', name: 'Jakarta Barat' },
    { id: '3', name: 'Jakarta Timur' },
    { id: '4', name: 'Jakarta Utara' },
    { id: '5', name: 'Jakarta Pusat' },
  ];

  useEffect(() => {
    if (addressForm.values.province_id !== '') {
      addressForm.setFieldValue(
        'province',
        provinces.find((item) => item.id === addressForm.values.province_id)
          .name
      );
    }
    if (addressForm.values.city_id !== '') {
      console.log(
        cities.find((item) => item.id === addressForm.values.city_id)
      );
      addressForm.setFieldValue(
        'city_name',
        cities.find((item) => item.id === addressForm.values.city_id).name
      );
    }
  }, [addressForm.values.province_id, addressForm.values.city_id]);

  useEffect(() => {
    console.log(addressForm.values);
  }, [addressForm.values]);

  return (
    <div data-aos='zoom-in' className='w-full'>
      <div className='flex items-center justify-between'>
        <h1 className='mb-5 text-xl font-medium text-qblack sm:text-2xl'>
          {ServeLangItem()?.Add_new_address}
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
        <form onSubmit={addressForm.handleSubmit}>
          <div className='mb-6'>
            <div className='items-center sm:flex sm:space-x-5'>
              <div className='mb-5 w-full  sm:mb-0'>
                <InputCom
                  label={ServeLangItem()?.Name + '*'}
                  placeholder={ServeLangItem()?.Name}
                  inputClasses='w-full h-[50px]'
                  name='name'
                  value={addressForm.values.name}
                  inputHandler={addressForm.handleChange}
                  error={
                    addressForm.values.name !== '' &&
                    addressForm.errors.name !== undefined
                  }
                  required
                />
              </div>
            </div>
            {addressForm.values.name !== '' && addressForm.errors.name ? (
              <span className='mt-1 text-sm text-qred'>
                {addressForm.errors.name}
              </span>
            ) : (
              ''
            )}
          </div>

          <div className='input-item mb-5'>
            <InputSelect
              placeholder={ServeLangItem()?.Province}
              label={ServeLangItem()?.Province}
              name='province_id'
              type='text'
              inputClasses='h-[50px]'
              value={addressForm.values.province_id}
              inputHandler={addressForm.handleChange}
              error={
                addressForm.values.province_id !== '' &&
                addressForm.errors.province_id !== undefined
              }
              required
              options={provinces}
            />
            {addressForm.values.province_id !== '' &&
            addressForm.errors.province_id ? (
              <span classusername='mt-1 text-sm text-qred'>
                {addressForm.errors.province_id}
              </span>
            ) : (
              ''
            )}
          </div>
          <div className='input-item mb-5'>
            <InputSelect
              placeholder={ServeLangItem()?.City}
              label={ServeLangItem()?.City}
              name='city_id'
              type='text'
              inputClasses='h-[50px]'
              value={addressForm.values.city_id}
              inputHandler={addressForm.handleChange}
              error={
                addressForm.values.city_id !== '' &&
                addressForm.errors.city_id !== undefined
              }
              required
              options={cities}
            />
            {addressForm.values.city_id !== '' && addressForm.errors.city_id ? (
              <span classusername='mt-1 text-sm text-qred'>
                {addressForm.errors.city_id}
              </span>
            ) : (
              ''
            )}
          </div>

          <div className=' mb-6'>
            <div className='w-full'>
              <InputCom
                name='zip_code'
                value={addressForm.values.zip_code}
                onChange={addressForm.handleChange}
                label={ServeLangItem()?.Zip_Code + '*'}
                placeholder={ServeLangItem()?.Zip_code}
                inputClasses='w-full h-[50px]'
                error={
                  addressForm.values.zip_code !== '' &&
                  addressForm.errors.zip_code !== undefined
                }
                required
              />
              {addressForm.values.zip_code !== '' &&
              addressForm.errors.zip_code ? (
                <span className='mt-1 text-sm text-qred'>
                  {addressForm.errors.zip_code}
                </span>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className=' mb-6'>
            <div className='w-full'>
              <InputCom
                name='address_detail'
                value={addressForm.values.address}
                onChange={addressForm.handleChange}
                label={ServeLangItem()?.Address + '*'}
                placeholder={ServeLangItem()?.your_address_here}
                inputClasses='w-full h-[50px]'
                error={
                  addressForm.values.address !== '' &&
                  addressForm.errors.address !== undefined
                }
                required
              />
              {addressForm.values.address !== '' &&
              addressForm.errors.address ? (
                <span className='mt-1 text-sm text-qred'>
                  {addressForm.errors.address}
                </span>
              ) : (
                ''
              )}
            </div>
          </div>

          <button type='submit' className='h-[50px] w-full'>
            <div className='yellow-btn'>
              <span className='text-sm'>Save Address</span>
              {addAddress.isLoading && (
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

export default AddressForm;
