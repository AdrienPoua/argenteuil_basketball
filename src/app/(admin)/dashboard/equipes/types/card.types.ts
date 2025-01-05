import Team from "@/models/Team";
import Member from "@/models/Member";

export type PropsType = {
  data: ReturnType<Team["toPlainObject"]>;
  members: ReturnType<Member["toPlainObject"]>[];
};

export type BaseCardPropsType = {
  data: ReturnType<Team["toPlainObject"]>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditingCardPropsType = PropsType & {
  data: ReturnType<Team["toPlainObject"]>;
  members: ReturnType<Member["toPlainObject"]>[];
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};
