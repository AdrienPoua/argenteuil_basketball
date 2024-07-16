"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { useOverlay } from "@/utils/contexts/Overlay";


type DownloadButtonProps = {
  title: string;
  url: string;
};
export function DownloadButton({ title, url }: Readonly<DownloadButtonProps>) {
  return (
    <Button
      component="a"
      href={url}
      download
      variant="contained"
      className="w-full"
      startIcon={<CloudUploadIcon />}
    >
      {title}
    </Button>
  );
}


export const ContactButton = ({ icon, text, available }: { icon: React.ReactNode; text: string; available: boolean }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isClicked, setIsClicked] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(icon);

  const isEmail = text.includes("@");
  const isPhone = text.startsWith("06") || text.startsWith("07") || text.startsWith("+33");

  const handleClick = () => {
    if (!isClicked && available && window !== undefined) {
      if (isEmail) {
        window.open(`mailto:${text}`);
      } else if (isPhone && isMobile) {
        window.open(`tel:${text}`);
      }
    }
    setIsClicked((prev) => !prev);
  };

  useEffect(() => {
    switch (true) {
      case !available && isClicked:
        setContent(<DoNotDisturbIcon />);
        setTimeout(() => {
          setIsClicked(false);
        }, 1500);
        break;
      case isClicked && isMobile:
        setContent(icon);
        break;
      case isClicked && !isMobile && !isEmail:
        setContent(text);
        break;
      default:
        setContent(icon);
        break;
    }
  }, [isMobile, isClicked, available, text, icon, isEmail]);

  return (
    <Button
      component="li"
      variant="contained"
      onClick={handleClick}
      className={`flex items-center justify-center bg-primary h-full ${!isClicked || content === <DoNotDisturbIcon /> ? " size-16 md:size-20" : "size-fit"} `}>
      {content}
    </Button>
  );
};

export const OverlayButton = ({ overlayContent, text }: { overlayContent: React.JSX.Element; text: string }) => {
  const { setOpen, setContent } = useOverlay()
  const handleClick = () => {
    setContent(overlayContent);
    setOpen(true);
  };
  return (
    <Button
      variant="contained"
      onClick={handleClick}
      className="w-full min-h-8">
      <Typography className="text-xs md:text-base">{text}</Typography>
    </Button>
  );
};

