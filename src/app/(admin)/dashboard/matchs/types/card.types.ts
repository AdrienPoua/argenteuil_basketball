import Match from "@/models/Match";


export type PropsType = {
    match : ReturnType<Match["toPlainObject"]>;
};

export type EditingCardPropsType = {
    match: ReturnType<Match["toPlainObject"]>;
    setIsEditing: (isEditing: boolean) => void;
};
