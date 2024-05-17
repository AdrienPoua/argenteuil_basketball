import Link from "next/link";
import Image from "next/image";
import { NavItemType, SubItemsType } from "@/types";
import { v4 as uuiv4 } from "uuid";

const Item = ({ data }: { data: SubItemsType }) => {
  return (
    <Link
      href={data.url}
      className='flex relative rounded-xl overflow-hidden p-8 hover:border-indigo-500 border-2 border-transparent'
    >
      <Image
        src={
          data.img ??
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        className='absolute inset-0 h-full w-full '
        alt='test'
        width={200}
        height={200}
      />
      <div className='absolute inset-0 bg-black bg-opacity-50 z-10 hover:opacity-0'></div>
      <div className='z-20 text-white'> {data.title} </div>
    </Link>
  );
};

export default function SubBar({ data }: Readonly<{ data: NavItemType }>) {
  return (
    <div className=' flex gap-24 bg-white border-none py-1 justify-center items-center'>
      {data.subItems?.map((item: SubItemsType) => (
        <Item data={item} key={uuiv4()} />
      ))}
    </div>
  );
}
