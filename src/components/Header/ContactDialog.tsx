
import ABB from "@/data/club.json";
import Utils from "@/models/Utils";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogTrigger
} from "@/components/ui/dialog";

export default function Overlay() {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button>Contact</Button>
            </DialogTrigger>
            <DialogContent className=" max-w-xs sm:max-w-md bg-[url('/images/logo.png')] bg-center bg-no-repeat bg-cover bg-transparent border-none aspect-square flex flex-col items-center justify-center">
                <Button
                    className="min-w-[130%] py-3 hover:none text-background"
                    onClick={() => window.open(`mailto:${ABB.email}`)}>
                    {ABB.email}  <span className="ms-2"><Mail /> </span>
                </Button>
                <Button
                    className="min-w-[130%] py-3 hover:none text-background"
                    onClick={() => { if (window.innerWidth < 768) window.open(`tel:${Utils.formatPhoneNumber(ABB.phone)}`); }}>
                    {Utils.formatPhoneNumber(ABB.phone)} <span> <Phone /> </span>
                </Button>
            </DialogContent>
        </Dialog >
    )
}
