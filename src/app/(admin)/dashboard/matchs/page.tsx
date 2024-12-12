import Card from "./Card"

export const mockMatch = {
    id: 200000013314965,
    numero: 40129,
    numeroJournee: 3,
    nomEquipe1: "ARGENTEUIL BB",
    nomEquipe2: "UMO BEAUMONT B",
    resultatEquipe1: 18,
    resultatEquipe2: 76,
    date: "2024-10-12",
    horaire: 1930, // 19h30
    salle: {
        libelle: "Gymnase J. GUIMIER"
    },
    validee: true,
    joue: true,
    remise: false,
    forfaitEquipe1: true,
    forfaitEquipe2: false
};


export default function page() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Aperçu de la carte de match</h1>
            <Card match={mockMatch} />
        </div>
    )
}