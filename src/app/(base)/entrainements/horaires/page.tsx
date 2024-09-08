"use client";
import { Grid, Paper, Typography, Box, Select, MenuItem, Button, FormControl, Input } from "@mui/material";
import { Gym } from "@/utils/models";
import { gyms } from "@/utils/services/dataProcessing";
import { motion } from "framer-motion";
import useVisibility from "@/utils/hooks/useVisibility";
import { useRef, useState } from "react";
import H1 from "@/components/H1";
import { MainSection } from "@/utils/layouts";
import useIsMobile from "@/utils/hooks/useIsMobile";
import { MIN_BIRTH_YEAR_FOR_MEMBER, AT_THIS_YEAR_IAM_SENIOR } from "@/utils/magicNumber";
import categories from "@/data/categories.json";




const ScheduleSlot = ({ slot, categoryResult }: {
  slot: {
    team?: string;
    day: string;
    start: string;
    end: string;
    gym: string;
  }, categoryResult: string | null
}) => {
  const isMobile = useIsMobile();
  const firstTeam = slot.team?.split("-")[0];
  const secondTeam = slot.team?.split("-")[1];
  const isCategoryResult = categoryResult && (slot.team?.includes(categoryResult.split(" ")[0]) || slot.team?.includes(categoryResult.split(" ")[1]))
  return (
    <Grid item xs={4} >
      <Box component={Paper} className={`p-2  rounded shadow-md h-full ${isCategoryResult ? "transform animate-bounce bg-green-500" : ""}`}>
        <Typography className="text-primary text-xs md:text-base text-center ">{!isMobile ? slot.team : firstTeam}<br />{isMobile && secondTeam}</Typography>
        <Typography className="text-black text-xs md:text-base text-center">
          {slot.start} {!isMobile ? "-" : <br />} {slot.end}
        </Typography>
      </Box>
    </Grid>
  );
};

const ScheduleDay = ({ day, slots, categoryResult }: {
  day: string, slots: {
    team?: string;
    day: string;
    start: string;
    end: string;
    gym: string;
  }[], categoryResult: string | null
}) => (
  <Grid item xs={12}>
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Paper className="h-full flex justify-center items-center">
          <Typography className="text-black text-xs md:text-lg">
            {day}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Grid container spacing={1}>
          {slots.map((slot) => (
            <ScheduleSlot key={slot.day + slot.start + slot.end + slot.gym} slot={slot} categoryResult={categoryResult} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

const Schedule = ({ data: gym, categoryResult }: { data: Gym, categoryResult: string | null }) => {
  const cardRef = useRef(null);
  const isVisible = useVisibility(cardRef);
  const animation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={animation}
      transition={{ duration: 0.5 }}
    >
      <Box className="flex flex-col border bg-primary p-2">
        <Typography variant="h2" color="white" className="text-5xl text-center pb-2">
          {gym.name}
        </Typography>
        <Grid container spacing={1}>
          {gym.available.map((day) => {
            const slotsForDay = gym.slots.filter((slot) => slot.day === day);
            return <ScheduleDay key={day} day={day} slots={slotsForDay} categoryResult={categoryResult} />;
          })}
          <Grid item xs={12}>
            <Paper className="h-full flex justify-center items-center">
              <Typography className="p-2 text-black text-base lg:text-lg text-center">
                {gym.address} {gym.zipcode}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};


export default function SchedulePage() {
  const [categoryResult, setCategoryResult] = useState<string | null>(null);
  return (
    <>
      <H1>Plannings</H1>
      <MainSection>
        <Form className="mb-10" setCategoryResult={setCategoryResult} />
        <Box className="flex flex-col gap-10">
          {gyms.map((gym) => (
            <Schedule categoryResult={categoryResult} key={gym.id} data={gym} />
          ))}
        </Box>
      </MainSection>
    </>
  );
}



const Form = ({ className, setCategoryResult }: { className: string, setCategoryResult: (category: string | null) => void }) => {
  const [category, setCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getCategory = (age: number, sexe: string) => {
    const result = categories.find((category) => category.year.includes(age.toString()) && category.sexe.includes(sexe));
    const seniorM = age <= AT_THIS_YEAR_IAM_SENIOR && sexe === "M"
    const seniorF = age <= AT_THIS_YEAR_IAM_SENIOR && sexe === "F"

    if (seniorM) {
      return "Seniors équipe 1 ou 2 ou Loisirs";
    }
    if (seniorF) {
      return "Loisirs filles";
    }

    if (!result) {
      setError("Nous n'avons pas trouvé votre catégorie");
      return null;
    }
    return result.division.split(" ")[0] + sexe;
  };
  const isValidInput = (birthYear: number, sexe: string) => {
    const reset = () => {
      setCategory(null);
      setCategoryResult(null);
    }

    if (sexe === "X" && birthYear > MIN_BIRTH_YEAR_FOR_MEMBER) {
      setError("Nous acceptons pas les tabourets de moins de 5 ans");
      reset();
      return
    }
    if (sexe === "X") {
      setError("Nous acceptons pas les tabourets");
      reset();
      return
    }
    if (birthYear <= MIN_BIRTH_YEAR_FOR_MEMBER) return true;
    setError("Nous acceptons les enfants de 5 ans et plus");
    reset();
    return false;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const birthYear = Number(formData.get("birthYear"))
    const sexe = String(formData.get("sexe"))
    setError(null);
    setCategory(null);
    if (!isValidInput(birthYear, sexe)) return;
    setCategory(getCategory(birthYear, sexe));
    setCategoryResult(getCategory(birthYear, sexe));
  }


  return (
    <form className={className} onSubmit={onSubmit}>
      <FormControl className="flex flex-row justify-center gap-5 w-full h-full">
        <Input
          id="birthYear-input"
          name="birthYear"
          type="number"
          defaultValue={2010}
          className="text-black bg-white"
          placeholder="Date de naissance"
          inputProps={{
            className: "text-black",
          }}
        />
        <Select
          labelId="sexe-label"
          name="sexe"
          defaultValue="M"
          className="text-black bg-white min-w-20"
          inputProps={{
            className: "text-black",
          }}
        >
          <MenuItem value="M" className="text-black">Homme</MenuItem>
          <MenuItem value="F" className="text-black">Femme</MenuItem>
          <MenuItem value="X" className="text-black">Tabouret</MenuItem>
        </Select>

        <Button type="submit" variant="contained">Ma catégorie</Button>
      </FormControl>
      {error && (
        <Box className="mt-4 text-center">
          <Typography color="red">{error}</Typography>
        </Box>
      )}
      {category && (
        <Box className="mt-4 text-center">
          <p>Votre catégorie est : <strong>{category}</strong></p>
        </Box>
      )}
    </form>
  );
};



