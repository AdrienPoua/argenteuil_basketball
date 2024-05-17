import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavItemType } from "@/types";
import { v4 as uuiv4 } from "uuid";

const Item = ({ data } : { data: { title : string, url : string, img: string} }) => {  
  return (
    <Link
      href={data.url || "/ok"}
      className='flex relative rounded-xl overflow-hidden p-8 hover:border-indigo-500 border-2 border-transparent'
    >
      <Image
        src={data.img}
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

export default function SubBar({ data, activeNav }: Readonly<{ data: NavItemType[], activeNav : string }>) {
  const { subItems : items } = data.find((item) => item.title === activeNav);
  return (
    <div className=' flex gap-24 bg-white border-none py-1 justify-center items-center'>
      {items.map((item) => (
        <Item data={item}  key={uuiv4()} />
      ))}
    </div>
  );
}
