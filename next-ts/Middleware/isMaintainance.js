import { useEffect, useState } from 'react';

import Maintain from '../src/components/Maintain';
const isMaintainance = (WrappedComponent) => {
  return (props) => {
    const [mode, setMode] = useState(null);
    useEffect(() => {
      setMode(0);
    }, []);
    if (mode === 0) {
      return <WrappedComponent {...props} />;
    } else if (mode === 1) {
      return <Maintain />;
    } else {
      return false;
    }
  };
};

export default isMaintainance;
