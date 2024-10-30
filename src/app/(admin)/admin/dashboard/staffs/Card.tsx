import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import Form from "./Form";
import { Ban, Mail, Phone, PhoneOff } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

type StaffCardProps = {
    data: {
        name: string,
        img: string,
        email: string,
        number: string,
        job?: "Président" | "Trésorier" | "Correspondant" | "Secrétaire Général" | "Entraineur" | "",
        teams?: string[],
        isEmailDisplayed: boolean,
        isNumberDisplayed: boolean,
        id: string
    }
};

export default function StaffCard({
    data
}: Readonly<StaffCardProps>): React.ReactElement {
    const [isEditing, setIsEditing] = useState(false);
    const [isNumberVisible, setIsNumberVisible] = useState(false)

    const handleEmailClick = () => {
        if (data.isEmailDisplayed) window.open(`mailto:${email}`)
    }

    const handlePhoneClick = () => {
        if (data.isNumberDisplayed) {
            if (typeof window !== 'undefined' && 'ontouchstart' in window) {
                window.open(`tel:${number}`)
            } else {
                setIsNumberVisible((prev) => !prev)
            }
        }
    }

    const { name, img, email, number, job, teams, isEmailDisplayed, isNumberDisplayed } = data;
    if (isEditing) return (
        <div className="relative">
            <Form defaultValues={data} />
            <Button onClick={() => setIsEditing(false)} className="absolute top-0 right-0">
                📜
            </Button>
        </div>
    );


    return (
        <Card className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg bg-transparent relative">
            <Button onClick={() => { setIsEditing(true); console.log(isEditing); }} className="absolute top-5 right-5 z-50">
                📜
            </Button>
            <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        src={img}
                        alt={name}
                        fill
                        className="object-cover object-top"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <h3 className="text-2xl font-semibold text-center">{name}</h3>
                {job && <p className="text-center text-muted-foreground">{job}</p>}
                {teams && teams.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {teams?.map((team) => (
                            <Badge key={team} variant="secondary">
                                {team}
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-around p-4 bg-transparent">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleEmailClick}
                                disabled={!isEmailDisplayed}
                            >
                                {isEmailDisplayed ? <Mail className="h-5 w-5" /> : <Ban className="h-5 w-5" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {isEmailDisplayed ? 'Envoyer un email' : 'Email not available'}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size={isNumberVisible ? undefined : "icon"}
                                onClick={handlePhoneClick}
                                disabled={!isNumberDisplayed}
                            >
                                {isNumberDisplayed ? (
                                    isNumberVisible ? (
                                        <span className="text-sm font-medium p-3">{number}</span>
                                    ) : (
                                        <Phone className="h-5 w-5" />
                                    )
                                ) : (
                                    <PhoneOff className="h-5 w-5" />
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {isNumberDisplayed
                                ? isNumberVisible
                                    ? 'Hide Number'
                                    : 'Voir le numéro'
                                : 'Phone not available'}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardFooter>
        </Card>
    )
}
