import { useContext } from "react";
import { MenuContext } from "@/hooks/useContext";
import Link from "next/link";
import Image from "next/image";
import { subNavItem } from "@/types";

const Item = ({ data }: { data: subNavItem }) => {
  return (
    <Link
      href={data.url}
      className='flex relative rounded-xl overflow-hidden p-8 hover:border-indigo-500 border-2 border-transparent'
    >
      <Image
        src={data.image ? `/${data.image}` : "https://picsum.photos/200/200"}
        className='absolute inset-0 h-full w-full '
        alt='test'
        width={200}
        height={200}
      />
      <div className='absolute inset-0 bg-black bg-opacity-50 z-10 hover:opacity-0'></div>
      <div className='z-20 text-white'> {data.title} </div>
    </Link>
  );
}

export default function SubBar() {
  const { dataMenu } = useContext(MenuContext);

  return (
    <div className=' flex gap-24 bg-white border-none py-1 justify-center items-center'>
      {dataMenu?.subItems?.map((item) => (
        <Item data={item} key={item.title} />
      ))}
    </div>
  );
}
