import getRencontresParPoules from "@/services/api/getRencontresParPoules";

type ArrayOfMatch = Awaited<ReturnType<typeof getRencontresParPoules>>;
type Match = ArrayOfMatch[number];

export type PropsType = {
  match: Match & { competition: string };
};

