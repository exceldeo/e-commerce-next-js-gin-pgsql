import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useUpdateProfile } from '../../../../api/profile';
import InputCom from '../../../Helpers/InputCom';
import InputSelect from '../../../Helpers/InputSelect';
import ServeLangItem from '../../../Helpers/ServeLangItem';

export default function ProfileTab({ profileInfo }) {
  const [name, setName] = useState(profileInfo.name);
  const [email, setEmail] = useState(profileInfo.email);
  const [phone, setPhone] = useState(profileInfo.phone);
  const [employeeCode, setEmployeeCode] = useState(profileInfo.employee_code);
  const [gender, setGender] = useState(profileInfo.gender);
  const [npwp, setNpwp] = useState(profileInfo.npwp);
  const [document, setDocument] = useState(profileInfo.document);

  useEffect(() => {
    console.log(profileInfo);
  }, [profileInfo]);

  const handleUpdateProfile = useUpdateProfile();

  const updateProfile = () => {
    handleUpdateProfile.mutate({
      name,
      phone,
      npwp,
      employee_code: employeeCode,
      gender,
    });
  };

  useEffect(() => {
    if (handleUpdateProfile.isSuccess) {
      toast.success('Profile Updated');
    }
  }, [handleUpdateProfile.isSuccess]);

  useEffect(() => {
    if (handleUpdateProfile.isError) {
      toast.error(handleUpdateProfile.error.response.data.message);
    }
  }, [handleUpdateProfile.isError]);

  return (
    <>
      {profileInfo && (
        <>
          <div className='flex flex-col-reverse space-x-8 rtl:space-x-reverse lg:flex-row'>
            <div className=' w-full '>
              <div className='input-item mb-8'>
                <InputCom
                  label={ServeLangItem()?.Employee_Code}
                  placeholder={ServeLangItem()?.Employee_Code_Hint}
                  type='text'
                  inputClasses='h-[50px]'
                  value={employeeCode}
                  inputHandler={(e) => setEmployeeCode(e.target.value)}
                />
              </div>

              <div className='input-item mb-8'>
                <InputCom
                  label={ServeLangItem()?.NPWP}
                  placeholder={ServeLangItem()?.Employee_Code_Hint}
                  type='text'
                  inputClasses='h-[50px]'
                  value={npwp}
                  inputHandler={(e) => setNpwp(e.target.value)}
                />
              </div>

              <div className='input-item mb-8'>
                <InputCom
                  label={ServeLangItem()?.Name}
                  placeholder='Name'
                  type='text'
                  inputClasses='h-[50px]'
                  value={name}
                  inputHandler={(e) => setName(e.target.value)}
                />
              </div>
              <div className='input-item mb-8'>
                <InputSelect
                  placeholder={ServeLangItem()?.Gender}
                  inputClasses='h-[50px]'
                  value={gender === 'male' ? 'male' : 'female'}
                  inputHandler={(e) => setGender(e.target.value)}
                  options={[
                    {
                      id: 'male',
                      name: 'male',
                    },
                    {
                      id: 'female',
                      name: 'female',
                    },
                  ]}
                />
              </div>
              <div className='input-item mb-8 rtl:space-x-reverse md:flex md:space-x-2.5'>
                <div className='mb-8 h-full w-full md:mb-0 md:w-1/2'>
                  <div>
                    <p className='input-label mb-2 block  text-[13px] font-normal capitalize text-qgray'>
                      {ServeLangItem()?.Email}
                      <span className='ml-1 text-xs text-yellow-500'>
                        ({ServeLangItem()?.Read_Only})
                      </span>
                    </p>
                    <div className='text-dark-gray flex h-[50px] w-full  cursor-not-allowed items-center rounded border border-yellow-500 bg-yellow-50 px-6'>
                      {email}
                    </div>
                  </div>
                </div>
                <div className='relative h-full w-full md:w-1/2'>
                  <InputCom
                    label={ServeLangItem()?.Phone_Number}
                    placeholder={ServeLangItem()?.Phone_Number}
                    type='text'
                    inputClasses='h-[50px] placeholder:capitalize pl-20'
                    value={phone ? phone : ''}
                    inputHandler={(e) => setPhone(e.target.value)}
                  />

                  <button
                    // onClick={() => setCountryDropToggle(!countryDropToggle)}
                    type='button'
                    className='absolute left-0 top-[29px] flex h-[50px] w-[70px] items-center justify-center bg-qgray-border'
                  >
                    <div className='flex items-center'>
                      <span>+62</span>
                    </div>
                  </button>
                </div>
              </div>
              <div className='input-item mb-8'>
                <div className='input-com h-full w-full'>
                  <label className={`input-label mb-2 block  capitalize `}>
                    Document
                  </label>
                  <div className='input-wrapper relative h-full w-full overflow-hidden p-2'>
                    <a
                      href={`${process.env.NEXT_PUBLIC_BASE_URL_STORAGE}${document}`}
                      target='_blank'
                    >
                      <div>
                        <FontAwesomeIcon icon='fa-solid fa-file' size='20' />
                        <span className='ml-2'>Document</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='action-area flex items-center space-x-4 rtl:space-x-reverse'>
            <button
              onClick={() => updateProfile()}
              type='button'
              className='h-[50px] w-[164px] rounded bg-qyellow text-sm text-qblack'
            >
              {ServeLangItem()?.Update_Profile}
            </button>
          </div>
        </>
      )}
    </>
  );
}
