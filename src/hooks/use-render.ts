import { useState } from "react";

export default function useRender() {
  // Clé qui changera à chaque reset pour forcer un nouveau montage du composant
  const [key, setKey] = useState(0);

  // Fonction pour réinitialiser
  const render = () => {
    setKey((prevKey: number) => prevKey + 1); // On incrémente la clé pour recréer le composant
  };
  return render;
}
