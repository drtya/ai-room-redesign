import React, { ChangeEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';

function AdditionReq({
  additionalRequirementInput,
}: {
  additionalRequirementInput: any;
}) {
  const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    additionalRequirementInput(event.target.value);
  };
  return (
    <div>
      <label className="text-gray-500" htmlFor="AdditionReq">
        Enter additional Requirments (Optional)
      </label>
      <Textarea
        className="h-20 mt-3"
        id="AdditionReq"
        placeholder="Enter additional Requirments..."
        onChange={changeHandler}
      />
    </div>
  );
}

export default AdditionReq;
