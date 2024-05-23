import Image from "next/image";
import React, { useRef, useEffect } from "react";
import logo from "@/public/logo.png";
import Link from "next/link";

export default function Footer() {
  const signatureRef = useRef(null);
  const [isHover, setIsHover] = React.useState(false);

  useEffect(() => {
    const ref = signatureRef.current;
    const handleMouseEnter = () => {
      setIsHover(true);
    };
    const handleMouseLeave = () => {
      setIsHover(false);
    };

    ref.addEventListener("mouseenter", handleMouseEnter);
    ref.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      ref.removeEventListener("mouseenter", handleMouseEnter);
      ref.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <footer ref={signatureRef} className='border-t-2 border-indigo-500 flex flex-col px-12 '>
      <div className='flex justify-between'>
        <Link href='/' className='shrink-0'>
          <Image src={logo} alt='logo' className='me-5' width={80} height={80} />
        </Link>
        <a href='https://www.linkedin.com/in/adrien-poua' className='text-gray-500 flex justify-center items-center'>
          Made with ❤ by &nbsp; <span className={isHover ? "text-indigo-500" : ""}> Adrien POUA</span>
        </a>
        <p className='flex justify-center items-center text-white'>
          82 boulevard du général leclerc <br />
          95100 Argenteuil
        </p>
      </div>
    </footer>
  );
}
