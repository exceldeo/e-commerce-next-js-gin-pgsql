import { useFormik } from 'formik';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import InputCom from './Helpers/InputCom';
import LoaderStyleOne from './Helpers/Loaders/LoaderStyleOne';
import Selectbox from './Helpers/Selectbox';
import ServeLangItem from './Helpers/ServeLangItem';
import {
  useAddAddress,
  useEditAddress,
  useGetAddressById,
  useGetCity,
  useGetDistrict,
  useGetProvince,
  useGetVillage,
} from '../api/address';

const AddressForm = ({ toggle, setToggle, edited }) => {
  const { data } = useGetAddressById(toggle, edited);

  const addAddress = useAddAddress();
  const editAddress = useEditAddress();
  const addressForm = useFormik({
    initialValues: {
      name: data?.address?.name || '',
      province: data?.address?.province_code || '',
      city: data?.address?.city_code || '',
      district: data?.address?.district_code || '',
      village: data?.address?.village_code || '',
      address: data?.address?.address_detail || '',
      zip_code: data?.address?.zip_code || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      province: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      district: Yup.string().required('Required'),
      village: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      zip_code: Yup.string().length(5, 'Must be 5 characters').required(),
    }),
    onSubmit: (values) => {
      edited
        ? editAddress.mutate({ ...values, id: toggle })
        : addAddress.mutate(values);
    },
  });

  useEffect(() => {
    if (addAddress.isSuccess || editAddress.isSuccess) {
      addressForm.resetForm();
      toast.success(`Address ${edited ? 'updated' : 'added'} successfully`);
      setToggle(!toggle);
    }
  }, [
    addAddress.isSuccess,
    addressForm,
    editAddress.isSuccess,
    edited,
    setToggle,
    toggle,
  ]);

  if (addAddress.isError || editAddress.isError) {
    toast.error(
      addAddress?.Address?.error?.response?.data?.message ||
        addAddress?.Address?.error?.message ||
        addAddress?.Address?.error?.response?.data?.message ||
        addAddress?.Address?.error?.message
    );
  }

  const { data: province } = useGetProvince();
  const { data: city } = useGetCity(addressForm.values.province);
  const { data: district } = useGetDistrict(addressForm.values.city);
  const { data: village } = useGetVillage(addressForm.values.district);

  const getProvinceName = (code) => {
    const search = province?.find((item) => item.code === code);
    return search?.name;
  };

  const getCityName = (code) => {
    const search = city?.find((item) => item.code === code);
    return search?.name;
  };

  const getDistrictName = (code) => {
    const search = district?.find((item) => item.code === code);
    return search?.name;
  };

  const getVillageName = (code) => {
    const search = village?.find((item) => item.code === code);
    return search?.name;
  };

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

          <div className='mb-6 flex items-center space-x-5'>
            <div className='w-1/2'>
              <h1 className='input-label mb-2 block  text-[13px] font-normal capitalize text-qgray'>
                {ServeLangItem()?.Province}*
              </h1>
              <div
                className={`mb-2 flex h-[50px] w-full items-center justify-between border px-5 ${
                  addressForm.values.province !== '' &&
                  addressForm.errors.province !== undefined
                    ? 'border-qred'
                    : 'border-[#EDEDED]'
                }`}
              >
                <Selectbox
                  action={(value) => {
                    addressForm.setFieldValue('province', value.code);
                  }}
                  className='w-full'
                  defaultValue={getProvinceName(addressForm.values.province)}
                  datas={province}
                >
                  {({ item }) => (
                    <>
                      <div className='flex w-full items-center justify-between'>
                        <div>
                          <span className='text-[13px] text-qblack'>
                            {item}
                          </span>
                        </div>
                        <span>
                          <svg
                            width='11'
                            height='7'
                            viewBox='0 0 11 7'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z'
                              fill='#222222'
                            />
                          </svg>
                        </span>
                      </div>
                    </>
                  )}
                </Selectbox>
              </div>
              {addressForm.values.province !== '' &&
              addressForm.errors.province ? (
                <span className='mt-1 text-sm text-qred'>
                  {addressForm.errors.province}
                </span>
              ) : (
                ''
              )}
            </div>
            <div className='w-1/2'>
              <h1 className='input-label mb-2 block  text-[13px] font-normal capitalize text-qgray'>
                {ServeLangItem()?.City}*
              </h1>
              <div
                className={`mb-2 flex h-[50px] w-full items-center justify-between border px-5 ${
                  addressForm.values.city !== '' &&
                  addressForm.errors.city !== undefined
                    ? 'border-qred'
                    : 'border-[#EDEDED]'
                }`}
              >
                <Selectbox
                  action={(value) => {
                    addressForm.setFieldValue('city', value.code);
                  }}
                  className='w-full'
                  defaultValue={getCityName(addressForm.values.city)}
                  datas={city}
                >
                  {({ item }) => (
                    <>
                      <div className='flex w-full items-center justify-between'>
                        <div>
                          <span className='text-[13px] text-qblack'>
                            {item}
                          </span>
                        </div>
                        <span>
                          <svg
                            width='11'
                            height='7'
                            viewBox='0 0 11 7'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z'
                              fill='#222222'
                            />
                          </svg>
                        </span>
                      </div>
                    </>
                  )}
                </Selectbox>
              </div>
              {addressForm.values.city !== '' && addressForm.errors.city ? (
                <span className='mt-1 text-sm text-qred'>
                  {addressForm.errors.city}
                </span>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className='mb-6 flex items-center space-x-5'>
            <div className='w-1/2'>
              <h1 className='input-label mb-2 block  text-[13px] font-normal capitalize text-qgray'>
                {ServeLangItem()?.District}*
              </h1>
              <div
                className={`mb-2 flex h-[50px] w-full items-center justify-between border px-5 ${
                  addressForm.values.district !== '' &&
                  addressForm.errors.district !== undefined
                    ? 'border-qred'
                    : 'border-[#EDEDED]'
                }`}
              >
                <Selectbox
                  action={(value) => {
                    addressForm.setFieldValue('district', value.code);
                  }}
                  className='w-full'
                  defaultValue={getDistrictName(addressForm.values.district)}
                  datas={district}
                >
                  {({ item }) => (
                    <>
                      <div className='flex w-full items-center justify-between'>
                        <div>
                          <span className='text-[13px] text-qblack'>
                            {item}
                          </span>
                        </div>
                        <span>
                          <svg
                            width='11'
                            height='7'
                            viewBox='0 0 11 7'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z'
                              fill='#222222'
                            />
                          </svg>
                        </span>
                      </div>
                    </>
                  )}
                </Selectbox>
              </div>
              {addressForm.values.district !== '' &&
              addressForm.errors.district ? (
                <span className='mt-1 text-sm text-qred'>
                  {addressForm.errors.district}
                </span>
              ) : (
                ''
              )}
            </div>
            <div className='w-1/2'>
              <h1 className='input-label mb-2 block  text-[13px] font-normal capitalize text-qgray'>
                {ServeLangItem()?.Village}*
              </h1>
              <div
                className={`mb-2 flex h-[50px] w-full items-center justify-between border px-5 ${
                  addressForm.values.village !== '' &&
                  addressForm.errors.village !== undefined
                    ? 'border-qred'
                    : 'border-[#EDEDED]'
                }`}
              >
                <Selectbox
                  action={(value) => {
                    addressForm.setFieldValue('village', value.code);
                  }}
                  className='w-full'
                  defaultValue={getVillageName(addressForm.values.village)}
                  datas={village}
                >
                  {({ item }) => (
                    <>
                      <div className='flex w-full items-center justify-between'>
                        <div>
                          <span className='text-[13px] text-qblack'>
                            {item}
                          </span>
                        </div>
                        <span>
                          <svg
                            width='11'
                            height='7'
                            viewBox='0 0 11 7'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z'
                              fill='#222222'
                            />
                          </svg>
                        </span>
                      </div>
                    </>
                  )}
                </Selectbox>
              </div>
              {addressForm.values.village !== '' &&
              addressForm.errors.village ? (
                <span className='mt-1 text-sm text-qred'>
                  {addressForm.errors.village}
                </span>
              ) : (
                ''
              )}
            </div>
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
                name='address'
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
