
import Image from "next/image";
import { ABB } from "@/utils/services/dataProcessing";
import { ReactElement } from "react";
import Utils from "@/utils/models/Utils";
import { useDispatch } from "react-redux";
import { close } from "@/lib/redux/slices/modal";
import useLogicalResponsiveHandleClick from "@/utils/hooks/useLogicalResponsiveHandleClick";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

export default function Index({ isMobile }: Readonly<{ isMobile: boolean }>): ReactElement {
    const dispatch = useDispatch()
    const handleClick = useLogicalResponsiveHandleClick();
    return (
        <div className="flex flex-col items-center  gap-5 max-w-[80%] ">
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[500px] aspect-square flex"
                onClick={() => dispatch(close())}>
                <Image
                    src="/images/logo.png"
                    width={400}
                    height={400}
                    alt="logo"
                    className="grow"
                />
            </div>
            <Button
                className=" bg-primary py-4 min-w-[350px] lg:min-w-[500px] hover:bg-primary "
                onClick={() => handleClick(ABB.email)}>
                <p className=" text-black  text-xs md:text-base tracking-wider ">{ABB.email} <Mail /></p>
            </Button>
            <Button
                className=" bg-primary py-4 min-w-[350px] lg:min-w-[500px]  hover:bg-primary "
                onClick={() => handleClick(ABB.phone)}>
                <p className=" text-black  text-xs md:text-base">{Utils.formatPhoneNumber(ABB.phone)} <Phone /></p>
            </Button>
        </div>
    );
}