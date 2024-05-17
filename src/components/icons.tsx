"use client";
import React, { useState } from "react";
import { CiMail, CiPhone } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";

export function MailIcon({ email }: Readonly<{ email: string }>) {
  const [clicked, setClicked] = useState(false);
  const notify = () => {
    toast.success('Email copié dans le press-papier', {
      position: "bottom-center",
      duration: 5000,
    });
  };
  const handleClick = () => {
    if (!clicked) navigator.clipboard.writeText(email);
    notify();
    setClicked(true);
    setTimeout(() => setClicked(false), 1000);
  };

  return (
<button onClick={handleClick} className="align-self-end m-5 text-3xl cursor-pointer absolute right-2">
      <CiMail />
      <Toaster />
    </button>
  );
}

export function PhoneIcon({ number }: Readonly<{ number: string }>) {
  const [clicked, setClicked] = useState(false);
  const notify = () => {
    toast.success('Numéro copié dans le press-papier', {
      position: "bottom-center",
      duration: 5000,
    });
  };
  const handleClick = () => {
    if (!clicked) navigator.clipboard.writeText(number);
    notify();
    setClicked(true);
    setTimeout(() => setClicked(false), 1000);
  };

  return (
    <button onClick={handleClick} className="align-self-end m-5 text-3xl cursor-pointer absolute right-2 ">
      <CiPhone />
      <Toaster />
    </button>
  );
}
