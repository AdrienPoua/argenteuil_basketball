import React from "react";

export default function LandingPage() {
  return (
    <>
    <div className="h-svh relative shadow-2xl ">
      <div className='absolute h-96 inset-x-0 bottom-0 w-full bg-gradient-to-t from-black'></div>
      <img
        src='https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt='background'
        className='w-full h-full object-cover'
      />
    </div>
      <div className='h-16 w-full bg-black'> </div>
      </>
  );
}
