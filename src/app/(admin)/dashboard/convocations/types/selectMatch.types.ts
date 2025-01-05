import Match from "@/models/Match"
import { Dispatch, SetStateAction } from "react"

export type PropsType = {
  matchs: ReturnType<Match["toPlainObject"]>[]
  selectedMatchs: ReturnType<Match["toPlainObject"]>[]
  setSelectedMatchs: Dispatch<SetStateAction<ReturnType<Match["toPlainObject"]>[]>>,
}