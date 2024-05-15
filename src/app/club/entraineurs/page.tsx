"use client"
import data from "@/data/staff.json";
import { MemberFactory } from "@/factories";
import { Coach } from "@/models";
import { CoachCard } from "@/components/Card";


export default function Entraineurs() {
  console.log(data.staff)
  const coachs = data.staff
    .map((member) => MemberFactory.create(member, "coach")).filter((member) => member instanceof Coach);
  return (
    <div className='mt-8 '>
      <h1 className='text-white text-center text-4xl'> Nos entraineurs </h1>
      <div className='flex flex-wrap gap-6 p-14 '>
        {" "}
        {coachs.map((coach) => (
          <CoachCard data={coach} key={coach.name} />
        ))}
      </div>
    </div>
  );
}
