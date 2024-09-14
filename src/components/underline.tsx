import { Box } from "@mui/material";

export default function Underline() {
    return (
        <Box
            className="after:bg-gradient-to-r from-primary to-white after:p-1 after:shadow-xl after:w-full after:rounded-lg after:filter after:absolute after:left-0 inline-block"
            sx={{ "::after": { bottom: '-10px' } }}
        />
    );
}
