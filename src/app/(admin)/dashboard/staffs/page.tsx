"use client";
import Form from './Form';
import StaffCard from "./Card";
import { getStaff } from '@/database/services/Members';
import { useQuery } from 'react-query';

export default function Page() {
  const { data: staff } = useQuery(["staff"], () => getStaff());
  if (!staff) return <div>Loading...</div>
  return (
    <>
      <Form />
      {
        staff &&
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center place-items-center p-10">
          {staff.map((staff) => (
            <StaffCard
              key={staff._id}
              data={staff}
            />
          ))}
        </div>
      }
    </>
  );
}

