import React from "react";
import { Match } from "../utils/models";
import { matchProps } from "../utils/types";
import logo from "../../public/logo.png";

type bandProps = { match: Match };
export default function Band({ match }: Readonly<bandProps>) {
  return (
    <div className='px-12 py-5 flex w-100 bg-black  text-zinc-50 font-bold text-3xl'>
      <div className='flex flex-col justify-center'>
        <div className='tracking-wide'> {match.division}</div>
        <div className='uppercase tracking-wide inline-block '>
          {match.stringDate()}{" "}
        </div>
        <div className='mx-auto'> </div>
      </div>
      <div className='flex grow justify-center  items-center relative mx-14'>
        <img src={logo} alt='logo' className='w-40 h-40' />
          <div className='text-sky-500	'> &nbsp; VS &nbsp; </div>
          <div className="flex flex-col">
          <div className=''>{match.teamB}</div>
          <div className="m-auto absolute bottom-5 text-red-500"> {match.time.replace(":", "H")} </div>
          { match.cancel && <div className="m-auto absolute top-5 text-red-500"> CANCELLED </div> }
          </div>
      </div>
      <div className='flex justify-center items-center text-xl'> {match.gym}</div>
    </div>
  );
}
