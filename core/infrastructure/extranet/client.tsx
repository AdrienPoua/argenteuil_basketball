const extranetUsername = process.env.FFBB_SERVER_USERNAME
const extranetPassword = process.env.FFBB_SERVER_PASSWORD

if (!extranetUsername || !extranetPassword) {
  throw new Error('EXTRANET_USERNAME or EXTRANET_PASSWORD is not set')
}

import { Match, MatchGateway } from '../../domain/gateways/matchs'
import club from '../../shared/config/club'

export class ExtranetClient implements MatchGateway {
  private static client: ExtranetClient | null = null
  private readonly baseEndpoint: string = 'https://ffbbserver3.ffbb.com/ffbbserver3/api'
  private readonly username: string = extranetUsername ?? ''
  private readonly password: string = extranetPassword ?? ''
  private tokenExpiresAt: number | null = null
  private token: string | null = null
  private matchs: Match[] | null = null
  private poulesIds: number[] | null = null
  private competitions:
    | {
        id: number
        label: string
        poules: {
          id: number
          nom: string
        }[]
      }[]
    | null = null
  private clubs: { id: string; libelle: string; code: string }[] | null = null
  private adherents: Adherent[] | null = null

  async getToken() {
    try {
      if (!this.token || !this.tokenExpiresAt || Date.now() > this.tokenExpiresAt) {
        const endpoint = this.baseEndpoint + '/authentication.ws'
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Accept: 'text/plain',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: this.username,
            password: this.password,
          }),
          next: {
            revalidate: 0,
          },
        })

        if (!res.ok) {
          throw new Error(`Erreur lors de la récupération du token: ${res.status}`)
        }
        this.token = await res.text()
        this.tokenExpiresAt = Date.now() + 10 * 60 * 1000 // expire dans 10 minutes
      }

      return this.token
    } catch (error) {
      console.error('Erreur dans getToken in extranet client:', error)
      throw new Error('Erreur dans getToken in extranet client')
    }
  }

  async getPoulesIds(): Promise<number[]> {
    if (this.poulesIds) {
      return this.poulesIds
    }
    const endpoint =
      this.baseEndpoint +
      '/competition/getEngagementsParOrganisme.ws?idOrganisme=' +
      club.clubId.toString()
    const token = await this.getToken()
    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Error from getPoulesIds in extranet client: ${response.statusText}`)
      }

      const data = (await response.json()) as Engagement[]
      this.poulesIds = data.map((data) => data.idPoule)
      return this.poulesIds
    } catch (error) {
      console.error('Erreur dans getPoulesIds in extranet client:', error)
      throw new Error('Erreur dans getPoulesIds in extranet client')
    }
  }

  async getCompetitions() {
    if (this.competitions) {
      return this.competitions
    }
    try {
      const endpoint =
        this.baseEndpoint + '/competition/getCompetitionParOrganisme.ws?codeOrganisme=' + club.id
      const token = await this.getToken()
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error(`Error from getCompetitions in extranet client: ${response.statusText}`)
      }
      const data = (await response.json()) as Competition[]
      this.competitions = data.map((compet) => ({
        id: compet.id,
        label: compet.code,
        poules: compet.poules,
      }))
      return this.competitions
    } catch (error) {
      console.error('Erreur dans getCompetitions in extranet client:', error)
      throw new Error('Erreur dans getCompetitions in extranet client')
    }
  }

  async getClubs() {
    if (this.clubs) {
      return this.clubs
    }
    try {
      const token = await this.getToken()
      const ids = await this.getCompetitions().then((competitions) =>
        competitions.map((compet) => compet.id),
      )

      const clubs = await Promise.all(
        ids.map(async (id) => {
          try {
            const endpoint =
              this.baseEndpoint + '/competition/getClassementEquipes.ws?idCompetition=' + id
            const response = await fetch(endpoint, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })

            if (!response.ok) {
              throw new Error(`Error from getClubs in extranet client: ${response.statusText}`)
            }

            const data = (await response.json()) as CompetitionWithClassements[]
            const clubs = data
              .map((competition) =>
                competition.classements.map((classemement) => classemement.organisme),
              )
              .flat()
            const clubsWithStringId = clubs.map((organisme) => ({
              ...organisme,
              id: organisme.id.toString(),
            }))
            const filteredClubs = clubsWithStringId.filter(
              (organisme) => organisme.code && organisme.id && organisme.libelle,
            )
            this.clubs = filteredClubs
            return this.clubs
          } catch (error) {
            console.error(`Error fetching organismes: ${id}`, error)
            throw error
          }
        }),
      )

      const uniqueClubs = Array.from(new Map(clubs.flat().map((club) => [club.id, club])).values())
      return uniqueClubs
    } catch (error) {
      console.error('Erreur dans getClubs in extranet client:', error)
      throw new Error('Erreur dans getClubs in extranet client')
    }
  }

  async getMatchs(): Promise<Match[]> {
    if (this.matchs) {
      return this.matchs
    }
    try {
      const token = await this.getToken()
      const poulesIds = await this.getPoulesIds()
      const allMatchsFromClubs = await Promise.all(
        poulesIds.map(async (poule) => {
          const endpoint =
            this.baseEndpoint + '/competition/getRencontresParPoule.ws?idPoule=' + poule
          const res = await fetch(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          if (!res.ok) {
            throw new Error('Failed to fetch matchs', {
              cause: { statusText: res.statusText, status: res.status },
            })
          }
          return (await res.json()) as Match[]
        }),
      )
      const flatMatchs = allMatchsFromClubs.flat()
      const matchsForMyClub = flatMatchs.filter(
        (match) =>
          match.idOrganismeEquipe1 === club.clubId || match.idOrganismeEquipe2 === club.clubId,
      )
      this.matchs = matchsForMyClub
      return this.matchs
    } catch (error) {
      console.error('Erreur lors de la récupération des matchs:', error)
      throw new Error('Erreur lors de la récupération des matchs')
    }
  }

  async getAdherents(): Promise<Adherent[]> {
    if (this.adherents) {
      return this.adherents
    }
    const token = await this.getToken()
    const endpoint = this.baseEndpoint + '/licence/getSimple.ws?idOrganisme=' + club.clubId
    const res = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch adherents', {
        cause: { statusText: res.statusText, status: res.status },
      })
    }
    const adherents = (await res.json()) as Adherent[]
    this.adherents = adherents
    return adherents.filter((adherent) => adherent.dateQualification !== null)
  }

  static getClient(): ExtranetClient {
    this.client ??= new ExtranetClient()
    return this.client
  }
}

interface Engagement {
  idEngagement: number
  idOrganisme: number
  idOrganismeCtc: number | null
  nomEquipe: string | null
  typeEntenteCtc: string | null
  idLicenceCorrespondantEquipe: number
  nomCorrespondantEquipe: string
  adresseCorrespondantEquipe: string
  complementAdresseCorrespondantEquipe: string
  communeCorrespondantEquipe: string
  telephoneFixeCorrespondantEquipe: string
  telephoneTravailCorrespondantEquipe: string
  telephonePortableCorrespondantEquipe: string
  emailCorrespondantEquipe: string
  clubPro: boolean
  idCompetition: number
  idPoule: number
  numeroEquipe: string
  niveau: {
    id: number
    code: string
    libelle: string
  } | null
}

interface Competition {
  id: number
  idCompetitionPere: number | null
  nom: string
  sexe: 'M' | 'F' | 'X' // Masculin, Féminin ou Mixte
  categorie: {
    id: number
    code: string
    libelle: string
  }
  code: string
  fils: Competition[] // Liste de compétitions filles si applicable
  saison: {
    id: number
    code: string
    libelle: string
    debut: string // Format "JJ/MM/AAAA"
    fin: string // Format "JJ/MM/AAAA"
    actif: 'true' | 'false'
  }
  typeCompetition: string // Exemple : "DIV" ou "PLAT"
  liveStat: boolean
  creationEnCours: boolean
  publicationInternet: string // Exemple : "AFF"
  emarqueV2: boolean
  classification: unknown
  organisme: {
    id: number
    libelle: string
    code: string
  }
  creation: string | null // Date ou null
  modification: string | null // Date ou null
  etat: unknown
  poules: {
    id: number
    nom: string
  }[]
}

interface CompetitionWithClassements extends Competition {
  classements: {
    organisme: {
      id: number
      libelle: string
      code: string
    }
    matchJoues: number
    points: number
    position: number
    gagnes: number
    perdus: number
    nuls: number
    pointsInitiaux: number | null
    penalitesArbitrage: number
    penalitesEntraineur: number
    penalitesDiverses: number
    nombreForfaits: number
    nombreDefauts: number
    paniersMarques: number
    paniersEncaisses: number
    quotient: number
    difference: number
    horsClassement: boolean
  }[]
}

type TypePratique = {
  id: number
  code: string
  libelle: string
  type: string
  certificat: boolean
  elicence: boolean
}

type TypePratiqueSportive = {
  id: number
  code: string
  libelle: string
} | null

export type Adherent = {
  id: number
  numeroLicence: string
  nom: string
  prenom: string
  sexe: 'M' | 'F'
  dateNaissance: string
  email: string
  codeOrganisme: string
  idOrganisme: number
  nomOrganisme: string
  typeLicence: string
  dateQualification: string | null
  categorie: string
  idOrganismeLicenceT: number | null
  idOrganismeLicenceAs: number | null
  nbNonRenouvellementLicencie: number
  historique: unknown // Si tu veux le typer, donne-moi un exemple
  typePratique: TypePratique[]
  typePratiqueSportive: TypePratiqueSportive
}
