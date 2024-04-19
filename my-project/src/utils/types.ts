type MatchDataProps = {
  Division: string;
  "N° de match ": string;
  "Equipe 1": string;
  "Equipe 2": string;
  "Date de rencontre": string; // Format MM/DD/YYYY
  Salle: string;
};

type NewsProps = {
  id: number;
  title: string;
  date: string;
  img: string;
  url: string;
  main?: boolean;
  secondary?: boolean;
};




export type { MatchDataProps, NewsProps };