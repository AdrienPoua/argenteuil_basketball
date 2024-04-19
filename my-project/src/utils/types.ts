type MatchDataProps = {
  Division: string;
  "N° de match ": string;
  "Equipe 1": string;
  "Equipe 2": string;
  "Date de rencontre": string; // Format MM/DD/YYYY
  Salle: string;
};

type MainNews = {
  id: number;
  title: string;
  url: string;
  description: string;
  img: string;
  main: true;
  date:"string";
};

type SecondaryNews = Omit<MainNews, "main"> & {
  secondary: true;
};

type OthersNews = Omit<MainNews, "main">[];

type NewsProps = {
  mainNews: MainNews;
  secondaryNews: SecondaryNews;
  othersNews: OthersNews;
};

type CardProps = { url: string; img: string; title: string; date: string };


export type { MatchDataProps, NewsProps, MainNews, SecondaryNews, OthersNews, CardProps };