import matchs from "./data/matchs.json";
import { Match } from "./utils/models";
import Band from "./components/Band";

export default function App() {
  const sortedMatchs = matchs.sort((a, b) => new Date(new Match(a).USA_DATE() ) + new Date(new Match(b).USA_DATE()));
  return sortedMatchs.map((item) => {
    const match = new Match(item);
    return <Band key={match.number} match={match} />;
  });
}
