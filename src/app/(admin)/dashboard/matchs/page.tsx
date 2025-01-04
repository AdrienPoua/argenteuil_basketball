import Card from "./components/Card";
import { getMatchs } from "./actions/server.actions";
import Match from "@/models/Match";
import Grid from "./layouts/grid";

export default async function Page() {
    const matchs = await getMatchs().then((matchs) => matchs.map((match) => new Match(match).toPlainObject()));
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard des matchs</h1>
            <Grid matchs={matchs} />
        </div>
    )
}