import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { deleteStaff } from '@/lib/mongo/controllers/staff'
import { useQueryClient } from "react-query";

type StaffCardProps = {
    data: {
        name: string,
        img: string,
        email: string,
        number: string,
        job?: string,
        teams?: string[],
        isEmailDisplayed: boolean,
        isNumberDisplayed: boolean,
        id: string
    }
};

export default function StaffCard({
    data
}: Readonly<StaffCardProps>): React.ReactElement {

    const queryClient = useQueryClient();
    const { name, img, email, number, job, teams, id } = data;

    return (
        <Card className="w-full max-w-lg rounded-lg shadow-lg bg-transparent overflow-hidden border-none relative">
            <CardHeader className="relative h-96">
                <Image
                    src={img}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                    className="w-full h-full"
                />
            </CardHeader>
            <CardContent className="flex items-center justify-around p-3 bg-primary flex-col font-secondary">
                {name && <h3 className="text-xl  ">{name}</h3>}
                {email && <h3 className="text-xl  ">{email}</h3>}
                {number && <p className=" uppercase">{number}</p>}
                {job && <p className=" uppercase">{job}</p>}
                {teams?.map((team, index) => (
                    <p key={team + index} className="uppercase">{team}</p>
                ))}
            </CardContent>
            <Button className="absolute top-0 right-0"
                onClick={async () => { await deleteStaff(id); queryClient.invalidateQueries(["staff"]); }}>
                ❌
            </Button>
        </Card>
    );
}
