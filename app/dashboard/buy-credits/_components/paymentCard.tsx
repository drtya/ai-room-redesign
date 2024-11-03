'use client';
import { Button } from '@/components/ui/button';
import { Dispatch, memo, SetStateAction } from 'react';
import { IPrice } from '../page';

const PaymentCard = memo(function ({
  paymentInfo,
  setSelectedOptions,
}: {
  paymentInfo: IPrice|null;
  setSelectedOptions: Dispatch<SetStateAction<IPrice|null>>;
}) {
  return (
    <div
      className="rounded-md p-5
       border-2 border-transparent shadow-all flex flex-col items-center duration-300 justify-center gap-3 focus-within:border-2 focus-within:shadow-primary focus-within:border-primary focus-withinshadow-primary"
    >
      <p className="font-bold text-2xl">{paymentInfo.credits}</p>
      <p className="font-semibold">Credits</p>
      <Button
        onClick={() => {
          setSelectedOptions((prev) => (prev = paymentInfo));
        }}
        className="focus:outline-none w-full"
      >
        Select
      </Button>
      <p className="text-primary text-sm font-light">${paymentInfo.price}</p>
    </div>
  );
});

export default PaymentCard;
