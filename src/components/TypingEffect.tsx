import { useEffect, useState } from "react";
import { Typography } from "@mui/material";



export default function TypingEffect({ text, classNames, span }: Readonly<{ text: string, classNames?: string, span? : boolean }>) {
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