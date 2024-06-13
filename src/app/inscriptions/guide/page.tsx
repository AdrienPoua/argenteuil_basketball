import Layout from "@/layout/main";
import { Box, Typography, Button } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import DoneIcon from "@mui/icons-material/Done";
import DownloadButton from "@/components/DownloadButton";

const TimelineStep = ({
  left,
  icon,
  right,
  buttonText,
  buttonHref,
  startConnecter,
  endConnecter,
}: {
  left?: React.ReactNode;
  icon: React.ReactNode;
  right?: React.ReactNode;
  buttonText?: string;
  buttonHref?: string;
  startConnecter?: boolean;
  endConnecter?: boolean;
}) => (
  <TimelineItem>
    <TimelineOppositeContent className="flex justify-end">
      <Box className="self-center text-white">{left}</Box>
    </TimelineOppositeContent>
    <TimelineSeparator>
      {startConnecter !== false && <TimelineConnector className="min-h-10" />}
      <TimelineDot color="primary">{icon}</TimelineDot>
      {endConnecter !== false && <TimelineConnector className="min-h-10" />}
    </TimelineSeparator>
    <TimelineContent className="flex">
      <Box className="self-center text-white">{right}</Box>
    </TimelineContent>
  </TimelineItem>
);

const TimeLineEnd = () => (
  <TimelineItem className="flex flex-col justify-center items-center">
    <TimelineConnector className="min-h-10" />
    <TimelineDot
      className="self-center "
      color="primary">
      <DoneIcon className="self-center" />
    </TimelineDot>
    <Typography className="self-center text-white">Vous êtes maintenant licencié</Typography>
  </TimelineItem>
);

export default function RegistrationStepsPage() {
  return (
    <Layout pageTitle="Les étapes d'inscription">
      <Box className="flex justify-center items-center">
        <Timeline sx={{ mt: 0, "& .MuiTimelineItem-root:before": { display: "none" } }}>
          <TimelineStep
            left={<Typography>Remplir le formulaire de demande de licence</Typography>}
            right={
              <Box className="flex flex-col justify-center">
                {" "}
                <Typography>Disponible en téléchargement</Typography>{" "}
                <DownloadButton
                  title="formulaire"
                  url="/documents/2024-2024_demande_de_licence.pdf"
                  className="w-fit self-center"
                  variant="tracking-wider text-xs md:text-base font-secondary"
                />{" "}
              </Box>
            }
            icon={<ArticleIcon />}
            buttonText="Formulaire"
            buttonHref="/documents/demande_de_licence_2024-2025.pdf"
          />
          <TimelineStep
            left="Rendre le formulaire et la cotisation"
            icon={<AssignmentTurnedInIcon />}
            right={
              <Box className="flex flex-col justify-center r">
                <Typography>A Jean Guimier lors des</Typography>
                <Button
                  variant="contained"
                  className="w-fit self-center">
                 <Typography className="tracking-wider text-xs md:text-base font-secondary">permanences</Typography>
                </Button>
              </Box>
            }
          />
          <TimelineStep
            left="Vous recevrez un mail dans les jours suivants"
            icon={<MarkEmailUnreadIcon />}
            right={
              <Typography>
                Verifiez vos{" "}
                <Typography
                  className="text-primary"
                  component="span">
                  courriers indésirables
                </Typography>
              </Typography>
            }
          />
          <TimelineStep
            left="Confirmez votre inscription"
            icon={<LaptopMacIcon />}
            right={
              <Typography>
                en terminant intégralement{" "}
                <Typography
                  className="text-primary"
                  component="span">
                  l&apos;inscription informatique
                </Typography>
              </Typography>
            }
          />
          <TimelineStep
            left="Verification de la part du club"
            icon={<MarkEmailUnreadIcon />}
            right={
              <Typography>
                Si tout est correct, vous recevrez un{" "}
                <Typography
                  className="text-primary"
                  component="span">
                  mail de confirmation
                </Typography>
              </Typography>
            }
          />
          <TimeLineEnd />
        </Timeline>
      </Box>
    </Layout>
  );
}
