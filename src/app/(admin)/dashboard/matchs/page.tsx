import Card from "./components/Card";
import { getMatchs } from "./actions/server.actions";
import Match from "@/models/Match";

export default async function Page() {
    const matchs = await getMatchs().then((matchs) => matchs.map((match) => new Match(match).toPlainObject()));
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard des matchs</h1>
            <div className="grid grid-cols-4 gap-3">
                {matchs && matchs.map((match) => <Card key={match.matchNumber} match={match} />)}
            </div>
        </div>
    )
}