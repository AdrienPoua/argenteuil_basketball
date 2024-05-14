import React from "react";
import data from "@/data/staff.json";
import { MemberFactory } from "@/factories";
import Image from "next/image";
import { CoachType } from "@/types";
import { Coach } from "@/models";

const CoachCard = ({ data }: { data: CoachType }) => {
  return (
    <div className='flex mb-5 flex-col min-w-44 items-center flex-wrap text-black rounded-md overflow-hidden'>
      <Image src={data.img} alt={data.name} height={500} width={500} />
      <div className=' flex flex-col border-t-2 border-primary py-3 w-full text-center bg-white '>
        <h2 className='text-lg font-bold '>{data.name}</h2>
        <h3 className='text-sm '>
          {Array.isArray(data.team) && data.team.length > 1
            ? `Equipes ${data.team.join(" & ")}`
            : `Equipe ${data.team}`}
        </h3>
      </div>
    </div>
  );
};

export default function Entraineurs() {
  const coachs = data
    .map((member) => MemberFactory.create(member))
    .filter((member) => member instanceof Coach);
  return (
    <div className='mt-8 '>
      <h1 className='text-white text-center text-4xl'> Nos entraineurs </h1>
      <div className='flex flex-wrap justify-around gap-6 p-14 '>
        {" "}
        {coachs.map((coach, index) => (
          <CoachCard data={coach} key={coach.name} />
        ))}
      </div>
    </div>
  );
}
