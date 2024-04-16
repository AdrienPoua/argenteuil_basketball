import React from 'react'
import matchs from "./data/matchs.json";
import { Match } from "./utils/models";


export default function App() {
  const match = new Match(matchs[0]);
  console.log(match.isMatchToday());
  return <div>App</div>;
}
