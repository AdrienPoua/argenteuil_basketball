import Member from "@/models/Member";
import Team from "@/models/Team";

export type PropsType = {
    data: ReturnType<Member["toPlainObject"]>
    teams: ReturnType<Team["toPlainObject"]>[]
}

export type CardPropsType = PropsType & {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

