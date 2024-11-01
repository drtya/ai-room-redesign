'use client';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import PaymentCard from './_components/paymentCard';
import { useContext, useEffect, useState } from 'react';
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { UserDetailContext } from '../../_context/UserDetailContext';
import { useRouter } from 'next/navigation';

function Page() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [{ options }, dispatch] = usePayPalScriptReducer();
  const [selectedOptions, setSelectedOptions] = useState();
  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
      },
    });
  }, [selectedOptions]);
  const price = [
    {
      credits: 5,
      price: 0.99,
    },
    {
      credits: 10,
      price: 1.99,
    },
    {
      credits: 25,
      price: 3.99,
    },
    {
      credits: 50,
      price: 6.99,
    },
    {
      credits: 100,
      price: 9.99,
    },
  ];
  console.log(selectedOptions);
  const router = useRouter()
  const onPaymentSuccess = async () => {
    const result = await db
      .update(Users)
      .set({
        credits: userDetail?.credits + selectedOptions.credits,
      })
      .returning({ id: Users.id });
      if (result) {
        router.push('/dashboard')
      }
  };
  return (
    <div>
      <h1 className="font-bold text-2xl">Buy more credits</h1>
      <h2 className="text-slate-500 mt-2">
        Unlock endless possibilities - Buy more credits and transform your room
        with AI magic!
      </h2>
      <div className="mt-20 grid grid-cols-1 mobile:grid-cols-2 sm:grid-cols-3 tablet:grid-cols-4 xl:grid-cols-5 gap-4">
        {price.map((el, idx) => (
          <PaymentCard
            setSelectedOptions={setSelectedOptions}
            key={`payment_${idx}`}
            paymentInfo={el}
          />
        ))}
      </div>
      <div className="mt-10 mx-auto max-w-[500px]">
        {selectedOptions && (
          <PayPalButtons
            className="w-full"
            onApprove={onPaymentSuccess}
            onCancel={() => {
              selectedOptions(null);
            }}
            style={{ layout: 'vertical' }}
            createOrder={(data, actions) => {
              return actions?.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: selectedOptions?.price?.toFixed(2),
                      currency_code: 'USD',
                    },
                  },
                ],
              });
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Page;
