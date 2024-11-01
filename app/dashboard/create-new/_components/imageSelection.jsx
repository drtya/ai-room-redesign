'use client';
import { UploadImageIcon } from '@/public/icons';
import Image from 'next/image';
import React, { useState } from 'react';

function ImageSelection({ selectedImage }) {
  const [file, setFile] = useState();
  const onFileSelected = (event) => {
    setFile(event.target.files[0]);
    selectedImage(event.target.files[0]);
  };
  return (
    <div>
      <label htmlFor="upload-image">Select image of your room</label>
      <div className="mt-3">
        <label htmlFor="upload-image">
          <div
            className={`p-28 border border-dotted rounded-xl flex items-center justify-center border-primary bg-slate-200 cursor-pointer hover:shadow-lg duration-300 ${
              file && 'bg-white !p-0 h-[300px]'
            }`}
          >
            {file ? (
              <Image
                alt="Your room"
                src={URL.createObjectURL(file)}
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="text-primary w-10 h-10">
                <UploadImageIcon />
              </div>
            )}
          </div>
        </label>
        <input
          onChange={onFileSelected}
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
}

export default ImageSelection;
