import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const PrimarySpinner = () => {
  return (
    <div className='flex justify-center items-center py-80'>
      <InfinitySpin width="200" color="#19D3AE" />
    </div>
  );
};

export default PrimarySpinner;
