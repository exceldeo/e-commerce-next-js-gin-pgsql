import { useFormik } from 'formik';
import Image from 'next/dist/client/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import InputCom from '../../Helpers/InputCom';
import LoaderStyleOne from '../../Helpers/Loaders/LoaderStyleOne';
import ServeLangItem from '../../Helpers/ServeLangItem';
import LoginImage from '../../../../public/assets/images/login-image.png';
import {
  useResetPassword,
  useUpdatePassword,
} from '../../../api/auth/forgotPass';

export default function ForgotPass() {
  const requestForgot = useResetPassword();

  const requestForgotForm = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      requestForgot.mutate(values.email);
    },
  });

  useEffect(() => {
    if (requestForgot.isSuccess) {
      setLoading(false);
      toast.success('Email Sent Successfully');
      updatePasswordForm.values.email = requestForgotForm.values.email;
      setForgotUser(false);
      setResetpass(true);
    }
  }, [requestForgot.isSuccess]);

  const updatePassword = useUpdatePassword();

  const updatePasswordForm = useFormik({
    initialValues: {
      email: '',
      otp: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      otp: Yup.string().required('Required'),
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
      updatePassword.mutate({
        email: values.email,
        password: values.password,
        token: values.otp,
      });
    },
  });

  useEffect(() => {
    if (updatePassword.isSuccess) {
      toast.success('Password Updated Successfully');
      setLoading(false);
      router.push('/login');
    }
  }, [updatePassword.isSuccess]);

  useEffect(() => {
    if (updatePassword.isError) {
      setLoading(false);
      toast.error(updatePassword.error.response.data.message);
    }
  }, [updatePassword.isError]);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resetPass, setResetpass] = useState(false);
  const [forgotUser, setForgotUser] = useState(true);

  return (
    <div className='min-h-screen w-full pt-0 pb-0 '>
      <div className='login-page-wrapper w-full py-10'>
        <div className='container-x mx-auto'>
          <div className='relative items-center lg:flex'>
            <div className='flex h-[783px] w-full flex-col justify-center border border-[#E0E0E0] bg-white p-5 sm:p-10 lg:w-[572px]'>
              {forgotUser ? (
                <form
                  className='w-full'
                  onSubmit={requestForgotForm.handleSubmit}
                >
                  <div className='title-area relative mb-7 flex flex-col items-center justify-center text-center'>
                    <h1 className='text-[34px] font-bold capitalize leading-[74px] text-qblack'>
                      {ServeLangItem()?.Forgot_password}
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
                  <div className='input-area'>
                    <div className='input-item mb-5'>
                      <InputCom
                        placeholder={ServeLangItem()?.Email_Address}
                        label={ServeLangItem()?.Email_Address}
                        name='email'
                        type='email'
                        inputClasses='h-[50px]'
                        inputHandler={requestForgotForm.handleChange}
                        value={requestForgotForm.values.email}
                      />
                    </div>

                    <div className='signin-area mb-3.5'>
                      <div className='flex justify-center'>
                        <button
                          type='submit'
                          disabled={
                            requestForgotForm.values.email ? false : true
                          }
                          className='black-btn bg-purple mb-6  flex h-[50px] w-full items-center justify-center text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-opacity-50'
                        >
                          <span>{ServeLangItem()?.Send}</span>
                          {loading && (
                            <span
                              className='w-5 '
                              style={{ transform: 'scale(0.3)' }}
                            >
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
                  </div>
                </form>
              ) : resetPass ? (
                <form
                  className='w-full'
                  onSubmit={updatePasswordForm.handleSubmit}
                >
                  <div className='title-area relative mb-7 flex flex-col items-center justify-center text-center'>
                    <h1 className='text-[34px] font-bold leading-[74px] text-qblack'>
                      {ServeLangItem()?.Reset_Password}
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
                  <div className='input-area'>
                    <div className='input-item mb-5'>
                      <InputCom
                        placeholder='XXXXXX'
                        label={ServeLangItem()?.OTP}
                        name='otp'
                        type='text'
                        inputClasses='h-[50px]'
                        value={updatePasswordForm.values.otp}
                        error={
                          updatePasswordForm.values.otp !== '' &&
                          updatePasswordForm.errors.otp !== undefined
                        }
                        inputHandler={updatePasswordForm.handleChange}
                      />
                      {updatePasswordForm.values.otp !== '' &&
                      updatePasswordForm.errors.otp !== undefined ? (
                        <span className='mt-1 text-sm text-qred'>
                          {updatePasswordForm.errors.otp}
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className='input-item mb-5'>
                      <InputCom
                        placeholder='* * * * * *'
                        label={ServeLangItem()?.New_Password}
                        name='password'
                        type='password'
                        inputClasses='h-[50px]'
                        value={updatePasswordForm.values.password}
                        error={
                          updatePasswordForm.values.password !== '' &&
                          updatePasswordForm.errors.password !== undefined
                        }
                        inputHandler={updatePasswordForm.handleChange}
                        required
                      />
                      {updatePasswordForm.values.password !== '' &&
                      updatePasswordForm.errors.password !== undefined ? (
                        <span className='mt-1 text-sm text-qred'>
                          {updatePasswordForm.errors.password}
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className='input-item mb-5'>
                      <InputCom
                        placeholder='* * * * * *'
                        label={ServeLangItem()?.Confirm_Password + '*'}
                        name='password_confirmation'
                        type='password'
                        inputClasses='h-[50px]'
                        value={updatePasswordForm.values.password_confirmation}
                        error={
                          updatePasswordForm.values.password_confirmation !==
                            '' &&
                          updatePasswordForm.errors.password_confirmation !==
                            undefined
                        }
                        inputHandler={updatePasswordForm.handleChange}
                        required
                      />
                      {updatePasswordForm.values.password_confirmation !== '' &&
                      updatePasswordForm.errors.password_confirmation !==
                        undefined ? (
                        <span className='mt-1 text-sm text-qred'>
                          {updatePasswordForm.errors.password_confirmation}
                        </span>
                      ) : (
                        ''
                      )}
                    </div>

                    <div className='signin-area mb-3.5'>
                      <div className='flex justify-center'>
                        <button
                          type='submit'
                          disabled={
                            updatePasswordForm.values.otp &&
                            updatePasswordForm.values.password &&
                            updatePasswordForm.values.password_confirmation
                              ? false
                              : true
                          }
                          className='black-btn bg-purple mb-6  flex h-[50px] w-full items-center justify-center text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-opacity-50'
                        >
                          <span>{ServeLangItem()?.Reset}</span>
                          {loading && (
                            <span
                              className='w-5 '
                              style={{ transform: 'scale(0.3)' }}
                            >
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
                  </div>
                </form>
              ) : (
                ''
              )}
            </div>
            <div className='hidden flex-1 scale-60 transform lg:flex xl:scale-100   xl:justify-center '>
              <div
                className='absolute ltr:-right-[138px] rtl:-left-20 ltr:xl:-right-20 '
                style={{ top: 'calc(50% - 258px)' }}
              >
                <Image width={608} height={480} src={LoginImage} alt='login' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
