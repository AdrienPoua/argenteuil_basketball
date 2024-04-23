import React from 'react';

export default function subItem({ data }) {
  return (
    <div className='flex justify-center items-center relative aspect-video p-12'>
      <img
        src={data.image || "https://picsum.photos/200/200"}
        className='absolute inset-0 h-full w-full '
        alt="test"
      />
        <div className='absolute inset-0 bg-black bg-opacity-30 z-50'></div>
      <div className="p-5 z-10 font-bold text-2xl  text-white"> {data.title} </div>
    </div>
  );
}
