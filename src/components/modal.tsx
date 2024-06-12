import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import club from "@/data/club.json";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const OpenContact = ({ icon, text, isMobile }: { icon: JSX.Element; text: string; isMobile: boolean }) => {
  const handleClick = () => {
    if (isMobile && text.includes("@")) {
      window.location.href = `mailto:${text}`;
    } else if (isMobile ) {
      window.location.href = `tel:${text}`;
    } else if (!isMobile && text.includes("@")) {
      window.location.href = `mailto:${text}`;
    } else {
      return;
    }
  };

  return (
    <Button
      className="bg-black py-4"
      sx={{
        '&:hover': {
          backgroundColor: 'black', // Ou n'importe quelle couleur pour éviter le changement
        },
      }}
      endIcon={icon}
      onClick={handleClick}>
      <Typography className="leading-10 tracking-wider font-secondary text-xs md:text-base "> {text} </Typography>
    </Button>
  );
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = React.useCallback(() => setOpen(true), []);
  const handleClose = React.useCallback(() => setOpen(false), []);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box className="flex justify-center items-center ">
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary">
        <Typography
          variant="body1"
          className="tracking-widest font-thin">
          {" "}
          Contact{" "}
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          className="  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  w-[800px] bg-white border-2 border-black shadow-lg size-96 flex flex-col justify-center gap-10 px-16 bg-[url('/images/logo.png')] bg-no-repeat bg-center  ">
            <OpenContact
              icon={<EmailIcon color="primary" />}
              text={club.email}
              isMobile={isMobile}
            />
            <OpenContact
              icon={<PhoneIphoneIcon color="primary" />}
              text={club.number}
              isMobile={isMobile}
            />
        </Box>
      </Modal>
    </Box>
  );
}
