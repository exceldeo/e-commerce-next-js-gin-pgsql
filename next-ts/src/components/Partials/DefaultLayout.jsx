import { useEffect } from 'react';

import { useGetProfile } from '../../api/profile';
import languageData from '../../data/Language.json';

export default function DefaultLayout({ children }) {
  useEffect(() => {
    localStorage.setItem('language', JSON.stringify(languageData));
  }, []);

  const { data: profile, isSuccess, isError } = useGetProfile();

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('profile', JSON.stringify(profile.data));
    }
  }, [profile?.data, isSuccess]);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem('profile');
      localStorage.removeItem('token');
    }
  }, [isError]);

  return (
    <>
      <div className='relative'>
        <div>
          <>
            <div>{children && children}</div>
          </>
        </div>
      </div>
    </>
  );
}
