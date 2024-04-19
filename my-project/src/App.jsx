import matchsData from "./data/matchs.json";
import { Match } from "./utils/models";
import Band from "./components/Band";
import data from "./data/news.json";
import NewsContainer from "./components/News";

export default function App() {

  return (
    <>
      <NewsContainer data={data} />
      {matchsData.map((match, index) => {
        const bandData = new Match(match);
        return <Band key={index} match={bandData} />;
      })}
    </>
  );
}
