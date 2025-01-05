import getRencontresParPoules from "@/services/api/getRencontresParPoules";

export type PropsType = {
  match: Awaited<ReturnType<typeof getRencontresParPoules>> & { competition: string };
};

