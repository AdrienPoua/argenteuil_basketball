"use client";
import { NavItemType, SubItemType } from "@/utils/types";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ReactElement, useMemo } from "react";

type PropsType = {
  currentNav: NavItemType | null;
  isHidden: boolean;
  data: NavItemType[];
};

const animationVariants = {
  hidden: { opacity: 0, scale: 0, x: -1000, position: "absolute" as const },
  visible: { opacity: 1, scale: 1, x: 0, position: "relative" as const },
  exit: { opacity: 0, scale: 0, x: 1000, position: "absolute" as const, transition: { duration: 0.25 } },
};

export default function Index({ currentNav, isHidden, data }: Readonly<PropsType>): ReactElement {
  const navItems = useMemo(
    () => data.filter(item => item.subItems && item.subItems.length > 0) as { title: string, subItems: SubItemType[] }[],
    [data]
  );

  return (
    <Box
      className={`${isHidden || currentNav === null ? "max-h-0" : "max-h-24"
        } flex justify-center items-center overflow-hidden gap-5 z-50 transition-max-height duration-300 ease-in-out relative`}
    >
      <AnimatePresence>
        {navItems.flatMap(navItem =>
          navItem.subItems?.map((subItem, i) => {
            const isSelected = currentNav?.subItems?.some(navSubItem => navSubItem.title === subItem.title);
            return (
              isSelected && (
                <motion.div
                  key={subItem.title}
                  initial="hidden"
                  variants={animationVariants}
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3, delay: i * 0.075 }}
                  className="flex absolute"
                >
                  <Link href={subItem.url}>
                    <Box className="flex justify-center items-center relative rounded-xl overflow-hidden grow p-8 border-2 hover:scale-105 ease-in-out duration-300 border-transparent">
                      <Image
                        src={subItem.img}
                        className="absolute inset-0 h-full w-full"
                        alt={subItem.title}
                        width={200}
                        height={200}
                        priority
                        placeholder="blur"
                        blurDataURL={subItem.img}
                      />
                      <Box className="absolute inset-0 bg-black bg-opacity-20 z-10 hover:opacity-0" />
                      <Typography className="z-20 text-white text-center">{subItem.title}</Typography>
                    </Box>
                  </Link>
                </motion.div>
              )
            );
          })
        )}
      </AnimatePresence>
    </Box>
  );
}
