import { ReactElement } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useModal } from "@/utils/contexts/Modal";

type PropsType = {
    ModalContent: React.JSX.Element;
    text: string;
};

export default function Index({ ModalContent, text }: Readonly<PropsType>): ReactElement {
    const { setOpen, setContent } = useModal()
    const handleClick = () => {
        setContent(ModalContent);
        setOpen(true);
    };
    return (
        <Button
            variant="contained"
            onClick={handleClick}
            className="w-full min-h-8">
            <Typography className="text-xs md:text-base">{text}</Typography>
        </Button>
    );
};
