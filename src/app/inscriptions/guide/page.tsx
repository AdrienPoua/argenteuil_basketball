import Layout from '@/components/layouts/main';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Box from '@mui/material/Box';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Link from "next/link";
import licence from '/public/demande_de_licence_2024-2025.pdf';




export default function Index() {
  return (
    <Layout pageTitle="Les étapes d'inscription"> 
    <Box className="flex justify-center items-center">
    <Timeline >
      <TimelineItem>
      <TimelineOppositeContent
         >
          Recuperer le formulaire
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <ArticleIcon />
          </TimelineDot>
          <TimelineConnector className="min-h-10" />
        </TimelineSeparator>
        <TimelineContent >
        <Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
            <Link href="/public/demande_de_licence_2024-2025.pdf" target="_blank" download > Formulaire </Link>
          </Button>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
         className="mt-12">
          Rendre le formulaire
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector className="min-h-10" />
          <TimelineDot color="primary">
            <AssignmentTurnedInIcon />
          </TimelineDot>
          <TimelineConnector className="min-h-10" />
        </TimelineSeparator>
        <TimelineContent >
        <Typography className="mt-12"> A Jean Guimier <Typography className='text-primary' component="span"> à Mr.DIME </Typography></Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
         className="mt-12">
          Vous reçeverez un mail dans les jours suivants
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector className="min-h-10" />
          <TimelineDot color="primary">
            <MarkEmailUnreadIcon />
          </TimelineDot>
          <TimelineConnector className="min-h-10" />
        </TimelineSeparator>
        <TimelineContent >
          <Typography className="mt-12"> Verifiez vos <Typography className='text-primary' component="span"> courriers indésirables  </Typography></Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
         className="mt-12">
          Confirmez votre inscription
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector className="min-h-10" />
          <TimelineDot color="primary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector className="min-h-10" />
        </TimelineSeparator>
        <TimelineContent >
          <Typography className="mt-12"> en terminant intégralement<Typography className='text-primary' component="span">  l'inscription informatique </Typography></Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
         className="mt-12">
          Verification de la part du club
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector className="min-h-10" />
          <TimelineDot color="primary">
            <MarkEmailUnreadIcon />
          </TimelineDot>
          <TimelineConnector className="min-h-10" />
        </TimelineSeparator>
        <TimelineContent >
          <Typography className="mt-12"> Si tout est correct, vous reçeverez un <Typography className='text-primary' component="span">  mail de confirmation </Typography></Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
         className="mt-12">
          
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector className="min-h-10" />
          <TimelineDot color="primary">
            <DoneIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent >
          <Typography className="mt-12"> Vous êtes maintenant licencié </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
    </Box>
     </Layout>
  )
}
