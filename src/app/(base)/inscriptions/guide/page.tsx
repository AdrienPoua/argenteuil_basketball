"use client"
import { ReactElement } from "react";
import Timeline from "@mui/lab/Timeline";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import H1 from "@/components/H1";
import { MainSection } from "@/utils/layouts";
import EmailGuide from "./EmailGuide";
import FormulaireGuide from "./FormulaireGuide";
import InscriptionGuide from "./InscriptionGuide";
import PermanencesGuide from "./PermanencesGuide";
import ValidationGuide from "./ValidationGuide";
import TimelineStep, { TimeLineEnd } from "./TimeLineStep";
import ModalButton from "./ModalButton";



const steps = [
  {
    left: "Recuperez",
    right: <ModalButton text="Formulaire" ModalContent={<FormulaireGuide />} />,
    icon: <ArticleIcon />,
  },
  {
    left: "Rendre",
    right: <ModalButton text="Permanences" ModalContent={<PermanencesGuide />} />,
    icon: <AssignmentTurnedInIcon />,
  },
  {
    left: "Recevez",
    right: <ModalButton text="Email" ModalContent={<EmailGuide />} />,
    icon: <MarkEmailUnreadIcon />,
  },
  {
    left: "Completez",
    right: <ModalButton text="Inscription" ModalContent={<InscriptionGuide />} />,
    icon: <LaptopMacIcon />,
  },
  {
    left: "Verification",
    right: <ModalButton text="Validation" ModalContent={<ValidationGuide />} />,
    icon: <MarkEmailUnreadIcon />,
  },
];


export default function Index(): ReactElement {
  return (
    <>
      <H1> Les étapes d&apos;inscription </H1>
      <MainSection>
        <Timeline sx={{ mt: 0, "& .MuiTimelineItem-root:before": { display: "none" } }} >
          {steps.map((step, index) => (
            <TimelineStep key={step.left} {...step} index={index} />
          ))}
          <TimeLineEnd />
        </Timeline>
      </MainSection>
    </>
  );
}

