"use client";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

const animationVariants = {
  hidden: { opacity: 0, scale: 0, x: -1000, position: "absolute" as const },
  visible: { opacity: 1, scale: 1, x: 0, position: "relative" as const },
  exit: { opacity: 0, scale: 0, x: 1000, position: "absolute" as const, transition: { duration: 0.25 } },
};

export default function Index(): ReactElement {
  const currentNav = useSelector((state: RootState) => state.navbar.currentNav);
  const navItems = useSelector((state: RootState) => state.navbar.navItems);
  const isHidden = useSelector((state: RootState) => state.navbar.isHidden);
  const expendableNavItems = navItems.filter((item) => "subItems" in item);

  return (
    <Box
      className={`${isHidden || currentNav === null ? "max-h-0" : "max-h-24"
        } flex justify-center items-center overflow-hidden gap-5 z-50 transition-max-height duration-300 ease-in-out relative`}
    >
      <AnimatePresence>
        {expendableNavItems.map((expendableNavItem) => (
          expendableNavItem.subItems.map((subItem, j) => {
            const { title, href, img } = subItem;
            const isSelected = currentNav?.subItems?.some(item => title === item.title);
            return (
              isSelected && (
                <motion.div
                  key={title}
                  initial="hidden"
                  variants={animationVariants}
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3, delay: j * 0.075 }}
                  className="flex absolute"
                >
                  <Link href={href}>
                    <Box className="flex justify-center items-center relative rounded-xl overflow-hidden grow p-8 border-2 hover:scale-105 ease-in-out duration-300 border-transparent">
                      <Image
                        src={img}
                        className="absolute inset-0 h-full w-full"
                        alt={title}
                        width={200}
                        height={200}
                        priority
                        placeholder="blur"
                        blurDataURL={img}
                      />
                      <Box className="absolute inset-0 bg-black bg-opacity-20 z-10 hover:opacity-0" />
                      <Typography className="z-20 text-white text-center">{title}</Typography>
                    </Box>
                  </Link>
                </motion.div>
              )
            );
          })
        ))}
      </AnimatePresence>
    </Box>
  );
}