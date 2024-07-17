"use client"
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
import { ModalButton } from "@/components/Buttons";
import { FormulaireContent, PermanencesContent, EmailContent, InscriptionContent, ValidationContent } from '@/components/Modal';
import { motion } from "framer-motion";
import useVisibility from "@/utils/hooks/useVisibility";
import { useRef } from "react";
import H1 from "@/components/H1";
import { MainSection } from "@/utils/layouts";


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
  const animation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" } },
    hover: { backgroundColor: "#172554" }
  };
  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover="hover"
      variants={animation}
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
    <>
      <H1> Les étapes d&apos;inscription </H1>
      <MainSection>
        <Timeline sx={{ mt: 0, "& .MuiTimelineItem-root:before": { display: "none" } }} >
          <TimelineStep
            left={<Typography>Recuperez</Typography>}
            right={<ModalButton text="Formulaire" ModalContent={<FormulaireContent />} />}
            icon={<ArticleIcon />}
          />
          <TimelineStep
            left="Rendre"
            icon={<AssignmentTurnedInIcon />}
            right={<ModalButton text="Permanences" ModalContent={<PermanencesContent />} />}
          />
          <TimelineStep
            left="Recevez"
            icon={<MarkEmailUnreadIcon />}
            right={<ModalButton text="Email" ModalContent={<EmailContent />} />}
          />
          <TimelineStep
            left="Completez"
            icon={<LaptopMacIcon />}
            right={<ModalButton text="Inscription" ModalContent={<InscriptionContent />} />}
          />
          <TimelineStep
            left="Verification"
            icon={<MarkEmailUnreadIcon />}
            right={<ModalButton text="Validation" ModalContent={<ValidationContent />} />}

          />
          <TimeLineEnd />
        </Timeline>
      </MainSection>
    </>
  );
}
