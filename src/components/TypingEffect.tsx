import { useEffect, useState } from "react";
import { Typography } from "@mui/material";


type PropsType = {
  text: string;
  classNames?: string;
  span?: boolean;
};
export default function TypingEffect({ text, classNames, span }: Readonly<PropsType>) {
  const [displayedText, setDisplayedText] = useState("");
  const [i, setI] = useState(0);


  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prevState) => prevState + text.charAt(i));
        setI(i + 1)
      } else {
        clearInterval(typingEffect);
      }
    }, 100);

    return () => {
      clearInterval(typingEffect);
    };
  }, [i, text]);

  return (
    <Typography className={classNames} component={span ? "span" : "p"}>
      {displayedText || "Typing Effect"}
    </Typography>
  );
}