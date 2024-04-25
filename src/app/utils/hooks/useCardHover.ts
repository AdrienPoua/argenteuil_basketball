import { useEffect } from "react";

export default function useCardHoverEffect(
  cardRef: React.MutableRefObject<HTMLAnchorElement | null>,
  imageRef: React.MutableRefObject<HTMLImageElement | null>
) {
  useEffect(() => {
    const effect = "transition duration-500 ease-in-out scale-110".split(" ");

    const handleMouseEnter = () => {
      if (imageRef.current) {
        imageRef.current.classList.add(...effect);
      }
    };

    const handleMouseLeave = () => {
      if (imageRef.current) {
        imageRef.current.classList.remove(...effect);
      }
    };

    if (cardRef.current) {
      cardRef.current.addEventListener("mouseenter", handleMouseEnter);
      cardRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("mouseenter", handleMouseEnter);
        cardRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [cardRef]);
}
