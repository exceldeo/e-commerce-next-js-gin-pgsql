import Image from 'next/image';

export default function SallerInfo({ sellerInfo }) {
  return (
    <div className='saller-info-wrapper w-full'>
      <div className='saller-info items-center justify-between pb-[30px] sm:flex '>
        <div className='items-center sm:flex sm:space-x-5'>
          <div className='saller relative h-[73px] w-[73px] overflow-hidden rounded-full'>
            {sellerInfo && (
              <Image
                layout='fill'
                src={`${'/assets/images/Group.png'}`}
                alt='saller'
                className='h-full w-full object-cover'
              />
            )}
          </div>
          <div>
            <h6 className='text-[18px] font-medium leading-[30px]'>
              {sellerInfo.name}
            </h6>
            <p className='text-[13px] font-normal leading-[30px] text-qgray'>
              {sellerInfo.city_name}
              {', '}
              {sellerInfo.prov_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
