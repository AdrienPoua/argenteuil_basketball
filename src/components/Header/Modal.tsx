
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useModal } from "@/utils/contexts/Modal";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { club } from "@/utils/services/dataProcessing";
import { ReactElement } from "react";
import Utils from "@/utils/models/Utils";

export default function Index({ isMobile }: Readonly<{ isMobile: boolean }>): ReactElement {
    const handleClick = (text: string) => {
        if (isMobile && text.includes("@") && window !== undefined) {
            window.location.href = `mailto:${text}`;
        } else if (isMobile && window !== undefined) {
            window.location.href = `tel:${text}`;
        } else if (!isMobile && text.includes("@") && window !== undefined) {
            window.location.href = `mailto:${text}`;
        }
    };

    const { setOpen } = useModal();
    return (
        <Box className="flex flex-col items-center  gap-5 max-w-[80%] ">
            <Box
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[500px] aspect-square flex"
                onClick={() => setOpen(false)}>
                <Image
                    src="/images/logo.png"
                    width={400}
                    height={400}
                    alt="logo"
                    className="grow"
                />
            </Box>
            <Button
                className=" bg-primary py-4 min-w-[350px] lg:min-w-[500px] hover:bg-primary "
                endIcon={<EmailIcon className="text-black" />}
                onClick={() => handleClick(club.email)}>
                <Typography className=" text-black  text-xs md:text-base tracking-wider ">{club.email}</Typography>
            </Button>
            <Button
                className=" bg-primary py-4 min-w-[350px] lg:min-w-[500px]  hover:bg-primary "
                endIcon={<PhoneIphoneIcon className="text-black" />}
                onClick={() => handleClick(club.phone)}>
                <Typography className=" text-black  text-xs md:text-base">{Utils.formatPhoneNumber(club.phone)}</Typography>
            </Button>
        </Box>
    );
}