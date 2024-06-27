import React, { useState, useEffect, ReactNode, useRef } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import useVisibility from "@/hooks/useVisibility";
import Arrow from "@/components/Arrow";
import { guideAnimation } from "@/animations";

type DropdownProps = {
  header: ReactNode;
  items: ReactNode;
  animation?: boolean;
};

const Dropdown = ({ header, items, animation }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const cardRef = useRef(null);
  const isVisible = useVisibility(cardRef);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  return (
    <>
      {animation ? (
        <motion.div
          ref={cardRef}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          whileHover="hover"
          variants={guideAnimation}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center w-full"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Box
            className={`flex flex-col overflow-hidden grow transition-all w-full duration-300 cursor-pointer`}
          >
            <Box className="flex items-center justify-between bg-primary p-4">
              <Box className="flex grow">{header}</Box>
              <Arrow open={open} />
            </Box>
            <Box
              ref={contentRef}
              style={{ maxHeight: open ? contentHeight : 0 }}
              className="flex flex-col transition-max-height duration-300 ease-in-out"
            >
              {items}
            </Box>
          </Box>
        </motion.div>
      ) : (
        <Box
          className={`flex flex-col overflow-hidden grow transition-all w-full duration-300 cursor-pointer`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <Box className="flex items-center justify-between bg-primary p-4">
            <Box className="flex grow">{header}</Box>
            <Arrow open={open} />
          </Box>
          <Box
            ref={contentRef}
            style={{ maxHeight: open ? contentHeight : 0 }}
            className="flex flex-col transition-max-height duration-300 ease-in-out"
          >
            {items}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Dropdown;
