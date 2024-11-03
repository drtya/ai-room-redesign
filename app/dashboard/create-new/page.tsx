'use client';
import ImageSelection from './_components/imageSelection';
import RoomType from './_components/roomType';
import DesignType from './_components/designType';
import AdditionReq from './_components/additionReq';
import { Button } from '@/components/ui/button';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/config/firebaseConfig';
import CustomLoading from './_components/customLoading';
import AiOutputDialog from '@/app/dashboard/_components/aiOutputDialog';
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { createdImage, IUser } from '@/config/types';
import { z } from 'zod';

const geterateRoomSchema = z.object({
  imageUrl: z.string().min(1),
  roomType: z.string().min(1),
  designType: z.string().min(1),
  userEmail: z.string().min(1),
});
interface IErrorFields {
  imageUrl?: string[];
  roomType?: string[];
  designType?: string[];
  userEmail?: string[];
}

function CreateNew() {
  const [formData, setFormData] = useState<createdImage>();
  const [loading, setLoading] = useState<boolean>(false);
  const [aiOutputImage, setAiOutputImage] = useState<string>();
  const [openOutputDialog, setOpenOutputDialog] = useState<boolean>(false);
  const [orgImage, setOrgImage] = useState<string>();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [error, setError] = useState<null | string>(null);
  const [fieldErrors, setFieldErrors] = useState<IErrorFields | null>(null);
  const onHandleInputChange = (value: any, fieldName: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const generateAiImage = async () => {
    if (userDetail.credits) {
      let rawImageUrl: null | string;
      if (formData?.image) {
        rawImageUrl = await saveRawImageToFirebase(formData?.image);
      }
      const data = {
        imageUrl: rawImageUrl,
        roomType: formData?.roomType,
        designType: formData?.designType,
        additionalReq: formData?.additionalReq,
        userEmail: userDetail?.email,
      };
      const validateData = geterateRoomSchema.safeParse(data);
      if (validateData.success) {
        setError(null);
        setFieldErrors(null);
        setLoading(true);
        const result = await axios.post('/api/redesign-room', {
          imageUrl: rawImageUrl,
          roomType: formData?.roomType,
          designType: formData?.designType,
          additionalReq: formData?.additionalReq,
          userEmail: userDetail?.email,
        });
        setAiOutputImage(result.data.result);
        await updateUserCredits();
        setOpenOutputDialog(true);
        setLoading(false);
      } else {
        setError('Please fill in all required fields');
        setFieldErrors(validateData.error.flatten().fieldErrors);
      }
    } else {
      setError('Your free credits limit is over, buy credits and come back');
    }
  };
  const saveRawImageToFirebase = async (image: Blob) => {
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
        credits: userDetail.credits - 1,
      } as IUser)
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
          fieldError={fieldErrors?.imageUrl}
          selectedImage={(value) => onHandleInputChange(value, 'image')}
        />
        <div>
          <div className="flex flex-col gap-5">
            <RoomType
              fieldError={fieldErrors?.roomType}
              selectedRoomType={(value) =>
                onHandleInputChange(value, 'roomType')
              }
            />
            <DesignType
              fieldError={fieldErrors?.designType}
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
          {error && <p className="text-base text-red-500 mt-3">{error}</p>}
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
