import Match from "@/models/Match";

export type PropsType = {
    matchs: ReturnType<Match["toPlainObject"]>[]
}