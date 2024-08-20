"use client";
import useIsMobile from "./useIsMobile";

const isEmail = (text: string) => text.includes("@");
const isPhone = (text: string) => text.startsWith("06") || text.startsWith("07") || text.startsWith("+33") || text.startsWith("0033");
const openMail = (to: string) => {
  window.location.href = `mailto:${to}`;
};
const openPhone = (to: string) => {
  window.location.href = `tel:${to}`;
};

const useHandleClick = () => {
  const isMobile = useIsMobile();
  return (text: string) => {
    if (isEmail(text)) {
      openMail(text);
    } else if (isMobile && isPhone(text)) {
      openPhone(text);
    } else if (!isMobile && isPhone(text)) {
      return
    }
  };
};

export default useHandleClick;
