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
import { useGetAllCompanyK3s } from '../../../api/companyK3s';

function SignupWidget() {
  const registration = useRegistration();

  const registrationForm = useFormik({
    initialValues: {
      employee_code: '',
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
      no_phone: '',
      document: '',
      ktp_pic: '',
      company: '',
    },
    validationSchema: Yup.object({
      employee_code: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .required('This field is required'),
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
      document: Yup.mixed().required('This field is required'),
      ktp_pic: Yup.mixed().required('This field is required'),
      company: Yup.string().required('This field is required'),
    }),

    onSubmit: (values) => {
      setLoading(true);
      registration.mutate({
        employee_code: values.employee_code,
        email: values.email,
        name: values.name,
        password: values.password,
        phone: values.no_phone,
        document: values.document,
        ktp_pic: values.ktp_pic,
        company_id: values.company,
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

  const [getCompany, setGetCompany] = useState([]);

  const company = useGetAllCompanyK3s();

  useEffect(() => {
    if (company.isSuccess) {
      setGetCompany(company.data.data.kkks_companies);
    }
  }, [company.isSuccess]);

  const router = useRouter();
  const [checked, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const rememberMe = () => {
    setCheck(!checked);
  };

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
            placeholder={ServeLangItem()?.Employee_Code_Hint}
            label={ServeLangItem()?.Employee_Code}
            name='employee_code'
            type='text'
            inputClasses='h-[50px]'
            value={registrationForm.values.employee_code}
            inputHandler={registrationForm.handleChange}
            error={
              registrationForm.values.employee_code !== '' &&
              registrationForm.errors.employee_code !== undefined
            }
            required
          />
          {registrationForm.values.employee_code !== '' &&
          registrationForm.errors.employee_code ? (
            <span className='mt-1 text-sm text-qred'>
              {registrationForm.errors.employee_code}
            </span>
          ) : (
            ''
          )}
        </div>
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
          <InputSelect
            placeholder={ServeLangItem()?.Company_Name}
            label={ServeLangItem()?.Company_Name}
            name='company'
            inputClasses='h-[50px]'
            value={registrationForm.values.company}
            inputHandler={registrationForm.handleChange}
            error={
              registrationForm.values.company !== '' &&
              registrationForm.errors.company !== undefined
            }
            options={getCompany}
            required
          />
          {registrationForm.values.company !== '' &&
          registrationForm.errors.company !== undefined ? (
            <span className='mt-1 text-sm text-qred'>
              {registrationForm.errors.company}
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
        <div className='input-item relative mb-5'>
          <InputCom
            label={ServeLangItem()?.Document}
            name='document'
            type='file'
            inputClasses='h-[50px] py-3'
            onChange={(event) => {
              const files = event.target.files;
              registrationForm.setFieldValue('document', files);
            }}
            error={
              registrationForm.values.document !== '' &&
              registrationForm.errors.document !== undefined
            }
            inputHandler={registrationForm.handleChange}
            required
          />
          {registrationForm.values.document !== '' &&
          registrationForm.errors.document !== undefined ? (
            <span className='mt-1 text-sm text-qred'>
              {registrationForm.errors.document}
            </span>
          ) : (
            ''
          )}
        </div>
        <div className='input-item relative mb-5'>
          <InputCom
            label={ServeLangItem()?.KTP_Pic}
            name='ktp_pic'
            type='file'
            inputClasses='h-[50px] py-3'
            onChange={(event) => {
              const files = event.target.files;
              registrationForm.setFieldValue('ktp_pic', files);
            }}
            error={
              registrationForm.values.ktp_pic !== '' &&
              registrationForm.errors.ktp_pic !== undefined
            }
            inputHandler={registrationForm.handleChange}
            required
          />
          {registrationForm.values.ktp_pic !== '' &&
          registrationForm.errors.ktp_pic !== undefined ? (
            <span className='mt-1 text-sm text-qred'>
              {registrationForm.errors.ktp_pic}
            </span>
          ) : (
            ''
          )}
        </div>

        <div className='forgot-password-area mb-7'>
          <div className='remember-checkbox flex items-center space-x-2.5 rtl:space-x-reverse'>
            <button
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
            <Link href='/seller-terms-condition'>
              <span className='cursor-pointer text-base text-black'>
                {ServeLangItem()?.I_agree_all_terms_and_condition_in_cipcc}
              </span>
            </Link>
          </div>
        </div>
        <div className='signin-area mb-3'>
          <div className='flex justify-center'>
            <button
              type='submit'
              disabled={!checked}
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
