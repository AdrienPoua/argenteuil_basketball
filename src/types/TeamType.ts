import TrainingType from "@/types/TrainingType";
export default interface TeamType {
  name: string;
  coach?: string;
  img?: string;
  trainings: TrainingType[];
  isChampionship?: boolean;
  division?: string;
  id?: string;
}
