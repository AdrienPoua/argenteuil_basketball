"use client"
import Layout from "@/layouts/main";
import { Box, Typography } from "@mui/material";
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
import { OverlayButton } from "@/components/Buttons";
import { FormulaireContent, PermanencesContent, EmailContent, InscriptionContent, ValidationContent } from '@/components/Overlay';
import { motion } from "framer-motion";
import useVisibility from "@/hooks/useVisibility";
import { useRef } from "react";
import {  guideAnimation } from "@/animations";


interface TimelineStepProps {
  left?: React.ReactNode;
  icon: React.ReactNode;
  right?: React.ReactNode;
  startConnecter?: boolean;
  endConnecter?: boolean;
}
const TimelineStep: React.FC<TimelineStepProps> = ({ left, icon, right, startConnecter = true, endConnecter = true }) => {
  const cardRef = useRef(null);
  const isVisible = useVisibility(cardRef);

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover="hover"
      variants={guideAnimation}
      transition={{ duration: 0.5 }}
    >
      <TimelineItem className="flex relative">
        <TimelineOppositeContent className="flex justify-end w-[45%]">
          <Box className="self-center text-white">{left}</Box>
        </TimelineOppositeContent>
        <TimelineSeparator className="self-center">
          {startConnecter && <TimelineConnector className="min-h-10" />}
          <TimelineDot color="primary" className="self-center">{icon}</TimelineDot>
          {endConnecter && <TimelineConnector className="min-h-10" />}
        </TimelineSeparator>
        <TimelineContent className="flex grow w-[45%]">
          <Box className="self-center text-white w-44">{right}</Box>
        </TimelineContent>
      </TimelineItem>
    </motion.div>
  );
};

const TimeLineEnd = () => (
  <TimelineItem className="flex flex-col justify-center items-center self-center ">
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
        <Timeline sx={{ mt: 0, "& .MuiTimelineItem-root:before": { display: "none" } }} >
          <TimelineStep
            left={<Typography>Recuperez</Typography>}
            right={<OverlayButton text="Formulaire" overlayContent={<FormulaireContent />} />}
            icon={<ArticleIcon />}
          />
          <TimelineStep
            left="Rendre"
            icon={<AssignmentTurnedInIcon />}
            right={<OverlayButton text="Permanences" overlayContent={<PermanencesContent />} />}
          />
          <TimelineStep
            left="Recevez"
            icon={<MarkEmailUnreadIcon />}
            right={<OverlayButton text="Email" overlayContent={<EmailContent />} />}
          />
          <TimelineStep
            left="Completez"
            icon={<LaptopMacIcon />}
            right={<OverlayButton text="Inscription" overlayContent={<InscriptionContent />} />}
          />
          <TimelineStep
            left="Verification"
            icon={<MarkEmailUnreadIcon />}
            right={<OverlayButton text="Validation" overlayContent={<ValidationContent />} />}

          />
          <TimeLineEnd />
        </Timeline>
      </Box>
    </Layout>
  );
}
