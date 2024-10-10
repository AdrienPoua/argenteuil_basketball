import { useState } from "react";

export default function useReset() {
  // Clé qui changera à chaque reset pour forcer un nouveau montage du composant
  const [key, setKey] = useState(0);

  // Fonction pour réinitialiser
  const reset = () => {
    setKey((prevKey) => prevKey + 1); // On incrémente la clé pour recréer le composant
  };
  return reset;
}
