import { ReactElement } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { permanence } from "@/utils/services/dataProcessing";
import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import Link from "next/link";

export default function Index() : ReactElement {
  return (
    <Box className="flex flex-col bg-white p-5 gap-5 rounded-lg min-w-[350px]">
    <Box>
      <Typography className="text-xs md:text-base text-black text-center">
        Remettez le formulaire et le montant de la{" "}
        <Link
          href="/inscriptions/tarifs"
          className="text-primary hover:text-primary-dark underline underline-offset-8 ">
          {" "}
          cotisation{" "}
        </Link>{" "}
        à M. DIME aux horaires suivants :
      </Typography>
    </Box>
    <TableContainer className="rounded-md">
      <Table className="bg-primary">
        <TableHead className="mb-5">
          <TableRow className="bg-primary">
            <TableCell colSpan={3}>
              <Typography className="text-center text-xs md:text-base"> A partir du {permanence.start} </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permanence.slots.map((slot: any) => (
            <TableRow key={slot.day}>
              <TableCell>
                <Typography className="text-center text-xs md:text-base">{slot.day}</Typography>
              </TableCell>
              <TableCell>
                <EastIcon className="text-white" />
              </TableCell>
              <TableCell>
                <Typography className=" text-xs md:text-base">
                  {slot.startTime} - {slot.endTime}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3}>
              <Typography className="text-center text-xs md:text-base">Au gymnase {permanence.place} </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
  )
}
