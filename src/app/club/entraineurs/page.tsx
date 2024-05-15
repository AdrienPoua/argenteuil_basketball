"use client"
import data from "@/data/staff.json";
import { MemberFactory } from "@/factories";
import { Coach, Member } from "@/models";
import { CoachCard } from "@/components/Card";


export default function Entraineurs() {
  const coachs = data
    .map((member) => MemberFactory.create(member))
    .filter((member : Member) : member is Coach => member instanceof Coach);
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
