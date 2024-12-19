"use client";
import Form from './Form';
import StaffCard from "./Card";
import useFetchStaff from "@/hooks/useFetchStaff";
import FetchFeedback from "@/components/FetchFeedback";


export default function Page() {
  const { isLoading, error, staff } = useFetchStaff();
  return (
    <>
      <Form />
      <FetchFeedback isLoading={isLoading} error={error} data={staff}>
        {
          staff && <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center place-items-center p-10">
            {staff.map((staff) => (
              <StaffCard
                key={staff.id}
                data={staff}
              />
            ))}
          </div>
        }
      </FetchFeedback>
    </>
  );
}

