import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useModal } from "@/contexts/modalContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { club, permanence, documents } from "@/services/dataProcessing";
import { Utils } from "@/models";
import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Paper } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { DownloadButton, ModalButton } from "./Buttons";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyModal() {
  const { open, setOpen, content } = useModal();
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-fit min-h-fit
          flex flex-col justify-center items-center">
        <Paper
          elevation={0}
          className="p-5  flex flex-col bg-transparent justify-center items-center px-10 z-10">
          {content}
        </Paper>
      </Box>
    </Modal>
  );
}

export function ContactContent({ isMobile }: Readonly<{ isMobile: boolean }>) {
  const handleClick = (text: string) => {
    if (isMobile && text.includes("@")) {
      window.location.href = `mailto:${text}`;
    } else if (isMobile) {
      window.location.href = `tel:${text}`;
    } else if (!isMobile && text.includes("@")) {
      window.location.href = `mailto:${text}`;
    }
  };
  const logoRef = useRef<HTMLElement | null>(null);

  const { setOpen } = useModal();
  return (
    <Box className="flex flex-col items-center  gap-5 max-w-[80%] ">
      <Box
        ref={logoRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] aspect-square"
        onClick={() => setOpen(false)}>
        <Image
          src="/images/logo.png"
          width={500}
          height={500}
          alt="logo"
        />
      </Box>
      <Button
        className=" bg-primary py-4 min-w-[500px] hover:bg-primary "
        endIcon={<EmailIcon className="text-black" />}
        onClick={() => handleClick(club.email)}>
        <Typography className=" text-black  text-xs md:text-base">{club.email}</Typography>
      </Button>
      <Button
        className=" bg-primary py-4 min-w-[500px]  hover:bg-primary "
        endIcon={<PhoneIphoneIcon className="text-black" />}
        onClick={() => handleClick(club.phone)}>
        <Typography className=" text-black  text-xs md:text-base">{Utils.formatPhoneNumber(club.phone)}</Typography>
      </Button>
    </Box>
  );
}

export function PermanencesContent() {
  return (
    <Box className="flex flex-col bg-white p-5 gap-5 rounded-lg min-w-[350px]">
      <Box>
        <Typography className="text-xs md:text-base text-black text-center">
          Deposez le formulaire ainsi que le montant de la{" "}
          <Link
            href="/inscriptions/tarifs"
            className="text-primary hover:text-primary-dark underline underline-offset-8 ">
            {" "}
            cotisation{" "}
          </Link>{" "}
          à Mr.DIME, aux horaires suivants
        </Typography>
      </Box>

      <TableContainer className="rounded-md">
        <Table className="bg-primary">
          <TableHead className="mb-5">
            <TableRow className="bg-primary">
              <TableCell colSpan={3}>
                <Typography className="text-center text-xs md:text-base"> A partir du {permanence.start} </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permanence.slots.map((slot) => (
              <TableRow key={slot.day}>
                <TableCell>
                  <Typography className="text-center text-xs md:text-base">{slot.day}</Typography>
                </TableCell>
                <TableCell>
                  <EastIcon className="text-white" />
                </TableCell>
                <TableCell>
                  <Typography className=" text-xs md:text-base">
                    {slot.startTime} - {slot.endTime}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>
                <Typography className="text-center text-xs md:text-base">Au gymnase {permanence.place} </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export function FormulaireContent() {
  const licence = documents.find((doc) => doc.title === "Demande de licence")?.url ?? "";
  return (
    <Box className="flex items-center gap-5 bg-white p-12 basis-1/2 rounded-lg">
      <Box className="flex flex-col justify-center items-center gap-10">
        <Typography className="text-xs md:text-base text-black"> Telechargez </Typography>
        <DownloadButton
          title="Formulaire"
          url={licence}
        />
      </Box>
      <Box className="flex flex-col justify-center items-center gap-10 basis-1/2">
        <Typography className="text-xs md:text-base text-black"> Ou récuperez </Typography>
        <ModalButton
          text="Permanences"
          modalContent={<PermanencesContent />}
        />
      </Box>
    </Box>
  );
}

export function EmailContent() {
  return (
    <Box className="flex flex-col bg-white p-5 gap-5 min-w-[350px]">
      <Typography className="text-xs md:text-base text-black text-center">
        {" "}
        Apres avoir déposé votre formulaire, vous receverez un email de la part de{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          envoi@ffbb.com{" "}
        </Box>{" "}
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        {" "}
        Cela peut prendre{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          plusieurs jours{" "}
        </Box>{" "}
        à semaines en fonction du délai de traitement des formulaires{" "}
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        {" "}
        Ce mail contient un lien pour{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          poursuivre votre inscription{" "}
        </Box>
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">Pensez à verifiez vos courriers indésirables</Typography>
      <Typography className="text-xs md:text-base text-black text-center  bg-primary"> A ce stade, vous n&apos;êtes toujours pas licencié </Typography>
    </Box>
  );
}

export function InscriptionContent() {
  return (
    <Box className="flex flex-col bg-white p-5 gap-5 min-w-[350px]">
      <Typography className="text-xs md:text-base text-black text-center bg-primary"> Une fois le mail reçu, cliquez sur le lien</Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        {" "}
        La{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          photo
        </Box>{" "}
        doit être récente, le visage doit apparaître de façon claire. <br />
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          Prenez simplement une photo de votre visage{" "}
        </Box>
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        {" "}
        Le{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          certificat médical{" "}
        </Box>{" "}
        est uniquement pour les personnes majeures et pour les mineurs surclassés. <br /> Il est valable 3 ans, doit clairement mentionner
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          basketball en compétition
        </Box>
        , être signé et tamponné par le medecin.
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        Choisissez votre{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          assurance{" "}
        </Box>
        , celle-ci est comprise dans le prix de la licence.
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        Choisissez{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          paiment au club{" "}
        </Box>{" "}
        comme type de paiment
      </Typography>
    </Box>
  );
}

export function ValidationContent() {
  return (
    <Box className="flex flex-col bg-white p-5 gap-5 min-w-[350px]">
      <Typography className="text-xs md:text-base text-black text-center bg-primary"> Nous validons votre licence</Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        Cette étape est
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          réalisée par le club
        </Box>
        , vous n&apos;avez rien à faire.
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        {" "}
        Cependant si vous avez mal rempli une étape, vous serez{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          contacté pour la corriger
        </Box>
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        {" "}
        Vous recevrez un mail de confirmation de la part de{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          la ffbb
        </Box>
      </Typography>
    </Box>
  );
}
