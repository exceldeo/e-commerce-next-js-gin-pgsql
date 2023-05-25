import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import InputCom from '../../Helpers/InputCom';
import InputSelect from '../../Helpers/InputSelect';
import LoaderStyleOne from '../../Helpers/Loaders/LoaderStyleOne';
import ServeLangItem from '../../Helpers/ServeLangItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function SignupWidget() {
  const registrationForm = useFormik({
    initialValues: {
      name: '',
      username: '',
      proviceId: '',
      provice: '',
      cityId: '',
      city: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      username: Yup.string().required('Username is required'),
      proviceId: Yup.string().required('Province is required'),
      provice: Yup.string().required('Province is required'),
      cityId: Yup.string().required('City is required'),
      city: Yup.string().required('City is required'),
    }),

    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
    },
  });

  const router = useRouter();
  const [checked, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const rememberMe = () => {
    setCheck(!checked);
  };

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
    if (registrationForm.values.proviceId !== '') {
      registrationForm.setFieldValue(
        'provice',
        provinces.find((item) => item.id === registrationForm.values.proviceId)
          .name
      );
    }
    if (registrationForm.values.cityId !== '') {
      registrationForm.setFieldValue(
        'city',
        cities.find((item) => item.id === registrationForm.values.cityId).name
      );
    }
  }, [registrationForm.values.proviceId, registrationForm.values.provice]);

  return (
    <div className='w-full'>
      <FontAwesomeIcon
        icon={faTimes}
        className='absolute top-0 right-0 mt-5 mr-5 cursor-pointer text-qblack'
        onClick={() => router.back()}
      />
      <div className='title-area relative mb-7 flex flex-col items-center justify-center text-center'>
        <h1 className='text-[34px] font-bold leading-[74px] text-qblack'>
          {ServeLangItem()?.Create_Account}
        </h1>
        <div className='shape -mt-6'>
          <svg
            width='354'
            height='30'
            viewBox='0 0 354 30'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1'
              stroke='#FFBB38'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </div>
      </div>
      <form className='input-area' onSubmit={registrationForm.handleSubmit}>
        <div className='input-item mb-5'>
          <InputCom
            placeholder={ServeLangItem()?.Name + ' ' + ServeLangItem()?.Shop}
            label={ServeLangItem()?.Name + ' ' + ServeLangItem()?.Shop}
            name='name'
            type='text'
            inputClasses='h-[50px]'
            value={registrationForm.values.name}
            inputHandler={registrationForm.handleChange}
            error={
              registrationForm.values.name !== '' &&
              registrationForm.errors.name !== undefined
            }
            required
          />
          {registrationForm.values.name !== '' &&
          registrationForm.errors.name ? (
            <span className='mt-1 text-sm text-qred'>
              {registrationForm.errors.name}
            </span>
          ) : (
            ''
          )}
        </div>
        <div className='input-item mb-5'>
          <InputCom
            placeholder={
              ServeLangItem()?.Username + ' ' + ServeLangItem()?.Shop
            }
            label={ServeLangItem()?.Username + ' ' + ServeLangItem()?.Shop}
            name='username'
            type='text'
            inputClasses='h-[50px]'
            value={registrationForm.values.username}
            inputHandler={registrationForm.handleChange}
            error={
              registrationForm.values.username !== '' &&
              registrationForm.errors.username !== undefined
            }
            required
          />
          {registrationForm.values.username !== '' &&
          registrationForm.errors.username ? (
            <span classusername='mt-1 text-sm text-qred'>
              {registrationForm.errors.username}
            </span>
          ) : (
            ''
          )}
        </div>
        <div className='input-item mb-5'>
          <InputSelect
            placeholder={ServeLangItem()?.Province}
            label={ServeLangItem()?.Province}
            name='proviceId'
            type='text'
            inputClasses='h-[50px]'
            value={registrationForm.values.proviceId}
            inputHandler={registrationForm.handleChange}
            error={
              registrationForm.values.proviceId !== '' &&
              registrationForm.errors.proviceId !== undefined
            }
            required
            options={provinces}
          />
          {registrationForm.values.proviceId !== '' &&
          registrationForm.errors.proviceId ? (
            <span classusername='mt-1 text-sm text-qred'>
              {registrationForm.errors.proviceId}
            </span>
          ) : (
            ''
          )}
        </div>
        <div className='input-item mb-5'>
          <InputSelect
            placeholder={ServeLangItem()?.City}
            label={ServeLangItem()?.City}
            name='cityId'
            type='text'
            inputClasses='h-[50px]'
            value={registrationForm.values.cityId}
            inputHandler={registrationForm.handleChange}
            error={
              registrationForm.values.cityId !== '' &&
              registrationForm.errors.cityId !== undefined
            }
            required
            options={cities}
          />
          {registrationForm.values.cityId !== '' &&
          registrationForm.errors.cityId ? (
            <span classusername='mt-1 text-sm text-qred'>
              {registrationForm.errors.cityId}
            </span>
          ) : (
            ''
          )}
        </div>

        <div className='signin-area mb-3'>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='black-btn bg-purple flex  h-[50px] w-full items-center justify-center font-semibold disabled:cursor-not-allowed disabled:bg-opacity-50'
            >
              <span className='block text-sm text-white'>
                {ServeLangItem()?.Create_Account + ' ' + ServeLangItem()?.Shop}
              </span>
              {loading && (
                <span className='w-5 ' style={{ transform: 'scale(0.3)' }}>
                  <LoaderStyleOne />
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupWidget;
