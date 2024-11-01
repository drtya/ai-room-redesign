'use client';
import { Button } from '@/components/ui/button';
import { useContext, useEffect, useState } from 'react';
import EmptyState from './emptyState';
import Link from 'next/link';
import { db } from '@/config/db';
import { AiGeneratedImage } from '@/config/schema';
import { eq } from 'drizzle-orm';
import RoomDesignCard from './roomDesignCard';
import { UserDetailContext } from '@/app/_context/UserDetailContext';

function Listing() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [userRoomList, setUserRoomList] = useState([]);
  useEffect(() => {
    userDetail && getUsersRoomList();
  }, [userDetail]);
  const getUsersRoomList = async () => {
    const result = await db
      .select()
      .from(AiGeneratedImage)
      .where(
        eq(AiGeneratedImage.userEmail, userDetail?.email)
      );
    setUserRoomList(result);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-bold text-2xl">Hello, {userDetail?.name}</h2>
        <Link href="/dashboard/create-new">
          <Button>Redesign Room</Button>
        </Link>
      </div>
      {userRoomList?.length == 0 ? (
        <EmptyState />
      ) : (
        <div className='mt-10'>
          <h2 className='text-primary mb-5'>My rooms area</h2>
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center'>
          {userRoomList?.map((room, idx) => (
            <RoomDesignCard key={`roomDesign_${idx}`} room={room} />
          ))}
        </div>
        </div>
      )}
    </div>
  );
}

export default Listing;
