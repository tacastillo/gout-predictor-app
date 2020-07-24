import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeSmart, selectClient } from '../../features/smartSlice';

import Main from '../Main/Main';

const SmartWrapper = () => {
  const dispatch = useDispatch();
  const client = useSelector(selectClient);

  useEffect(() => {
    dispatch(initializeSmart());
  }, [dispatch]);

  return (
    <div>
      {client && <Main />}
    </div>
  );
};

export default SmartWrapper;