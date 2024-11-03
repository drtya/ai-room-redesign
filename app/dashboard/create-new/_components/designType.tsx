import Image from 'next/image';
import React, { useState } from 'react';

interface IType {
  name: string;
  image: string;
}
function DesignType({
  selectedDesignType,
  fieldError,
}: {
  selectedDesignType: any;
  fieldError: string[];
}) {
  const designs: IType[] = [
    {
      name: 'Modern',
      image: '/designTypes/modern.jpg',
    },
    {
      name: 'Industrial',
      image: '/designTypes/industrial.jpg',
    },
    {
      name: 'Bohemian',
      image: '/designTypes/bohemian.jpg',
    },
    {
      name: 'Traditional',
      image: '/designTypes/traditional.jpg',
    },
    {
      name: 'Rustic',
      image: '/designTypes/rustic.jpg',
    },
  ];

  const [selectedOptions, setSelectedOption] = useState<string>();
  const selectHandler = (design: IType) => {
    selectedDesignType(design.name);
    setSelectedOption(design.name);
  };
  return (
    <div>
      <label className={`text-gray-500 ${fieldError &&'text-red-400'}`}>Select Interior Design Type *</label>
      <div className="grid grid-cols-2 mt-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {designs.map((design, index) => (
          <div key={index} onClick={() => selectHandler(design)}>
            <Image
              alt={design.name}
              src={design.image}
              width={100}
              height={100}
              className={`h-[100px] w-full object-cover rounded-md hover:scale-105 cursor-pointer transition-all ${
                selectedOptions === design.name &&
                'border-2 border-primary rounded-md p-1'
              }`}
            />
            <p className="font-medium ">{design.name}</p>
          </div>
        ))}
      </div>
      {fieldError && <p className="text-sm text-red-500 mt-3">{fieldError[0]}</p>}
    </div>
  );
}

export default DesignType;
