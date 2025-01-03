"use server"
import { MatchService } from "@/database/services/Match";
import { ClubService } from "@/database/services/Club";

const matchService = new MatchService();
const clubService = new ClubService();

export const getMatchs = async () => {
    return await matchService.getMatchs();
}

export const getClubs = async () => {
    return await clubService.getClubs();
}

const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const [datePart, timePart] = value.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    const newDate = new Date(year, month - 1, day, hours, minutes);
    setMatch(prev => ({ ...prev, date: newDate }));
};
