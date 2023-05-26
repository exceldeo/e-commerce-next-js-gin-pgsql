// import Link from "next/link";
// import axios from "axios";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ServeLangItem from '../ServeLangItem';

export default function SearchBox({ className }) {
  const router = useRouter();

  const [searchKey, setSearchkey] = useState('');
  useEffect(() => {
    if (router && router.route && router.route === '/keywords') {
      setSearchkey(router.query ? router.query.search : '');
    }
    return () => {
      setSearchkey('');
    };
  }, [router]);

  const searchHandler = () => {
    if (searchKey !== '') {
      router.push({
        pathname: '/search',
        query: { keyword: searchKey },
      });
    } else {
      return false;
    }
  };

  return (
    <>
      <div
        className={`flex h-full w-full items-center  border border-qgray-border bg-white  ${
          className || ''
        }`}
      >
        <div className='h-full flex-1'>
          <div className='h-full'>
            <input
              value={searchKey}
              onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
              onChange={(e) => setSearchkey(e.target.value)}
              type='text'
              className='search-input ml-2'
              placeholder={ServeLangItem()?.Search_products + '...'}
            />
          </div>
        </div>
        <button
          onClick={searchHandler}
          className='search-btn font-600  h-full w-[93px] text-sm '
          type='button'
        >
          {ServeLangItem()?.Search}
        </button>
      </div>
    </>
  );
}
