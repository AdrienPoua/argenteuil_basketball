import Typography from "@mui/material/Typography";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import DoneIcon from "@mui/icons-material/Done";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const steps = [
  {
    title: "Récuperez le formulaire",
    connector: true,
    icon: <ArticleIcon />,
    content: (
          <Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
            Formulaire
          </Button>
    ),
  },
  {
    title: "Rendre le formulaire",
    connector: true,
    icon: <AssignmentTurnedInIcon />,
    content: (
      <Typography>
        {" "}
        Au gymnase à{" "}
        <Typography className='text-primary' component='span'>
          Mr.DIME
        </Typography>
      </Typography>
    ),
  },
  {
    title: "Vous recevrez un mail dans les jours suivants",
    connector: true,
    icon: <MarkEmailUnreadIcon />,
    content: (
      <Typography>
        Vérifiez vos{" "}
        <Typography className='text-primary' component='span'>
          courriers indésirables
        </Typography>
      </Typography>
    ),
  },
  {
    title: "Confirmez votre inscription",
    connector: true,
    icon: <LaptopMacIcon />,
    content: (
      <Typography>
        en terminant intégralement{" "}
        <Typography className='text-primary' component='span'>
          l'inscription informatique
        </Typography>
      </Typography>
    ),
  },
  {
    title: "Vérification de la part du club",
    connector: true,
    icon: <MarkEmailUnreadIcon />,
    content: (
      <Typography>
        Si tout est correct, vous recevrez un{" "}
        <Typography className='text-primary' component='span'>
          mail de confirmation
        </Typography>
      </Typography>
    ),
  },
  {
    title: "Vous êtes maintenant licencié",
    connector: false,
    icon: <DoneIcon />,
    content: <Typography> Bienvenue parmis nous</Typography>,
  },
];
