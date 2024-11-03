import axios from 'axios';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { storage } from '@/config/firebaseConfig';
import { db } from '@/config/db';
import { AiGeneratedImage } from '@/config/schema';
import { IAiGeneratedImage } from '@/config/types';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export async function POST(req) {
  const { imageUrl, roomType, designType, additionalReq, userEmail } =
    await req.json();
  try {
    const input = {
      image: imageUrl,
      prompt: `A ${roomType} with a ${designType} style interior. ${additionalReq}`,
    };
    const output = await replicate.run(
      'adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38',
      { input }
    );
    const base64Image = await convertImageToBase64(output);
    const fileName = Date.now() + '.png';
    const storageRef = ref(storage, `room-redesign/${fileName}`);
    await uploadString(storageRef, base64Image, 'data_url');
    const downloadUrl = await getDownloadURL(storageRef);

    const dbResult = await db
      .insert(AiGeneratedImage)
      .values({
        roomType: roomType,
        designType: designType,
        orgImage: imageUrl,
        aiImage: downloadUrl,
        userEmail: userEmail,
      } as IAiGeneratedImage)
      .returning({ id: AiGeneratedImage.id });
    return NextResponse.json({ result: downloadUrl });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

async function convertImageToBase64(imageUrl) {
  const res = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const base64ImgRaw = Buffer.from(res.data).toString('base64');
  return `data:image/png;base64,${base64ImgRaw}`;
}
