import { ReactElement } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { open, setContent } from "@/lib/redux/slices/modal";

type PropsType = {
    ModalContent: React.JSX.Element;
    text: string;
};

export default function Index({ ModalContent, text }: Readonly<PropsType>): ReactElement {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setContent(ModalContent));
        dispatch(open());
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
