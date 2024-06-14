import Link from "next/link";
import Image from "next/image";
import { SubItemType } from "@/types";
import { Box, Typography } from "@mui/material";

const Item = ({ data }: { data: SubItemType }) => {
  return (
    <Link href={data.url} className="lg:flex hidden">
      <Box className="flex relative rounded-xl overflow-hidden p-8 hover:border-indigo-500 border-2 border-transparent">
        <Image
          src={
            data.img ??
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="absolute inset-0 h-full w-full"
          alt={data.title}
          width={200}
          height={200}
        />
        <Box className="absolute inset-0 bg-black bg-opacity-50 z-10 hover:opacity-0" />
        <Typography className="z-20 text-white">{data.title}</Typography>
      </Box>
    </Link>
  );
};

export default Item;
