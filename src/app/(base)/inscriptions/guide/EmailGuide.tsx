"use client"
import { ReactElement } from "react";

export default function Index(): ReactElement {
  return (
    <div className="flex flex-col bg-white p-5 gap-5 min-w-[350px]">
      <p className="text-xs md:text-base text-black text-center">
        Apres avoir déposé votre formulaire, vous receverez un email de la part de{" "}
        <span className="text-primary">
          envoi@ffbb.com
        </span>
      </p>
      <p className="text-xs md:text-base text-black text-center">
        Cela peut prendre{" "}
        <span className="text-primary">
          plusieurs jours à quelques semaines
        </span>{" "}
        en fonction du délai de traitement des formulaires
      </p>
      <p className="text-xs md:text-base text-black text-center">
        Cet email contiendra un lien pour{" "}
        <span className="text-primary">
          poursuivre votre inscription
        </span>
      </p>
      <p className="text-xs md:text-base text-black text-center">Pensez à vérifier vos courriers indésirables</p>
      <p className="bg-primary text-center">À ce stade, vous n&apos;êtes pas licencié</p>
    </div>
  );
}