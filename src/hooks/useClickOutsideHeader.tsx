"use client"
import { useEffect, MutableRefObject } from "react";

export default function useClickOutside(
  isMenuOpen: boolean,
  setIsMenuOpen: (open: boolean) => void,
  headerRef: MutableRefObject<HTMLElement | null>
): void {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        isMenuOpen &&
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside, { capture: true });
    return () => {
      window.removeEventListener("click", handleClickOutside, {
        capture: true,
      });
    };
  }, [isMenuOpen, setIsMenuOpen, headerRef]); // Dependencies are correct
}
