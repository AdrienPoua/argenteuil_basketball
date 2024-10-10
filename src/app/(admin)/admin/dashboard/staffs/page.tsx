"use client";
import { createStaff } from "@/lib/mongo/controllers/staff";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";


const initialState = {
  name: "",
  email: "",
  number: "",
  teams: "",
  job: "",
  image: "",
  isEmailDisplayed: true,
  isNumberDisplayed: true,
};



// Composant principal du formulaire
export default function Page() {
  const [payload, setPayload] = useState(initialState);
  const { toast } = useToast()

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    // Si c'est un checkbox, on utilise la valeur `checked` plutôt que `value`
    setPayload((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await createStaff({ ...payload, teams: payload.teams.split(" ") });
    if (result) {
      toast({
        title: "Succès",
        description: "Votre demande a été envoyée avec succès !",
      });
    } else {
      toast({
        title: "Echec",
        description: "Echec",
      })
    }
    setPayload(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto bg-primary p-5 rounded-lg"
    >
      {/* Nom */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-center">
          Nom *
        </label>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={payload.name}
          required
          onChange={handleChange}
          className="text-black"
        />
      </div>


      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-center">
          Email *
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={payload.email}
          required
          onChange={handleChange}
          className="text-black"
        />
      </div>

      {/* Numéro */}
      <div className="flex flex-col">
        <label htmlFor="number" className="text-center">
          Numéro *
        </label>
        <input
          type="text"
          name="number"
          placeholder="Numéro"
          value={payload.number}
          required
          onChange={handleChange}
          className="text-black"
        />
      </div>

      {/* Équipes */}
      <div className="flex flex-col">
        <label htmlFor="teams" className="text-center">
          Équipes
        </label>
        <input
          type="text"
          name="teams"
          placeholder="U11M-1 U09M U13M-2 U06"
          value={payload.teams}
          onChange={(e) => setPayload({ ...payload, teams: e.target.value })}
          className="text-black"
        />
      </div>

      {/* Poste */}
      <div className="flex flex-col">
        <label htmlFor="job" className="text-center">
          Poste
        </label>
        <select
          name="job"
          value={payload.job}
          onChange={(e) => setPayload({ ...payload, job: e.target.value })}
          className="text-black"
        >
          <option value=""></option>
          <option value="Président">Président</option>
          <option value="Trésorier">Trésorier</option>
          <option value="Correspondant">Correspondant</option>
          <option value="Secrétaire Général">Secrétaire Général</option>
        </select>
      </div>

      {/* Image */}
      <div className="flex flex-col">
        <label htmlFor="image" className="text-center">
          Image
        </label>
        <input
          type="text"
          name="image"
          placeholder="adrien_poua.png"
          value={payload.image}
          onChange={handleChange}
          className="text-black"
        />
      </div>

      {/* Cacher l'email */}
      <div className="flex flex-col">
        <label htmlFor="isEmailDisplayed" className="text-center">
          Cacher l&apos;email
        </label>
        <input
          type="checkbox"
          name="isEmailDisplayed"
          checked={!payload.isEmailDisplayed}
          onChange={() => setPayload((prev) => ({ ...prev, isEmailDisplayed: !prev.isEmailDisplayed }))}
          className="text-black"
        />
      </div>

      {/* Cacher le numéro */}
      <div className="flex flex-col">
        <label htmlFor="isNumberDisplayed" className="text-center">
          Cacher le numéro
        </label>
        <input
          type="checkbox"
          name="isNumberDisplayed"
          checked={!payload.isNumberDisplayed}
          onChange={() => setPayload((prev) => ({ ...prev, isNumberDisplayed: !prev.isNumberDisplayed }))}
          className="text-black"
        />
      </div>

      <Button variant="contained" type="submit">
        Ajouter
      </Button>
    </form>
  );
}
