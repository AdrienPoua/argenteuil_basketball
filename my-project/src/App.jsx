import matchs from "./data/matchs.json";
import { Match } from "./utils/models";
import Band from "./components/Band";

export default function App() {
  return matchs.map((item) => {
    const match = new Match(item);
    return <Band key={match.number} match={match} />;
  });
}
