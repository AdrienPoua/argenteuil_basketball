import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


export default function DownloadButton({ title, url, className, variant } : Readonly<{ title: string, url: string, className?: string, variant? : string }>) {
  return (
    <Button
      component="a"
      href={url}
      download
      variant="contained"
      className={className}
      startIcon={<CloudUploadIcon />}>
      <Typography className={variant}>{title}</Typography>
    </Button>
  );
}
