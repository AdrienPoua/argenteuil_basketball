"use client";
import Import from '@/components/Admin/ImportFile';
import { createMember } from '@/lib/mongo/controllers/members';
import Instructions from '@/app/(admin)/admin/dashboard/components/Instructions';


export default function Index() {
    return (
        <div className="flex justify-center items-center grow">
            <div className="flex flex-col gap-4 items-center">
                <Instructions className="bg-gray-100">
                    <p className="text-black">
                        Récuperer les membres en exportant depuis l&apos;extranet FBI
                    </p>
                    <p className="text-black">
                        Telecharger le fichier excel sur cette page afin de mettre à jour les informations des membres dans la base de données pour la saison en cours
                    </p>
                </Instructions>
                <Import serverAction={createMember} />
            </div>
        </div>

    );
};
