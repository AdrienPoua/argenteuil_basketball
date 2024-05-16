"use client" 
import React, { useState } from 'react';
import { CiMail } from "react-icons/ci";


export function MailIcon(email : string) {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        if (!clicked) navigator.clipboard.writeText(email);
        setClicked(true);
        setTimeout(() => setClicked(false), 1000);
    };

    return (
        <CiMail onClick={handleClick} className="cursor-pointer" />
    );
  }