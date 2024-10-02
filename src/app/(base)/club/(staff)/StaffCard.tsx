import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Ban, Mail, Phone, PhoneOff } from "lucide-react";
import useIsMobile from "@/utils/hooks/useIsMobile";
import { useState } from "react";

type StaffCardProps = {
    name: string,
    img: string,
    email: string,
    number: string,
    job?: string,
    teams?: string[],
    isEmailDisplayed: boolean,
    isNumberDisplayed: boolean,
};

export default function StaffCard({
    name,
    img,
    email,
    number,
    job,
    teams,
    isEmailDisplayed,
    isNumberDisplayed,
}: Readonly<StaffCardProps>): React.ReactElement {
    const isMobile = useIsMobile();
    const [isClicked, setIsClicked] = useState(false);
    return (
        <Card className="w-full max-w-lg rounded-lg shadow-lg bg-transparent overflow-hidden border-none">
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
            <CardContent className="flex items-center justify-around p-3 bg-primary">
                <Button variant="ghost" onClick={() => isEmailDisplayed && window.open(`mailto:${email}`)}>
                    {!isEmailDisplayed ? <Ban /> : <Mail />}
                </Button>
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-xl font-secondary ">{name}</h3>
                    <p className="font-secondary uppercase">
                        {job ? job : teams && teams.length > 0 ? teams.join(' | ') : ''}
                    </p>
                </div>
                <Button variant="ghost" onClick={() => {
                    if (isNumberDisplayed && isMobile) {
                        window.open(`tel:${number}`);
                    }
                    setIsClicked(!isClicked);
                }}>
                    {!isNumberDisplayed ? <PhoneOff /> : !isMobile && isClicked ? <p className="font-secondary"> {number} </p> : <Phone />}
                </Button>
            </CardContent>
        </Card>
    );
}
