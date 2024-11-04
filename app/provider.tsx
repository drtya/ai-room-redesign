'use client';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import { UserDetailContext } from './_context/UserDetailContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function Provider({ children }:{children:ReactNode}) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState([]);
  useEffect(() => {
    user && verifyUser();
  }, [user]);
  const verifyUser = async () => {
    const dataResult = await axios.post('/api/verify-user', {
      user: user,
    });
    setUserDetail(dataResult.data.result);
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
      >
        <div>{children}</div>
      </PayPalScriptProvider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
