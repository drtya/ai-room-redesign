'use client';
import { useState } from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import AiOutputDialog from './aiOutputDialog';

function RoomDesignCard({ room }) {
  const [openDialoge, setOpenDialoge] = useState(false);
  const clickHandler = () => {
    setOpenDialoge(true);
  };

  return (
    <div className="shadow-md rounded-lg cursor-pointer" onClick={clickHandler}>
      <ReactBeforeSliderComponent
        className="rounded-t-lg overflow-hidden"
        firstImage={{ imageUrl: room.orgImage }}
        secondImage={{ imageUrl: room.aiImage }}
      />
      <div className="p-3 text-sm space-y-1">
        <p>Room type: {room.roomType}</p>
        <p>Design type: {room.designType}</p>
      </div>
      <AiOutputDialog
        openDialog={openDialoge}
        closeDialog={() => setOpenDialoge(false)}
        aiImageUrl={room.aiImage}
        orgImageUrl={room.orgImage}
      />
    </div>
  );
}

export default RoomDesignCard;
