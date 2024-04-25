const HeaderNav = [
    {
        title: "Club",
        subItems: [
            { title: "Dirigeants", url: "#", image: "entraineurs.webp" },
            { title: "Les entraineurs", url: "/entraineurs" },
            { title: "Equipes", url: "/equipes" },
        ],
    },
    {
        title : "Entrainements",
        subItems: [
            { title: "Horaires", url: "/horaires" },
            { title: "Gymnases", url: "/gymnases" },
        ],
    },
    {
        title : "Compétitions",
        subItems: [
            { title: "Calendrier", url: "/calendrier" },
            { title: "Résultats", url: "/resultats" },
            { title: "Classements", url: "/classements" },
        ],
    },
    {
        title: "Inscriptions",
        subItems: [
            { title: "Inscriptions en ligne", url: "/inscriptions-en-ligne"},
            { title: "Inscriptions sur place", url: "/inscriptions-sur-place" },
            { title: "Tarifs", url: "/tarifs" },
        ]
    },
];

export default HeaderNav;
