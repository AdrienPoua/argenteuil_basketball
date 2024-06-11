import { Box, Typography, Container, Grid } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import Image from "next/image";

const ABBLogo = () => {
  return (
    <Image
      src="/images/logo.png"
      alt="Argenteuil Basketball"
      width="120"
      height="120"
      className="shrink-0 w-32 aspect-square self-center items-center "
      objectFit="cover "
    />
  );
};


const Header = () => {
  return (
    <Box className="flex border-b-4 px-10 border-black py-4 mb-20 text-black font-serif">
      <ABBLogo />
      <Box className="flex flex-col justify-center items-center grow">
        <Typography className="text-black">Argenteuil Basketball</Typography>
        <Typography className="text-black">Espace Nelson Mandela - 92 Bd du Général Leclerc 95100 Argenteuil</Typography>
        <Box className="flex gap-10 mt-2">
          <Typography className="text-black">
            <PhoneIcon /> : 06 70 22 22 38
          </Typography>
          <Typography className="text-black">
            <EmailIcon /> : argenteuilbasketball@hotmail.fr
          </Typography>
        </Box>
        <Box className="flex gap-10 mt-2">
          <Typography className="text-black">SIREN : 443 508 304</Typography>
          <Typography className="text-black">SIRET : 44350830400013</Typography>
        </Box>
      </Box>
      <ABBLogo />
    </Box>
  );
};

const FaitLe = () => {
  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  return (
    <Box className="flex justify-end my-4 text-black">
      <Typography className="text-black underline" >
        Fait à Argenteuil, le <span>{formattedDate}</span>
      </Typography>
    </Box>
  );
};

const Mme = () => {
  return (
    <Box className="mt-8">
      <Typography className="text-black">Madame, Monsieur,</Typography>
    </Box>
  );
};

const Sign = () => {
  return (
    <Box className="my-8 flex flex-col items-end justify-end mb-28">
      <Typography className="text-black">BOUCHERIT Hakim</Typography>
      <Typography className="text-black">Président de l'association Argenteuil Basketball</Typography>
      <Image
        src="/images/signature.png"
        alt="Signature"
        width="300"
        height="300"
      />
    </Box>
  );
};

const Content = ({ text }) => {
  return (
    <Container className="my-4 flex grow flex-col item-center mt-24 leading-10">
      <Typography
        paragraph
        className="text-black leading-10">
        {text}
      </Typography>
      <Typography
        paragraph
        className="text-black">
        Je vous prie de bien vouloir agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
      </Typography>
    </Container>
  );
};

export default function Page() {
  const text =
    " Je soussigné(e) BOUCHERIT Hakim, Président de l'association Argenteuil Basketball, atteste sur l'honneur que l'association Argenteuil Basketball est affiliée à la Fédération Française de Basketball et que les informations fournies dans le présent dossier sont exactes.";
  return (
    <Container
      disableGutters
      className="bg-white text-black h-svh flex flex-col">
      <Header />
      <Box className="flex flex-col grow px-36">
        <FaitLe />
        <Mme />
        <Content text={text} />
        <Sign />
      </Box>
    </Container>
  );
}
