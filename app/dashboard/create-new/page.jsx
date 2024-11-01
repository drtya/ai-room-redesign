'use client';
import ImageSelection from './_components/imageSelection';
import RoomType from './_components/roomType';
import DesignType from './_components/designType';
import AdditionReq from './_components/additionReq';
import { Button } from '@/components/ui/button';
import { useContext, useState } from 'react';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/config/firebaseConfig';
import CustomLoading from './_components/customLoading';
import AiOutputDialog from '@/app/dashboard/_components/aiOutputDialog';
import { db } from '@/config/db';
import { Users } from '@/config/db';
import { UserDetailContext } from './_context/UserDetailContext';

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiOutputImage, setAiOutputImage] = useState();
  const [openOutputDialog, setOpenOutputDialog] = useState(false);
  const [orgImage, setOrgImage] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  // const [outputResult, setOutputResult] = useState();
  const onHandleInputChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  console.log('openOutputDialog', openOutputDialog);

  const generateAiImage = async () => {
    setLoading(true);
    const rawImageUrl = await saveRawImageToFirebase(formData?.image);
    const result = await axios.post('/api/redesign-room', {
      imageUrl: rawImageUrl,
      roomType: formData?.roomType,
      designType: formData?.designType,
      additionalReq: formData?.additionalReq,
      userEmail: userDetail?.email,
    });
    setAiOutputImage(result.data.result);
    await updateUserCredits()
    setOpenOutputDialog(true);
    setLoading(false);
  };
  const saveRawImageToFirebase = async (image) => {
    const fileName = Date.now() + '_raw.png';
    const imageRef = ref(storage, `room-redesign/` + fileName);
    await uploadBytes(imageRef, image).then((res) => {});
    const downloadUrl = await getDownloadURL(imageRef);
    setOrgImage(downloadUrl);
    return downloadUrl;
  };
  const updateUserCredits = async () => {
    const result = await db
      .update(Users)
      .set({
        credits: userDetail?.credits - 1,
      })
      .returning({ id: Users.id });
    if (result) {
      setUserDetail((prev) => ({ ...prev, credits: userDetail?.credits - 1 }));
      return result[0].id;
    }
  };
  return (
    <div className="pb-52">
      <h2 className="font-bold text-primary text-2xl text-center">
        Experience the magic of AI remodeling
      </h2>
      <p className="text-center text-gray-500">
        transform any room with a click. Select a space, choose a style, and
        watch as AI instantly reimagines your environment
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        <ImageSelection
          selectedImage={(value) => onHandleInputChange(value, 'image')}
        />
        <div>
          <div className="flex flex-col gap-5">
            <RoomType
              selectedRoomType={(value) =>
                onHandleInputChange(value, 'roomType')
              }
            />
            <DesignType
              selectedDesignType={(value) =>
                onHandleInputChange(value, 'designType')
              }
            />
            <AdditionReq
              additionalRequirementInput={(value) =>
                onHandleInputChange(value, 'additionalReq')
              }
            />
            <Button type="button" onClick={generateAiImage} className="w-full">
              Generate
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            NOTE: 1 Credit will use to redesign your room
          </p>
        </div>
      </div>
      <CustomLoading loading={loading} />
      <AiOutputDialog
        openDialog={openOutputDialog}
        closeDialog={() => setOpenOutputDialog(false)}
        orgImageUrl={orgImage}
        aiImageUrl={aiOutputImage}
      />
    </div>
  );
}

export default CreateNew;
