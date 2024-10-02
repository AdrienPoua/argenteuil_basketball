import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "@/lib/redux/slices/modal";
import { RootState } from "@/lib/redux/store";
import useCloseModalOnPathChange from "@/utils/hooks/useCloseModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function Index(): ReactElement {
  return (
    <Dialog>
      <DialogTrigger>Contact</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

