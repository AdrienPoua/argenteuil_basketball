"use ";
import Card from './components/Card'
import { ClubService } from "@/database/services/Club";
import Club from "@/models/Club";
import Form from "./components/Form";

export default async function Index() {
  const clubs = await new ClubService().getClubs().then(clubs => clubs.map(club => new Club(club).toPlainObject()));
  console.log("🚀 ~ Index ~ clubs:", clubs)
  return (
    <div className="container mx-auto flex flex-col gap-5 ">
      <Form />
      <div className="flex flex-wrap justify-center gap-5">
        {clubs?.map((club) => <Card key={club.id} data={club} />)}
      </div>
    </div>
  );


}