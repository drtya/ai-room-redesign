'use client';
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@/components/ui/button';
import { LogoIcon, StarIcon } from '@/public/icons';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useContext } from 'react';

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  
  return (
    <div className="flex items-center justify-between p-5 shadow-sm">
      <Link href={'/dashboard'} className="flex items-center gap-2 cursor-pointer">
        <div className="text-primary">
          <LogoIcon />
        </div>
        <h2 className="font-bold text-lg">AI Roomy</h2>
      </Link>
      <Link href={'/dashboard/buy-credits'}>
      <Button variant="ghost" className="rounded-full text-primary">
        Buy more credits
      </Button>
      </Link>
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center p-1 px-3 rounded-full bg-slate-200">
          <div className="w-6 h-6 text-yellow-500">
            <StarIcon />
          </div>
          <h2>{userDetail?.credits}</h2>
        </div>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
