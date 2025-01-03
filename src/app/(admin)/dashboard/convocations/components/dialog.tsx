import Match from '@/models/Match';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import Club from '@/models/Club';
import { getClubs } from '../actions/server.action';

type PropsType = {
  selectedMatchs: ReturnType<Match["toPlainObject"]>[]
}
export default async function ValidationDialog({ selectedMatchs }: Readonly<PropsType>) {
  const clubs = await getClubs().then((clubs) => clubs.map((club) => new Club(club).toPlainObject()));
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={selectedMatchs.length === 0}>  Envoyer </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-center">Confirmer les adresses emails</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4">
          {selectedMatchs.map((match) => (
            <div className="flex justify-between items-center p-2 border rounded-md" key={match.matchNumber}  >
              <span className="font-medium">{match.teamA} vs {match.teamB}</span>
              <span>{match.date}</span>
              <span>{match.idOrganismeEquipe2}</span>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" disabled={selectedMatchs.length === 0} onClick={()=> console.log("Envoyer") }>Envoyer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

