import { useState, useEffect, ReactNode, useRef } from "react";
import { Box } from "@mui/material";
import Arrow from "@/components/Header/Arrow";

type DropdownProps = {
  header: ReactNode;
  items: ReactNode;
};


const Dropdown = ({ header, items }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  return (
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
  );
};

export default Dropdown;
