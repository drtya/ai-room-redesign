'use client';
import { MouseEventHandler, useState } from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import AiOutputDialog from './aiOutputDialog';
import { IAiGeneratedImage } from '@/config/types';

function RoomDesignCard({ room }: { room: IAiGeneratedImage }) {
  const [openDialoge, setOpenDialoge] = useState<boolean>(false);
  const openModalHandler: MouseEventHandler<HTMLDivElement> = () => {
    setOpenDialoge(true);
  };

  return (
    <div
      className="shadow-md rounded-lg cursor-pointer"
      onClick={openModalHandler}
    >
      <ReactBeforeSliderComponent
        className="rounded-t-lg overflow-hidden max-h-[250px] bg-bottom"
        firstImage={{ imageUrl: room.orgImage }}
        secondImage={{ imageUrl: room.aiImage }}
      />
      <div className="p-3 text-sm space-y-1">
        <p>Room type: {room.roomType}</p>
        <p>Design type: {room.designType}</p>
      </div>
      <AiOutputDialog
        openDialog={openDialoge}
        closeDialog={setOpenDialoge}
        aiImageUrl={room.aiImage}
        orgImageUrl={room.orgImage}
      />
    </div>
  );
}

export default RoomDesignCard;
