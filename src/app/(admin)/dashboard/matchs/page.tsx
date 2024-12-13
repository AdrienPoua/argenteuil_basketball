import Card from "./Card"

const mockMatch = {
    id: 1,
    numero: 42,
    numeroJournee: 3,
    idPoule: 101,
    idOrganismeEquipe1: 201,
    idOrganismeEquipe2: 202,
    nomEquipe1: "Équipe Alpha",
    nomEquipe2: "Équipe Beta",
    idEngagementEquipe1: 301,
    idEngagementEquipe2: 302,
    resultatEquipe1: 25,
    resultatEquipe2: 20,
    date: new Date("2024-12-15T14:00:00Z"), // Date d'un match
    horaire: new Date("1970-01-01T20:30:00Z"), // Horaire correspondant à 20:30
    salle: "Salle des Sports",
    penaliteEquipe1: false,
    penaliteEquipe2: true,
    forfaitEquipe1: false,
    forfaitEquipe2: false,
    defautEquipe1: false,
    defautEquipe2: true,
    validee: true,
    remise: false,
    joue: true,
    handicap1: null,
    handicap2: 5,
    dateSaisieResultat: "2024-12-15T18:00:00Z", // ISO 8601 format
    creation: "2024-12-01T10:00:00Z", // ISO 8601 format
    modification: "2024-12-14T15:30:00Z", // ISO 8601 format
    classementPouleAssociee: null,
};

export default function page() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Aperçu de la carte de match</h1>
            <Card match={mockMatch} />
        </div>
    )
}