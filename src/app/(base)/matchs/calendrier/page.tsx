import Info from "@/components/Info";
import H1 from "@/components/H1";
import Schedule from "@/components/Schedule"
import { matchsByMonth } from "@/utils/services/dataProcessing";
import { Box } from "@mui/material";

const hidden = true

export default function Index() {
  return (
    <>
      <H1> Calendrier des matchs </H1>
      {hidden ? <Info content='Rendez vous en septembre pour le début des championnats' /> :
        <Box className="flex flex-col max-w-[80%] mx-auto gap-10">
          {Object.keys(matchsByMonth).map((month) => (
            <Schedule key={month} matchs={matchsByMonth[month]} title={month} />
          ))}
        </Box>
      }</>)
}