const HeaderNav = [
    {
        title: "Club",
        subItems: [
            { title: "Dirigeants", url: "/club/dirigeants", image: "entraineurs.webp" },
            { title: "Les entraineurs", url: "/club/entraineurs" },
            { title: "Equipes", url: "/club/equipes" },
        ],
    },
    {
        title : "Entrainements",
        subItems: [
            { title: "Horaires", url: "/entrainements/horaires" },
            { title: "Gymnases", url: "/entrainements/gymnases" },
        ],
    },
    {
        title : "Compétitions",
        subItems: [
            { title: "Calendrier", url: "/competitions/calendrier" },
            { title: "Résultats", url: "/competitions/resultats" },
            { title: "Classements", url: "/competition/classements" },
        ],
    },
    {
        title: "Inscriptions",
        subItems: [
            { title: "Inscriptions en ligne", url: "/inscriptions-en-ligne"},
            { title: "Inscriptions sur place", url: "/inscriptions-sur-place" },
            { title: "Tarifs", url: "/inscriptions/tarifs" },
        ]
    },
];

export default HeaderNav;
