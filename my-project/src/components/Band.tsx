import React from "react";
import { Match } from "../utils/models";
import { matchProps } from "../utils/types";
import logo from "../../public/logo.png"

type bandProps = { match: Match };
export default function Band({ match }: Readonly<bandProps>) {
  return (
    <div className='px-12 py-5 text-3xl fw-bold flex w-100 bg-black font-bold text-zinc-50'>
      <div className='flex flex-col justify-center gap-2'>
        <div className='tracking-wide'> {match.division}</div>
        <div className='uppercase tracking-widest'> {match.stringDate()} </div>
      </div>
      <div className='flex grow justify-center items-center mx-14'>
        <img src={logo} alt="logo" className='w-40 h-40' />
        <span className="text-sky-500	"> &nbsp; VS &nbsp; </span>
        <span className=''>{match.teamB}</span>
      </div>
      <div className='flex justify-center items-center'> SCORE</div>
    </div>
  );
}
