import { ReactElement } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { close } from "@/lib/redux/slices/modal";
import { RootState } from "@/lib/redux/store";
import useCloseModalOnPathChange from "@/utils/hooks/useCloseModal";


export default function Index(): ReactElement {
  const dispatch = useDispatch();
  useCloseModalOnPathChange();
  const { open, content } = useSelector((state: RootState) => state.modal);
  return (
    <Modal
      open={open}
      onClose={() => dispatch(close())}
      aria-labelledby="Modal-Modal-title"
      aria-describedby="Modal-Modal-description">
      <Box
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-fit min-h-fit
          flex flex-col justify-center items-center max-w-[80%] ">
        <Paper
          elevation={0}
          className="p-5  flex flex-col bg-transparent justify-center items-center px-10 z-10">
          {content}
        </Paper>
      </Box>
    </Modal>
  );
}

