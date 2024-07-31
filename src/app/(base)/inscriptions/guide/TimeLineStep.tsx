"use client"
import { Box, Typography } from "@mui/material";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { motion } from "framer-motion";
import { ReactElement } from "react";
import DoneIcon from "@mui/icons-material/Done";

type PropsType = {
    left: React.ReactNode;
    icon: React.ReactNode;
    right: React.ReactNode;
    index: number;
};

export default function Index({ left, icon, right, index }: Readonly<PropsType>): ReactElement {
    const animation = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", delay: index * 0.2 } },
        hover: { backgroundColor: "#172554" },
    };
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={animation}
            transition={{ duration: 0.3 }}
        >
            <TimelineItem className="flex relative">
                <TimelineOppositeContent className="flex justify-end w-[45%]">
                    <Box className="self-center text-white">{left}</Box>
                </TimelineOppositeContent>
                <TimelineSeparator className="self-center">
                    <TimelineConnector className="min-h-10" />
                    <TimelineDot color="primary" className="self-center">{icon}</TimelineDot>
                    <TimelineConnector className="min-h-10" />
                </TimelineSeparator>
                <TimelineContent className="flex grow w-[45%]">
                    <Box className="self-center text-white w-44">{right}</Box>
                </TimelineContent>
            </TimelineItem>
        </motion.div>
    );
};


export const TimeLineEnd = (): ReactElement => {
    return (
        <TimelineItem className="flex flex-col justify-center items-center self-center ">
            <TimelineConnector className="min-h-10" />
            <TimelineDot
                className="self-center "
                color="primary">
                <DoneIcon className="self-center" />
            </TimelineDot>
            <Typography className="self-center text-white">Vous êtes maintenant licencié</Typography>
        </TimelineItem>
    )
}

