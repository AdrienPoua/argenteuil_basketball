"use client"
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import SelectMatch from '../components/SelectMatch';
import Dialog from '../components/dialog';
import { PropsType } from '../types/pannel.types';

export default function Pannel({ matchs }: Readonly<PropsType>) {
  const [selectedMatchs, setSelectedMatchs] = useState<PropsType["matchs"]>([]);
  console.log("🚀 ~ Pannel ~ matchs:", matchs)
  console.log("🚀 ~ Pannel ~ selectedMatchs:", selectedMatchs)
  
  return (
    <div className=" flex h-full">
      <Sidebar selectedMatchs={selectedMatchs} />
      <div className=" flex flex-col grow justify-center items-center ">
        <SelectMatch matchs={matchs} setSelectedMatchs={setSelectedMatchs} selectedMatchs={selectedMatchs} />
        <Dialog selectedMatchs={selectedMatchs} />
      </div>
    </div>
  )
}