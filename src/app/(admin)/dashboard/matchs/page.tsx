"use client";
import { createMatch } from '@/database/controllers/matchs';
import Import from '@/components/Admin/ImportFile';
import Instruction from '@/app/(admin)/dashboard/components/Instructions';

export default function Index() {
    return (
        <div className="flex justify-center items-center grow">
            <div className="flex flex-col gap-4 items-center">
                <Instruction className="bg-gray-100">
                    <p className="text-black">
                        Récuperer les matchs en exportant depuis l&apos;extranet FBI
                    </p>
                    <p className="text-black">
                        Modifier les horaires et les dates des matchs en fonction des dates réelles
                    </p>
                    <p className="text-black">
                        Telecharger le fichier excel modifier sur cette page afin de mettre à jour le calendrier sur le site
                    </p>
                </Instruction>
                <Import serverAction={createMatch} />
            </div>
        </div>
    );
};
