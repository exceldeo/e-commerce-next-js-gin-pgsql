import { useState } from 'react';

import Footer from './Footers/Footer';
import Header from './Headers/Header';
import Drawer from '../Mobile/Drawer';
export default function Layout({ children, childrenClasses }) {
  const [drawer, setDrawer] = useState(false);
  return (
    <>
      <Drawer open={drawer} action={() => setDrawer(!drawer)} />
      <div className='w-full overflow-x-hidden'>
        <Header drawerAction={() => setDrawer(!drawer)} />
        <div
          className={`bg-pattern min-h-screen w-full  ${
            childrenClasses || 'pt-[30px] pb-[60px]'
          }`}
        >
          {children && children}
        </div>

        {/* <Footer /> */}
      </div>
    </>
  );
}
