import { useDispatch } from "react-redux";
import { close } from "@/lib/redux/slices/modal";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const useCloseModalOnPathChange = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  useEffect(() => {
    dispatch(close());
  }, [pathname, dispatch]);
};

export default useCloseModalOnPathChange;