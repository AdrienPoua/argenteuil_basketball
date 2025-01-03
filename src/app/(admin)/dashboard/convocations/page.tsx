import { useState } from 'react';
import { getMatchs } from './actions/server.action';
import SelectMatch from './components/SelectMatch';
import Match from '@/models/Match';
import Dialog from './components/dialog';
import Sidebar from './components/Sidebar';





export default async function Index() {
  const [selectedMatchs, setSelectedMatchs] = useState<ReturnType<Match["toPlainObject"]>[]>([]);
  const matchs = await getMatchs().then((matchs) => matchs.map((match) => new Match(match).toPlainObject()));
  return (
    <div className="size-full relative">
      {matchs && (
        <div className=" flex h-full">
          <Sidebar selectedMatchs={selectedMatchs} />
          <div className=" flex flex-col grow justify-center items-center ">
            <SelectMatch matchs={matchs} setSelectedMatchs={setSelectedMatchs} selectedMatchs={selectedMatchs} />
            <div className="bg-primary size-fit mb-10">
            </div>
            <Dialog selectedMatchs={selectedMatchs} />
          </div>
        </div>
      )}
    </div>
  )
}

