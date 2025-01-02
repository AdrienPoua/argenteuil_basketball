import Team from "@/models/Team"
import Member from "@/models/Member"
export type PropsType = {
    data: ReturnType<Team['toPlainObject']>
    members: ReturnType<Member['toPlainObject']>[]
}

export type BaseCardPropsType = Omit<PropsType, "members"> & {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export type EditingCardPropsType = PropsType & {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}


