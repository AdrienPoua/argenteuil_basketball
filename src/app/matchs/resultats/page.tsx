"use client";
import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { v4 as uuiv4 } from "uuid";
import { abbAPI } from "@/data/api";
import { useEffect } from "react";
import { API } from "@/models";

// function Aside({ data, activeData, setActiveData }: Readonly<{ data: string[]; activeData: string; setActiveData: (data: string) => void }>) {
//   const handleClick = (category: string) => {
//     setActiveData(category);
//   };
  
//   const usableData = new API(data) 
//   console.log(usableData)
//   return (
//     <Box component='aside' className='bg-primary min-h-svh min-w-44'>
//       <List>
//         {usableData.teams.map((category) => (
//           <ListItem button key={uuiv4()} className={`px-10 ${activeData === category ? "bg-secondary" : ""}`} onClick={() => handleClick(category)}>
//             <ListItemText className='tracking-widest text-center' primary={category} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );
// }

export default function Index() {
  const [data, setData] = React.useState<string[]>(["test", "123", "caca"]);
  const [activeData, setActiveData] = React.useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/matchs");
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(data.teams)  
  const [seniors, jeunes] = data.teams;
  return (
    <Box component='main' className='flex grow bg-black'>
      {/* <Aside data={data} activeData={activeData} setActiveData={setActiveData} /> */}
      <Box component='section' className='flex flex-col grow'>
        <Typography component='h1' variant='h1'>
          {" "}
          Classements{" "}
        </Typography>
        <Box className='flex justify-center'>
          <Typography>{activeData}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
