import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useModal } from "@/contexts/modalContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { club } from "@/services/dataProcessing";
import { Utils } from "@/models";

export default function MyModal() {
  const { open, setOpen, content } = useModal();
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        w-[800px] bg-white border-2 border-black shadow-lg size-96 flex flex-col justify-center gap-10 px-16 bg-[url('/images/logo.png')] bg-no-repeat bg-center"
      >
        {content}
      </Box>
    </Modal>
  );
}

export function ContactContent({ isMobile } :  Readonly<{ isMobile: boolean }>) {
  const handleClick = (text : string) => {
    if (isMobile && text.includes("@")) {
      window.location.href = `mailto:${text}`;
    } else if (isMobile) {
      window.location.href = `tel:${text}`;
    } else if (!isMobile && text.includes("@")) {
      window.location.href = `mailto:${text}`;
    }
  };
  return (
    <Box className="flex flex-col gap-5">
       <Button
      className="bg-black py-4 hover:bg-black"
      endIcon={<EmailIcon />}
      onClick={() => handleClick(club.email)}
    >
      <Typography className="leading-10 tracking-wider font-secondary text-xs md:text-base">
        {club.email}
      </Typography>
    </Button>
    <Button
      className="bg-black py-4 hover:bg-black"
      endIcon={<PhoneIphoneIcon />}
      onClick={() => handleClick(club.phone)}
    >
      <Typography className="leading-10 tracking-wider font-secondary text-xs md:text-base">
        {Utils.formatPhoneNumber(club.phone)}
      </Typography>
    </Button>
    </Box>
  );
}
