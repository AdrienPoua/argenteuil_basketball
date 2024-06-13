import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function MyModal({ open, setOpen, children }: Readonly<{ open: boolean; setOpen: (x: boolean) => void; children: JSX.Element }>) {
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box
        className="  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  w-[800px] bg-white border-2 border-black shadow-lg size-96 flex flex-col justify-center gap-10 px-16 bg-[url('/images/logo.png')] bg-no-repeat bg-center  ">
        {children}
      </Box>
    </Modal>
  );
}
