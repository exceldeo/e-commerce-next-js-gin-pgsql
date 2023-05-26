import InputCom from '../../../Helpers/InputCom';
import ServeLangItem from '../../../Helpers/ServeLangItem';

export default function ProfileTab({ profileInfo }) {
  return (
    <>
      {profileInfo && (
        <>
          <div className='flex flex-col-reverse space-x-8 rtl:space-x-reverse lg:flex-row'>
            <div className=' w-full '>
              <div className='input-item mb-8'>
                <InputCom
                  label={ServeLangItem()?.Shop_Name}
                  placeholder='Name'
                  type='text'
                  inputClasses='h-[50px]'
                  value={profileInfo.name ? profileInfo.name : ''}
                  disabled
                />
              </div>

              <div className='input-item mb-8 rtl:space-x-reverse md:flex md:space-x-2.5'>
                <div className='mb-8 h-full w-full md:mb-0 md:w-1/2'>
                  <div>
                    <p className='input-label mb-2 block  text-[13px] font-normal capitalize text-qgray'>
                      {ServeLangItem()?.Username}
                      <span className='ml-1 text-xs text-yellow-500'>
                        ({ServeLangItem()?.Read_Only})
                      </span>
                    </p>
                    <div className='text-dark-gray flex h-[50px] w-full  cursor-not-allowed items-center rounded border border-yellow-500 bg-yellow-50 px-6'>
                      {profileInfo?.username}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
