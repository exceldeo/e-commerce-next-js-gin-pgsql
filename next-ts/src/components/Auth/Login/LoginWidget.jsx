import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import InputCom from '../../Helpers/InputCom';
import LoaderStyleOne from '../../Helpers/Loaders/LoaderStyleOne';
import ServeLangItem from '../../Helpers/ServeLangItem';
import { useLogin, useRequestOTP } from '../../../api/auth/login';

function LoginWidget() {
  const [requsetOtpPage, setRequsetOtpPage] = useState(false);

  const login = useLogin();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      otp: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      login.mutate({
        email: values.email,
        password: values.password,
        otp: values.otp,
      });
    },
  });

  useEffect(() => {
    if (login.isSuccess) {
      toast.success('Login Success');
      setLoading(false);
      router.push('/');
    }
  }, [login.isSuccess]);

  useEffect(() => {
    if (login.isError) {
      setLoading(false);
      if (login.error.response.data.errcode === '401') {
        toast.error('Email or Password is Incorrect');
        setRequsetOtpPage(false);
        return;
      }
      if (login.error.response.data.errcode === '1019') {
        toast.error(login.error.response.data.message);
        setRequsetOtpPage(true);
        return;
      }
      toast.error(login.error.response.data.message);
    }
  }, [login.isError]);

  const requestOtp = useRequestOTP();

  const requestOtpForm = useFormik({
    initialValues: {
      email: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      requestOtp.mutate({
        email: values.email,
      });
    },
  });

  useEffect(() => {
    if (requestOtp.isSuccess) {
      toast.success('OTP Sent Successfully, Please Check Your Inbox or Spam');
      setLoading(false);
      setRequsetOtpPage(true);
    }
  }, [requestOtp.isSuccess]);

  useEffect(() => {
    if (requestOtp.isError) {
      setLoading(false);
      if (requestOtp.error.response.data.errcode === '1017') {
        toast.error('OTP Already Sent, Please Check Your Inbox or Spam');
        setRequsetOtpPage(true);
        return;
      }
      toast.error(requestOtp.error.response.data.message);
    }
  }, [requestOtp.isError]);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checked, setValue] = useState(false);
  const rememberMe = () => {
    setValue(!checked);
  };

  return (
    <div className='w-full'>
      <Link href='/' passHref>
        <a className='absolute top-0 left-0 mt-5 ml-5'>
          <FontAwesomeIcon icon={['fas', 'arrow-left']} />
        </a>
      </Link>
      <div className='title-area relative mb-7 flex flex-col items-center justify-center text-center'>
        <h1 className='text-[34px] font-bold leading-[74px] text-qblack'>
          {ServeLangItem()?.Log_In}
        </h1>
        <div className='shape -mt-6'>
          <svg
            width='172'
            height='29'
            viewBox='0 0 172 29'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727'
              stroke='#FFBB38'
            />
          </svg>
        </div>
      </div>
      {!requsetOtpPage ? (
        <form className='input-area' onSubmit={requestOtpForm.handleSubmit}>
          <div className='input-item mb-5'>
            <InputCom
              placeholder={ServeLangItem()?.Email_or_Phone}
              label={ServeLangItem()?.Email_or_Phone}
              name='email'
              type='text'
              inputClasses='h-[50px]'
              value={loginForm.values.email}
              inputHandler={(e) => {
                loginForm.setFieldValue('email', e.target.value);
                requestOtpForm.setFieldValue('email', e.target.value);
              }}
              error={
                loginForm.values.email !== '' &&
                loginForm.errors.email !== undefined
              }
              required
            />
          </div>
          <div className='input-item mb-5'>
            <InputCom
              placeholder='* * * * * *'
              label={ServeLangItem()?.Password}
              name='password'
              type='password'
              inputClasses='h-[50px]'
              value={loginForm.values.password}
              inputHandler={loginForm.handleChange}
              required
            />
          </div>
          <div className='forgot-password-area mb-7 flex items-center justify-between'>
            <div className='remember-checkbox flex items-center space-x-2.5 rtl:space-x-reverse'>
              {/* <button
                onClick={rememberMe}
                type='button'
                className='border-light-gray flex h-5 w-5 items-center justify-center border text-qblack'
              >
                {checked && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </button>
              <span onClick={rememberMe} className='text-base text-black'>
                {ServeLangItem()?.Remember_Me}
              </span> */}
            </div>
            <Link href='/forgot-password' passhref>
              <a>
                <span className='cursor-pointer text-base text-qyellow'>
                  {ServeLangItem()?.Forgot_password}?
                </span>
              </a>
            </Link>
          </div>
          <div className='signin-area mb-3.5'>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='black-btn bg-purple mb-6 flex h-[50px] w-full items-center justify-center text-sm font-semibold text-white'
              >
                <span>{ServeLangItem()?.Login}</span>
                {loading && (
                  <span className='w-5 ' style={{ transform: 'scale(0.3)' }}>
                    <LoaderStyleOne />
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form className='input-area' onSubmit={loginForm.handleSubmit}>
          <div className='input-item mb-5'>
            <InputCom
              placeholder={ServeLangItem()?.OTP_Hint}
              label={ServeLangItem()?.OTP}
              name='otp'
              type='text'
              inputClasses='h-[50px]'
              value={loginForm.values.otp}
              inputHandler={loginForm.handleChange}
              error={
                loginForm.values.otp !== '' &&
                loginForm.errors.otp !== undefined
              }
              required
            />
          </div>
          <div className='signin-area mb-3.5'>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='black-btn bg-purple mb-6 flex h-[50px] w-full items-center justify-center text-sm font-semibold text-white'
              >
                <span>{ServeLangItem()?.Sent_OTP}</span>
                {loading && (
                  <span className='w-5 ' style={{ transform: 'scale(0.3)' }}>
                    <LoaderStyleOne />
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
      <div className='signup-area flex justify-center'>
        <p className='text-base font-normal text-qgraytwo'>
          {ServeLangItem()?.Dontt_have_an_account} ?
          <Link href='/signup'>
            <span className='ml-2 cursor-pointer capitalize text-qblack'>
              {ServeLangItem()?.sign_up_free}
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginWidget;
