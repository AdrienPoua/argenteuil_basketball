import React from "react";
import data from "@/data/staff.json";
import { MemberFactory } from "@/factories";
import Image from "next/image";
import { AdherentType, LeaderType, MemberType } from "@/types";
import { Leader } from "@/models";

const LeaderCard = ({ data }: { data: LeaderType }) => {
  return (
    <div className='flex mb-5 flex-col w-72 aspect-square items-center flex-wrap bg-white text-black rounded-md overflow-hidden'>
      <Image src={data.img} alt={data.name} height={500} width={500} />
      <div className=' flex flex-col border-t-2 border-primary w-full text-center grow justify-center '>
        <h2 className='text-lg font-bold '>{data.name}</h2>
        <h3 className='text-sm'> {data.role} </h3>
      </div>
    </div>
  );
};

export default function Index() {

  const isLeader = (member : AdherentType): member is Leader => {
    return member instanceof Leader;
  }
  const leaders : LeaderType[]  = data.staff
    .map((member) => MemberFactory.create(member, "leader"))
    .filter(isLeader) ;

  const president = leaders.find((leader) => leader.role.includes("Président"));
  const vicePresident = leaders.find((leader) => leader.role.includes("Vice-président") || leader.role.includes("Vice-Présidente"));
  const tresorier = leaders.find((leader) => leader.role.includes("Trésorier") || leader.role.includes("Trésorière"));
  const secretaire = leaders.find((leader) => leader.role.includes("Secrétaire"));
  const correspondant = leaders.find((leader) => leader.role.includes("Correspondant") || leader.role.includes("Correspondante"));

  return (
    <div className='mt-8 '>
      <h1 className='text-white text-center text-4xl mb-9'>
        {" "}
        Les membres du bureau{" "}
      </h1>
      <div className='flex flex-col gap-5 justify-center items-center'>
        {president && <LeaderCard data={president} />}
        <div className='flex gap-5'>
          {vicePresident && <LeaderCard data={vicePresident} />}
          {tresorier && <LeaderCard data={tresorier} />}
          {secretaire && <LeaderCard data={secretaire} />}
          {correspondant && <LeaderCard data={correspondant} />}
        </div>
      </div>
    </div>
  );
}
