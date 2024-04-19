// import matchs from "./data/matchs.json";
// import { Match } from "./utils/models";
// import Band from "./components/Band";
import news from "./data/news.json";
import News from "./components/News";

export default function App() {
  // const sortedMatchs = matchs.sort((a, b) => new Date(new Match(a).USA_DATE() ) + new Date(new Match(b).USA_DATE()));
  // return sortedMatchs.map((item) => {
  //   const match = new Match(item);
  //   return <Band key={match.number} match={match} />;
  // });


  const mainNews = news.find((item) => item.main) || news[0];
  const secondaryNews = news.find((item) => item.secondary) || news[1];
  const othersNews = news.filter((item) => !item.main && !item.secondary && item.main !== news[0] && item.secondary !== news[1]) 
  console.log("🚀 ~ App ~ othersNews:", othersNews)
  

  return (
    
    <News mainNews={mainNews} secondaryNews={secondaryNews} othersNews={othersNews}> ok </News> 
  
  )
  }

