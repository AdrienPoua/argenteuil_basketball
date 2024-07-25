import { DBMatchType } from "@/utils/types";

type NotificationReturn = {
    sujet: string;
    message: string;
};

export const createIndividualNotification = (match: DBMatchType, check: boolean): NotificationReturn => {
    const classic = {
        sujet: `Convocation pour le match N°${match.matchNumber} - ${match.division}`,
        message: `Bonjour,
        
Vous trouverez ci-dessous l'ensemble des informations concernant le match ${match.matchNumber} :

* Division: ${match.division}
* Votre équipe: ${match.teamB}
* Date: ${match.date}
* Heure: ${match.time}
* Lieu: ${match.gym}
        
Sportivement,
POUA Adrien
`
    };

    const modif = {
        sujet: `MODIFICATION: concernant le match N°${match.matchNumber} - ${match.division} `,
        message: `Bonjour,

        Ce message est une convocation modificative pour le match ${match.matchNumber} :

* Division: ${match.division}
* Votre équipe: ${match.teamB}
* Date: ${match.date}
* Heure: ${match.time}
* Lieu: ${match.gym}
                 
Veuillez accuser réception de ce message.

        Sportivement,
        POUA Adrien
            `
    };
    return check ? modif : classic

};

export const createGenericNotification = (check: boolean): NotificationReturn => {
    const classic = {
        sujet: `Convocation pour le match N°[XXX] - [DIVISION]`,
        message: `Bonjour,
        
Vous trouverez ci-dessous l'ensemble des informations concernant le match [XXX] :

* Division: [DIVISION]
* Votre équipe: [TEAMB]
* Date: [DATE]
* Heure: [HEURE]
* Lieu: [GYMNASE]
        
Sportivement,
POUA Adrien`
    };
    const modif = {
        sujet: `MODIFICATION: concernant le match N°[XXX] -[DIVISION]`,
        message: `Bonjour,

        Ce message est une convocation modificative pour le match N°[XXX]:

* Division: [DIVISION]
* Votre équipe: [TEAMB]
            * Date: [DATE]
* Heure: [HEURE]
* Lieu: [GYMNASE]
                 
Veuillez accuser réception de ce message.

            Sportivement,
        POUA Adrien
`
    };
    return check ? modif : classic
};

