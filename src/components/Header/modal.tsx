import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import club from "@/data/club.json";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";
import toast, { Toaster } from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => setOpen(true), []);
  const handleClose = React.useCallback(() => setOpen(false), []);
  const [clicked, setClicked] = useState(false);

  const EMAIL_NOTIFICATION = "Email copié dans le press-papier";
  const NUMBER_NOTIFICATION = "Numéro copié dans le press-papier";

  const notify = useCallback((data: string) => {
    const message = data.includes("@") ? EMAIL_NOTIFICATION : NUMBER_NOTIFICATION;
    toast.success(message, {
      position: "bottom-center",
      duration: 5000,
    });
  }, []);

  const handleClick = useCallback(
    (data: string) => {
      if (!clicked) {
        navigator.clipboard.writeText(data);
        notify(data);
        setClicked(true);
      }
    },
    [clicked, notify]
  );

  useEffect(() => {
    if (clicked) {
      const timer = setTimeout(() => setClicked(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [clicked]);

  return (
    <div className='flex justify-center items-center '>
      <Button onClick={handleOpen} variant='contained' color='primary' className="tracking-widest	">
        <Typography variant="body1" className="tracking-widest"> Contact </Typography>
      </Button>
      <Toaster />
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box
          className='  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  w-[800px] bg-white border-2 border-black shadow-lg px-36 py-20'
        >
          <Typography id='modal-modal-title' className='mb-16 text-center text-6xl' component='h2' color='primary'>
            Contactez nous
          </Typography>
          <Box className='flex mb-10 cursor-pointer' onClick={() => handleClick(club.email)}>
            <EmailIcon fontSize='large' color='primary' />
            <Typography id='modal-modal-description' className='flex items-center ms-10 text-3xl' variant='body2'>
              {club.email}
            </Typography>
          </Box>
          <Box className='flex cursor-pointer' onClick={() => handleClick(club.number)}>
            <PhoneIphoneIcon fontSize='large' color='primary' />
            <Typography id='modal-modal-description' className='flex items-center ms-10 text-3xl' variant='body2'>
              {club.number}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
