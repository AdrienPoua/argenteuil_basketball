import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Overlay from "@mui/material/Modal";
import { useOverlay } from "@/contexts/Overlay";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { club, permanence, documents } from "@/services/dataProcessing";
import { Utils, Member } from "@/models";
import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Paper } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { sendEmail } from "@/actions";
import Image from "next/image";
import { useRef, useEffect, useState, SetStateAction } from "react";
import { DownloadButton, OverlayButton } from "./Buttons";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyOverlay() {
  const { open, setOpen, content } = useOverlay();
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);
  return (
    <Overlay
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="overlay-overlay-title"
      aria-describedby="overlay-overlay-description">
      <Box
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-fit min-h-fit
          flex flex-col justify-center items-center">
        <Paper
          elevation={0}
          className="p-5  flex flex-col bg-transparent justify-center items-center px-10 z-10">
          {content}
        </Paper>
      </Box>
    </Overlay>
  );
}

export function ContactContent({ isMobile }: Readonly<{ isMobile: boolean }>) {
  const handleClick = (text: string) => {
    if (isMobile && text.includes("@") && window !== undefined) {
      window.location.href = `mailto:${text}`;
    } else if (isMobile && window !== undefined) {
      window.location.href = `tel:${text}`;
    } else if (!isMobile && text.includes("@") && window !== undefined) {
      window.location.href = `mailto:${text}`;
    }
  };
  const logoRef = useRef<HTMLElement | null>(null);

  const { setOpen } = useOverlay();
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
          Remettez le formulaire et le montant de la{" "}
          <Link
            href="/inscriptions/tarifs"
            className="text-primary hover:text-primary-dark underline underline-offset-8 ">
            {" "}
            cotisation{" "}
          </Link>{" "}
          à M. DIME aux horaires suivants :
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
    <Box className="flex items-center bg-white p-12 gap-2 basis-1/2 rounded-lg">
      <Box className="flex flex-col justify-center items-center gap-10 ">
        <Typography className="text-xs md:text-base text-black"> Telechargez </Typography>
        <DownloadButton
          title="Formulaire"
          url={licence}
        />
      </Box>
      <Box className="bg-black min-h-full py-16 px-[1px] grow flex" />
      <Box className="flex flex-col justify-center items-center gap-10 basis-1/2">
        <Typography className="text-xs md:text-base text-black"> récuperez </Typography>
        <OverlayButton
          text="Permanences"
          overlayContent={<PermanencesContent />}
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
          plusieurs jours à quelques semaines{" "}
        </Box>{" "}
        en fonction du délai de traitement des formulaires{" "}
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        {" "}
        Cet email contiendra un lien pour{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          poursuivre votre inscription{" "}
        </Box>
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">Pensez à vérifier vos courriers indésirables</Typography>
      <Typography className="text-xs md:text-base text-black text-center  bg-primary"> À ce stade, vous ne serez pas encore licencié. </Typography>
    </Box>
  );
}

export function InscriptionContent() {
  return (
    <Box className="flex flex-col bg-white p-5 gap-5 min-w-[350px]">
      <Typography className="text-xs md:text-base text-black text-center bg-primary"> Une fois l&apos;email reçu, cliquez sur le lien.</Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        {" "}
        La{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          photo
        </Box>{" "}
        doit être récente et montrer clairement votre visage. <br />
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          Prenez simplement une photo de votre visage.{" "}
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
        est nécessaire uniquement pour les personnes majeures et les mineurs surclassés. <br /> Il est valable 3 ans, doit clairement mentionner la
        pratique du
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          basketball en compétition
        </Box>
        , et doit être signé et tamponné par le médecin.
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        Choisissez votre{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          assurance{" "}
        </Box>
        , celle-ci est incluse dans le prix de la licence.
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        Sélectionnez{" "}
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
        Cependant, si vous avez mal rempli une étape, vous serez{" "}
        <Box
          className="text-primary"
          component={"span"}>
          {" "}
          contacté pour la corriger
        </Box>
      </Typography>
      <Typography className="text-xs md:text-base text-black text-center">
        {" "}
        Vous recevrez un email de confirmation de la part la{" "}
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

interface EmailMemberContentProps {
  members: Member[];
}

export const EmailMemberContent = ({ members }: EmailMemberContentProps) => {
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [result, setResult] = useState<number | { success: boolean; message: string; error?: unknown }>();
  const [disabled, setDisabled] = useState(false);
  const emails: string = members.map((member) => member.email).join(", ");

  const handleContentChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setContent(event.target.value);
  };

  const handleSubjectChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSubject(event.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      setDisabled(true);
      const res = await sendEmail(emails, subject, content);
      setResult(res);
      if (res.success) {
        setDisabled(false);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      setResult({ success: false, message: "Erreur lors de l'envoi de l'email", error });
    }
  };

  return (
    <Box className="bg-red-500 min-h-[500px] aspect-square p-4">
      {!result ? (
        <Box className="flex flex-col justify-center items-center gap-5 grow">
          <TextField
            label="Sujet du mail"
            rows={1}
            variant="outlined"
            value={subject}
            onChange={handleSubjectChange}
            sx={{ width: '100%', marginBottom: '16px' }}
          />
          <TextField
            label="Entrez votre message ici"
            multiline
            rows={10}
            variant="outlined"
            value={content}
            onChange={handleContentChange}
            sx={{ width: '100%', marginBottom: '16px' }}
          />
          <Button variant="contained" color="primary" disabled={disabled} onClick={handleSubmit}>
            Soumettre
          </Button>
        </Box>
      ) : (
        <Typography>{JSON.stringify(result)}</Typography>
      )}
    </Box>
  );
};
