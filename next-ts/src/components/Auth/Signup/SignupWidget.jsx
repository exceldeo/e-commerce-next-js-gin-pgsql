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
import { useRegistration } from '../../../api/auth/registration';

function SignupWidget() {
  const registration = useRegistration();

  const registrationForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      no_phone: '',
      name: '',
      password_confirmation: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .matches(/^[a-zA-Z0-9 ]*$/, 'Name is incorrect')
        .required('This field is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('This field is required'),
      no_phone: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .matches(/^[8].*$/, 'Wrong phone number format')
        .min(10, 'Must be 10 characters or more')
        .required('This field is required'),
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .matches(
          /^(?=.*[A-Z])/,
          'Must Contain Mininimum One Uppercase Character'
        )
        .matches(
          /^(?=.*[a-z])/,
          'Must Contain Mininimum One Lowercase Character'
        )
        .matches(/^(?=.*[0-9])/, 'Must Contain Mininimum One Number')
        .matches(
          /^(?=.*[!@#$%^&*])/,
          'Must Contain Mininimum One Special Character'
        )
        .required('This field is required'),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('This field is required'),
    }),

    onSubmit: (values) => {
      setLoading(true);
      registration.mutate({
        email: values.email,
        fullname: values.name,
        password: values.password,
        phone_no: values.no_phone,
      });
    },
  });

  useEffect(() => {
    if (registration.isSuccess) {
      toast.success('Registration Success');
      setLoading(false);
      router.push('/login');
    }
  }, [registration.isSuccess]);

  useEffect(() => {
    if (registration.isError) {
      toast.error(registration.error.response.data.message);
      setLoading(false);
    }
  }, [registration.isError]);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className='w-full'>
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
            placeholder={ServeLangItem()?.Name}
            label={ServeLangItem()?.Name}
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
          registrationForm.errors.name !== undefined ? (
            <span className='mt-1 text-sm text-qred'>
              {registrationForm.errors.name}
            </span>
          ) : (
            ''
          )}
        </div>

        <div className='input-item mb-5'>
          <InputCom
            placeholder={ServeLangItem()?.Email}
            label={ServeLangItem()?.Email_Address}
            name='email'
            type='email'
            inputClasses='h-[50px]'
            value={registrationForm.values.email}
            error={
              registrationForm.values.email !== '' &&
              registrationForm.errors.email !== undefined
            }
            inputHandler={registrationForm.handleChange}
            required
          />
          {registrationForm.values.email !== '' &&
          registrationForm.errors.email !== undefined ? (
            <span className='mt-1 text-sm text-qred'>
              {registrationForm.errors.email}
            </span>
          ) : (
            ''
          )}
        </div>
        <div className='input-item relative mb-5'>
          <InputCom
            placeholder={ServeLangItem()?.Phone_Number_Hint}
            label={ServeLangItem()?.phone}
            name='no_phone'
            type='text'
            inputClasses='h-[50px] placeholder:capitalize pl-20'
            value={registrationForm.values.no_phone}
            error={
              registrationForm.values.no_phone !== '' &&
              registrationForm.errors.no_phone !== undefined
            }
            inputHandler={registrationForm.handleChange}
            required
          />
          {registrationForm.values.no_phone !== '' &&
          registrationForm.errors.no_phone !== undefined ? (
            <span className='mt-1 text-sm text-qred'>
              {registrationForm.errors.no_phone}
            </span>
          ) : (
            ''
          )}
          <button
            className='absolute left-0 top-[29px] flex h-[50px] w-[70px] items-center justify-center bg-slate-100'
            disabled
          >
            <div className='flex items-center'>
              <span>+62</span>
            </div>
          </button>
        </div>

        <div className='mb-5 flex flex-col space-y-5 rtl:space-x-reverse sm:flex-row sm:space-y-0 sm:space-x-5'>
          <div className='h-full w-full'>
            <InputCom
              placeholder='* * * * * *'
              label={ServeLangItem()?.Password}
              name='password'
              type='password'
              inputClasses='h-[50px]'
              value={registrationForm.values.password}
              error={
                registrationForm.values.password !== '' &&
                registrationForm.errors.password !== undefined
              }
              inputHandler={registrationForm.handleChange}
              required
            />
            {registrationForm.values.password !== '' &&
            registrationForm.errors.password !== undefined ? (
              <span className='mt-1 text-sm text-qred'>
                {registrationForm.errors.password}
              </span>
            ) : (
              ''
            )}
          </div>
          <div className='h-full w-full'>
            <InputCom
              placeholder='* * * * * *'
              label={ServeLangItem()?.Confirm_Password}
              name='password_confirmation'
              type='password'
              inputClasses='h-[50px]'
              value={registrationForm.values.password_confirmation}
              error={
                registrationForm.values.password_confirmation !== '' &&
                registrationForm.errors.password_confirmation !== undefined
              }
              inputHandler={registrationForm.handleChange}
              required
            />
            {registrationForm.values.password_confirmation !== '' &&
            registrationForm.errors.password_confirmation !== undefined ? (
              <span className='mt-1 text-sm text-qred'>
                {registrationForm.errors.password_confirmation}
              </span>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className='signin-area mb-3'>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='black-btn bg-purple flex  h-[50px] w-full items-center justify-center font-semibold disabled:cursor-not-allowed disabled:bg-opacity-50'
            >
              <span className='block text-sm text-white'>
                {ServeLangItem()?.Create_Account}
              </span>
              {loading && (
                <span className='w-5 ' style={{ transform: 'scale(0.3)' }}>
                  <LoaderStyleOne />
                </span>
              )}
            </button>
          </div>
        </div>

        <div className='signup-area flex justify-center'>
          <p className='text-base font-normal text-qgraytwo'>
            {ServeLangItem()?.Already_have_an_Account}?
            <Link href='/login'>
              <span className='ml-2 cursor-pointer text-qblack'>
                {ServeLangItem()?.Log_In}
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignupWidget;
