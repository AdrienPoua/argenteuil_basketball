"use client";
import { Box, Button } from "@mui/material";
import { documents } from "@/utils/services/dataProcessing";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import H1 from "@/components/H1";
import { MainSection } from "@/utils/layouts";
import { motion } from "framer-motion";
import { useRef } from "react";
import useVisibility from "@/utils/hooks/useVisibility";


export default function DocumentsPage() {
  const animation = {
    hidden: { opacity: 0, x: "-25vw" },
    visible: { opacity: 1, x: 0 },
    right: { opacity: 0, x: "25vw" },
  };
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useVisibility(cardRef);
  return (
    <>
      <H1> Les documents utiles </H1>
      <MainSection>
        <Box className="flex flex-col items-center justify-center gap-5 w-fit m-auto">
          {documents.map((document, index) => (
            <motion.div
              ref={cardRef}
              initial={index % 2 === 0 ? "hidden" : "right"}
              animate={isVisible ? "visible" : "hidden"}
              variants={animation}
              key={document.id}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center w-full"
            >
              <Button
                component="a"
                href={document.url}
                download
                variant="contained"
                className="w-full"
                endIcon={<CloudUploadIcon />}
              >
                {document.title}
              </Button>
            </motion.div>
          ))}
        </Box>
      </MainSection >
    </>
  );
}
